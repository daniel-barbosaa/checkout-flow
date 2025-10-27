import { PHONE_REGEX } from "@/src/constants/regex";
import { z } from "zod";

export const customerFormSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  email: z.email("Insira um email válido"),
  phone: z
    .string()
    .nonempty("Informe o telefone")
    .regex(PHONE_REGEX, "Insira um número de telefone válido"),
  address: z.string("Insira seu endereço"),
});

export type CustomerFormSchema = z.infer<typeof customerFormSchema>;
