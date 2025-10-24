import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerFormDefaultValues,
  SignUpFormSchema,
  signupFormSchema,
} from "./sign-up-form-schema";

import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { api } from "@/src/services/api";
import { useState } from "react";

interface useSignupControllerProps {
  onChangeTab: (value: string) => void;
}

export function useSignupController({ onChangeTab }: useSignupControllerProps) {
  const [isLoading, setLoading] = useState(false);
  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<SignUpFormSchema>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: registerFormDefaultValues,
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    setLoading(true);
    try {
      await api.post("/auth/signup", {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      toast.success("Conta criada com sucesso, faça login!");
      reset();
      onChangeTab("signin");
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(
        error.response?.data?.error || "Ocorreu um erro ao criar conta",
      );
    } finally {
      setLoading(false);
    }
  });

  return { errors, register, handleSubmit, isLoading };
}
