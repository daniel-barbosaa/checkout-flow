import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  paymentMethodSchema,
  PaymentMethodForm,
  paymentMethodFormDefaultValues,
} from "./payment-method-schema";
import { useCheckoutStore } from "@/src/store/checkout";

import { PaymentMethods } from "@/src/types/payment-methods";
import { wait } from "@/src/utils/delay";

export function usePaymentMethodController() {
  const setPayment = useCheckoutStore((s) => s.setPayment);

  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit: hookFormHandleSubmit,
    watch,
    formState,
  } = useForm<PaymentMethodForm>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: paymentMethodFormDefaultValues,
  });

  const selected = watch("method");

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    setSubmitting(true);
    try {
      await wait(1000);
      const payment: PaymentMethods = {
        type: data.method as "pix" | "credit_card" | "boleto",
      };
      setPayment(payment);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  });

  return {
    register,
    handleSubmit,
    submitting,
    selected,
    errors: formState.errors,
  };
}
