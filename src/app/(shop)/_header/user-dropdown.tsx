"use client";
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";
import { Button } from "@/src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { ROUTES } from "@/src/constants/routes";
import { getStorageItem, removeStorageItem } from "@/src/helpers/local.storage";
import { ChevronDown, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserDropdownProps {
  id: string;
  email: string;
  name: string;
}
export function UserDropdown() {
  const [user, setUser] = useState<UserDropdownProps | null>(null);
  const firstName = user?.name.split(" ")[0];

  useEffect(() => {
    function loadData() {
      const storedUser = getStorageItem("user") as UserDropdownProps | null;
      setUser(storedUser);
    }
    loadData();
  }, []);

  const router = useRouter();
  function handleLogout() {
    const signedIn = getStorageItem("signedin");
    if (!signedIn) return;
    removeStorageItem(["signedin", "user"]);
    router.push(ROUTES.auth.account);
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild aria-label="Abrir menu">
        <Button
          variant="outline"
          className="flex h-10 items-center rounded-full"
        >
          <Avatar className="-mr-2 -ml-2">
            <AvatarFallback>
              <User className="text-muted-foreground" />
            </AvatarFallback>
          </Avatar>

          <span className="ml-2 hidden md:inline">{firstName}</span>
          <ChevronDown className="text-muted-foreground ml-1 hidden md:inline" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleLogout}>
            Sair
            <DropdownMenuShortcut>
              <LogOut />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
