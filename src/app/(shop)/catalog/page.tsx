import { Metadata } from "next";

import { CatalogProducts } from "./catalog-products";

export const metadata: Metadata = {
  title: "Explore nosso catálogo",
};
export default function Page() {
  return <CatalogProducts />;
}
