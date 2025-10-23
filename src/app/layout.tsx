import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Checkout Flow",
  description:
    "Aplicação web de fluxo de checkout 100% mockado com Pix, Cartão e Boleto, usando Next.js, React, Shadcn UI e Tailwind. Inclui login, seleção de produtos, carrinho e acompanhamento do status do pedido.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers> {children}</Providers>
      </body>
    </html>
  );
}
