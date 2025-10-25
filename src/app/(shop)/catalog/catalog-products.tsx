"use client";
import Image from "next/image";
import NikeImage from "@/public/nike.jpeg";
import { Button } from "@/src/components/ui/button";
import { PRODUCTS_MOCK } from "@/src/utils/mock/products";
import { formatPrice } from "@/src/utils/formatters/format-price";
import { useCartStore } from "@/src/store/cart";
import { ProductsType } from "@/src/types/products";

export function CatalogProducts() {
  const addToCart = useCartStore((state) => state.addToCart);

  function handleAddCartProduct(product: ProductsType) {
    addToCart(product);
  }

  return (
    <div className="mx-auto px-4 py-4 sm:px-6">
      <div className="mb-6">
        <h1 className="mb-2 text-2xl font-semibold md:text-3xl">Catálogo</h1>
        <p className="text-muted-foreground">
          Explore nossos produtos disponíveis e encontre o que precisa de forma
          rápida e fácil.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {PRODUCTS_MOCK.map((product) => (
          <div
            key={product.id}
            className="border-border bg-card flex flex-col overflow-hidden rounded-2xl border shadow-sm transition hover:shadow-md"
          >
            <div className="relative aspect-square w-full">
              <Image
                src={NikeImage}
                alt="Nike Court Vision"
                fill
                className="h-full w-full object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                priority
              />
            </div>

            <div className="flex flex-col gap-1 p-3 sm:p-4">
              <h3 className="text-sm font-semibold sm:text-base">
                {product.name}
              </h3>
              <p className="text-muted-foreground text-sm">
                {formatPrice(product.price)}
              </p>

              <Button
                className="mt-auto px-2 py-2 text-xs font-medium sm:px-3 sm:text-sm"
                onClick={() => handleAddCartProduct(product)}
              >
                Adicionar ao carrinho
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
