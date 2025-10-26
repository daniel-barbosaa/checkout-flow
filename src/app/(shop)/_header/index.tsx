import { UserDropdown } from "./user-dropdown";
import Link from "next/link";

import { CartIconInfo } from "./cart-icon-info";
import { Store } from "lucide-react";

import { ROUTES } from "@/src/constants/routes";

export function Header() {
  return (
    <header className="flex items-center px-6 py-4">
      <Link href={ROUTES.shop.main}>
        <Store className="h-10 w-auto" />
      </Link>

      <section className="ml-auto flex items-center gap-2">
        <CartIconInfo />
        <UserDropdown />
      </section>
    </header>
  );
}
