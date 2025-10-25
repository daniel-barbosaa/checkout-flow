import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore nosso catálogo",
};
export default function Page() {
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
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="border-border aspect-square rounded-md border bg-black"
          ></div>
        ))}
      </div>
    </div>
  );
}
