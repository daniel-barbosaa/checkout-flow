"use client";
import { Button } from "@/src/components/ui/button";
import { ROUTES } from "@/src/constants/routes";
import { useCartStore } from "@/src/store/cart";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

export function CartIconInfo() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalItem = itemCount >= 100 ? `+99` : itemCount;

  return (
    <Button
      variant="default"
      className="relative h-10 w-10 rounded-full"
      aria-label="Ver carrinho"
      onClick={() => router.push(ROUTES.shop.cart)}
      disabled={itemCount <= 0}
    >
      <ShoppingCart />

      {itemCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
          {totalItem}
        </span>
      )}
    </Button>
  );
}
