"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { getStorageItem } from "../helpers/local.storage";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const signedIn = getStorageItem("signedIn");

      if (!signedIn) {
        router.replace("/account");
        return;
      }
    };

    checkAuth();
  }, [router]);

  return <>{children}</>;
}
