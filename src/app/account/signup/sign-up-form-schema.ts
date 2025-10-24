import { z } from "zod";

export const signupFormSchema = z.object({
  name: z.string("Insira seu nome").nonempty("Nome é obrigatório"),
  email: z.email("Insira um e-mail válido").nonempty("E-mail é obrigatório"),
  password: z
    .string()
    .nonempty("Senha é obrigatória")
    .min(8, "Sua senha deve conter 8 ou mais caracteres"),
});

export type SignUpFormSchema = z.infer<typeof signupFormSchema>;

export const registerFormDefaultValues: SignUpFormSchema = {
  name: "",
  email: "",
  password: "",
};
