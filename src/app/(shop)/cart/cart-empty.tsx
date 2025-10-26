import { ShoppingCart } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/src/components/ui/empty";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/src/constants/routes";

export function CartEmpty() {
  const router = useRouter();
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ShoppingCart />
        </EmptyMedia>
        <EmptyTitle>Seu carrinho está vazio</EmptyTitle>
        <EmptyDescription className="text-lg">
          Adicione produtos para continuar sua compra.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button onClick={() => router.push(ROUTES.shop.main)}>
          Explore o catálogo
        </Button>
      </EmptyContent>
    </Empty>
  );
}
