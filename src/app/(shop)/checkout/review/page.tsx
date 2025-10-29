"use client";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/src/components/ui/card";
import { useCheckoutStore } from "@/src/store/checkout";
import { useCartStore } from "@/src/store/cart";
import { formatPrice } from "@/src/utils/formatters/format-price";
import { wait } from "@/src/utils/delay";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/src/constants/routes";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  const buyer = useCheckoutStore((state) => state.buyer);
  const payment = useCheckoutStore((state) => state.payment);
  const status = useCheckoutStore((state) => state.status);

  const startProcessing = useCheckoutStore((state) => state.startProcessing);
  const setStatus = useCheckoutStore((state) => state.setStatus);
  const setStep = useCheckoutStore((state) => state.setStep);
  const cartItems = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total);

  async function handleConfirm() {
    if (status === "processing") {
      console.log("Clique duplicado ignorado. Status atual:", status);
      return;
    }

    startProcessing();

    const newKey = useCheckoutStore.getState().idempotencyKey;
    const currentStatus = useCheckoutStore.getState().status;

    console.log("Status atual:", currentStatus);
    console.log("Idempotency Key gerada:", newKey);

    toast.loading("Processando pagamento...");

    await wait(2000);

    router.push(ROUTES.checkout.result);
    setStep(4);
  }

  useEffect(() => {
    setStatus("idle");
  }, [setStatus]);

  return (
    <div className="w-full max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Revisão do Pedido</CardTitle>
          <CardDescription>
            Confira todos os detalhes antes de confirmar.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {buyer && (
            <div>
              <h3 className="font-semibold">Dados do comprador</h3>
              <div className="flex">
                <span className="mr-1 font-semibold">Nome:</span>
                <p>{buyer.name}</p>
              </div>
              <div className="flex">
                <span className="mr-1 font-semibold">Email:</span>
                <p>{buyer.email}</p>
              </div>
            </div>
          )}

          <div>
            <h3 className="font-semibold">Itens do pedido</h3>
            <ul className="space-y-2">
              {cartItems.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex justify-between font-bold">
              <span>Total:</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          {payment && (
            <div>
              <h3 className="font-semibold">Método de pagamento</h3>
              <p>
                {payment.type === "credit_card" && "Cartão de Crédito"}
                {payment.type === "pix" && "Pix"}
                {payment.type === "boleto" && "Boleto"}
              </p>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Button
              variant="ghost"
              onClick={() => {
                router.push(ROUTES.checkout.paymentForm);
                setStep(2);
              }}
            >
              Voltar
            </Button>

            <Button onClick={handleConfirm}>
              {status === "processing" ? "Processando..." : "Confirmar Pedido"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
