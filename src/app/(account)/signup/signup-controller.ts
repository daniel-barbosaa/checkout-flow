import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerFormDefaultValues,
  SignUpFormSchema,
  signupFormSchema,
} from "./signup-form-schema";
import toast from "react-hot-toast";
import { useState } from "react";
import { registerUser } from "@/src/services/local-auth";
import { wait } from "@/src/utils/delay";

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
      await wait(1000);
      registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      toast.success("Conta criada com sucesso, faça login!");
      reset();
      onChangeTab("signin");
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
