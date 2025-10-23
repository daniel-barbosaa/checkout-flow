"use client";

import { ReactNode } from "react";
import { initMirage } from "../lib/mirage/client";
export default function Providers({ children }: { children: ReactNode }) {
  // Initialize MirageJS for client-side API mocking
  initMirage();

  return <>{children}</>;
}
