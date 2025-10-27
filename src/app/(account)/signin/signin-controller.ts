import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import {
  SignInFormSchema,
  signInFormSchema,
  signInFormDefaultValues,
} from "./signin-form-schema";
import { setStorageItem } from "../../../helpers/local.storage";

import { loginUser } from "@/src/services/local-auth";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ROUTES } from "@/src/constants/routes";
import { wait } from "@/src/utils/delay";

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
      await wait(1000);
      loginUser(data.email, data.password);

      setStorageItem("signedin", true);
      reset();
      router.push(ROUTES.shop.main);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Erro inesperado, tente novamente!";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  });

  return { errors, register, handleSubmit, isLoading };
}
