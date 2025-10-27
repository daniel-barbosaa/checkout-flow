"use client";
import { Minus, Plus, X } from "lucide-react";

import NikeImage from "@/public/nike.jpeg";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { formatPrice } from "@/src/utils/formatters/format-price";
import { useCartStore } from "@/src/store/cart";

import { CartEmpty } from "./cart-empty";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/src/constants/routes";
export function CartResume() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const cartQuantity = items.reduce((acc, item) => acc + item.quantity, 0);
  const cartEmpty = cartQuantity <= 0;

  function handleDecrementItem({
    id,
    quantity,
  }: {
    id: string;
    quantity: number;
  }) {
    if (quantity <= 1) return;
    updateQuantity(id, quantity - 1);
  }

  function handleIncrementItem({
    id,
    quantity,
  }: {
    id: string;
    quantity: number;
  }) {
    updateQuantity(id, quantity + 1);
  }
  return (
    <>
      {cartEmpty ? (
        <CartEmpty />
      ) : (
        <>
          <div className="flex w-full max-w-3xl flex-col divide-y divide-gray-200">
            <h1 className="pb-4 text-2xl font-bold">Carrinho</h1>
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={NikeImage}
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                  />
                  <span className="font-medium">{item.name}</span>
                </div>

                <div className="mt-2 flex items-center gap-2 sm:mt-0 sm:gap-4">
                  <div className="inline-flex w-max items-center overflow-hidden rounded-md border border-gray-300">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-tr-none rounded-br-none px-3 py-1"
                      disabled={item.quantity <= 1}
                      onClick={() =>
                        handleDecrementItem({
                          id: item.id,
                          quantity: item.quantity,
                        })
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>

                    <span className="min-w-6 px-4 text-center">
                      {item.quantity}
                    </span>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-tl-none rounded-bl-none px-3 py-1"
                      onClick={() =>
                        handleIncrementItem({
                          id: item.id,
                          quantity: item.quantity,
                        })
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                    className="sm:ml-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <span className="mt-2 font-semibold sm:mt-0">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex w-full max-w-3xl flex-col gap-2 border-t border-gray-200 pt-4">
            <div className="flex justify-between text-lg font-medium">
              <span>Total:</span>
              <span>{formatPrice(total)}</span>
            </div>
            <Button
              className="mt-4 w-full"
              onClick={() => router.push(ROUTES.checkout.customer)}
            >
              Finalizar Pedido
            </Button>
          </div>
        </>
      )}
    </>
  );
}
