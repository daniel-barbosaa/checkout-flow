import { z } from "zod";

export const paymentMethodSchema = z.object({
  method: z.enum(["pix", "credit_card", "boleto"]),
});

export type PaymentMethodForm = z.infer<typeof paymentMethodSchema>;

export const paymentMethodFormDefaultValues: PaymentMethodForm = {
  method: "pix",
};
