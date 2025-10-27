"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getStorageItem } from "../helpers/local.storage";
import { STORAGE_KEYS } from "../constants/storage-keys";
import { ROUTES } from "@/src/constants/routes";

interface PublicRouteProps {
  children: ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const router = useRouter();
  const { signedIn } = STORAGE_KEYS;
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isSignedIn = getStorageItem(signedIn);

      if (isSignedIn) {
        router.replace(ROUTES.shop.main);
        return;
      }

      setIsChecking(false);
    };

    checkAuth();
  }, [router, signedIn]);

  if (isChecking) return null;

  return <>{children}</>;
}
