import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import {
  SignInFormSchema,
  signInFormSchema,
  signInFormDefaultValues,
} from "./signin-form-schema";
import { api } from "@/src/services/api";
import { setStorageItem } from "../../../helpers/local.storage";

import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ROUTES } from "@/src/constants/routes";

export function useSigninController() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<SignInFormSchema>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: signInFormDefaultValues,
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    setLoading(true);
    try {
      const { data: user } = await api.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      setStorageItem("signedin", true);
      setStorageItem("user", user);
      reset();

      router.push(ROUTES.shop.main);
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(
        error.response?.data?.error || "Ocorreu um erro ao fazer login ",
      );
    } finally {
      setLoading(false);
    }
  });

  return { errors, register, handleSubmit, isLoading };
}
