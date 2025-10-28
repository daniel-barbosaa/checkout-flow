"use client";

import { Button } from "@/src/components/ui/button";
import { QrCode, CreditCard, Barcode } from "lucide-react";
import { usePaymentMethodController } from "./payment-method-controller";

import { PaymentOption } from "./payment-option";
import { BoletoFields, CardFields, PixFields } from "./payment-methods-fields";
import { useCheckoutStore } from "@/src/store/checkout";
import { Field } from "@/src/components/ui/field";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/src/constants/routes";

export default function Page() {
  const { register, handleSubmit, submitting, selected } =
    usePaymentMethodController();
  const router = useRouter();
  const setStep = useCheckoutStore((s) => s.setStep);

  function handleNext() {
    setStep(3);
  }

  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
        <h2 className="text-xl font-semibold">Escolha o método de pagamento</h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <PaymentOption
            value="pix"
            icon={QrCode}
            title="Pix"
            description="Pagamento instantâneo via QR"
            selected={selected}
            register={register}
          />

          <PaymentOption
            value="credit_card"
            icon={CreditCard}
            title="Cartão de crédito"
            description="Cartões Visa, Mastercard"
            selected={selected}
            register={register}
          />

          <PaymentOption
            value="boleto"
            icon={Barcode}
            title="Boleto"
            description="Gere e pague depois"
            selected={selected}
            register={register}
          />
        </div>
        {selected === "pix" && <PixFields />}
        {selected === "credit_card" && <CardFields />}
        {selected === "boleto" && <BoletoFields />}

        <Field>
          <Button
            variant="ghost"
            type="button"
            disabled={submitting}
            onClick={() => {
              router.push(ROUTES.checkout.customer);
              setStep(1);
            }}
          >
            Voltar
          </Button>
          <Button type="submit" disabled={submitting} onClick={handleNext}>
            {submitting ? "Salvando..." : "Continuar"}
          </Button>
        </Field>
      </form>
    </div>
  );
}
