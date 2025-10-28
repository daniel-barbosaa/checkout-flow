import { z } from "zod";

export const customerFormSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  email: z.email("Insira um email válido"),
  phone: z.string(),
  address: z.string("Insira seu endereço"),
});

export type CustomerFormSchema = z.infer<typeof customerFormSchema>;
