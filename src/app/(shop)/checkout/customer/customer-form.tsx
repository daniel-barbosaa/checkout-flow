"use client";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";

import { useCustomerController } from "./customer-controller";
import { formatPhoneNumber } from "@/src/utils/formatters/format-phone-number";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/src/constants/routes";
import { useCheckoutStore } from "@/src/store/checkout";

export function CustomerForm() {
  const router = useRouter();
  const setStep = useCheckoutStore((s) => s.setStep);
  const { errors, register, handleSubmit, submitting } =
    useCustomerController();

  function handleNext() {
    router.push(ROUTES.checkout.paymentForm);
    setStep(2);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dados do comprador</CardTitle>
        <CardDescription>
          Os dados abaixo serão usados na fatura e confirmação do pedido.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="Nome">Nome</FieldLabel>
              <Input
                id="Nome"
                type="text"
                placeholder="Daniel Mendes"
                {...register("name")}
                error={errors.name?.message}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="Email">Email</FieldLabel>
              <Input
                id="Email"
                type="email"
                placeholder="example@gmail.com"
                {...register("email")}
                error={errors.email?.message}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="Telefone">Telefone</FieldLabel>
              <Input
                id="Telefone"
                type="phone"
                placeholder="(38) 99872-2232"
                {...register("phone", {
                  onChange: (e) => {
                    const formatted = formatPhoneNumber(e.target.value);
                    e.target.value = formatted;
                  },
                })}
                error={errors.phone?.message}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="Endereco">Endereço</FieldLabel>

              <Input
                id="Endereco"
                type="text"
                placeholder="Rua, número, complemento"
                {...register("address")}
                error={errors.address?.message}
              />
            </Field>
            <Field className="flex justify-between gap-2">
              <Button
                variant="ghost"
                onClick={() => {
                  router.push(ROUTES.shop.cart);
                  setStep(1);
                }}
                type="button"
              >
                Voltar
              </Button>
              <Button type="submit" onClick={handleNext}>
                {submitting ? "Salvando..." : "Continuar para pagamento"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
