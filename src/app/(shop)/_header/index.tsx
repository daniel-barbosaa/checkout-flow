import { UserDropdown } from "./user-dropdown";

import { CartIconInfo } from "./cart-icon-info";

export function Header() {
  return (
    <header className="flex items-center px-6 py-4">
      <div className="flex items-center gap-3 font-medium">
        <h1 className="hidden text-3xl sm:block">TechStore</h1>
      </div>

      <section className="ml-auto flex items-center gap-2">
        <CartIconInfo />
        <UserDropdown />
      </section>
    </header>
  );
}
