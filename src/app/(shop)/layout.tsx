import ProtectedRoute from "@/src/components/protected-route";
import { ReactNode } from "react";
import { Header } from "./_header";
import { Separator } from "@radix-ui/react-separator";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <Header />
      <Separator className="bg-border h-px" />
      {children}
    </ProtectedRoute>
  );
}
