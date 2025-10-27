import { ReactNode } from "react";
import PublicRoute from "@/src/components/public-route";

export default function Layout({ children }: { children: ReactNode }) {
  return <PublicRoute>{children}</PublicRoute>;
}
