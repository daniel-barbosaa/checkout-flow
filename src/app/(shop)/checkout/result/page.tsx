"use client";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/src/components/ui/card";

import { formatPrice } from "@/src/utils/formatters/format-price";

import { getStatusLabel } from "@/src/constants/payment-status";

import { useResult } from "./hook";

export default function Page() {
  const {
    handleRetry,
    handleBackToStart,
    status,
    payment,
    cartItems,
    total,
    idempotencyKey,
  } = useResult();

  return (
    <div className="w-full max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>{getStatusLabel(status)}</CardTitle>
          <CardDescription>
            {status === "paid" && "Seu pagamento foi processado com sucesso."}
            {status === "failed" &&
              "Houve um problema ao processar o pagamento. Você pode tentar novamente."}
            {status === "expired" &&
              payment?.type === "boleto" &&
              "O pedido expirou antes de ser finalizado. Gere novo boleto."}
            {status === "expired" &&
              payment?.type === "pix" &&
              "O pedido expirou antes de ser finalizado. Gere novo Pix."}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">Resumo do Pedido</h3>
            <ul className="space-y-1">
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
              <h3 className="font-semibold">Método de Pagamento</h3>
              <p>
                {payment.type === "credit_card" && "Cartão de Crédito"}
                {payment.type === "pix" && "Pix"}
                {payment.type === "boleto" && "Boleto"}
              </p>
            </div>
          )}

          <div className="flex justify-between gap-2">
            {(status === "failed" || status === "expired") && (
              <Button onClick={handleRetry} variant="outline">
                {payment?.type === "credit_card" &&
                  status === "failed" &&
                  "Tentar Novamente"}
                {payment?.type === "boleto" &&
                  status === "expired" &&
                  "Gerar Novo Boleto"}
                {payment?.type === "pix" &&
                  status === "expired" &&
                  "Gerar Novo Pix"}
              </Button>
            )}

            {status === "paid" && (
              <Button onClick={handleBackToStart}>Voltar ao Início</Button>
            )}
          </div>
        </CardContent>
      </Card>
      {process.env.NODE_ENV === "development" && (
        <div className="mt-2 p-2 text-sm text-gray-500">
          Idempotency Key: {idempotencyKey}
        </div>
      )}
    </div>
  );
}
