import ProtectedRoute from "@/src/components/protected-route";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
