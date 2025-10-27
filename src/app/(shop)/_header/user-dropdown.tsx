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
import { getStorageItem } from "@/src/helpers/local.storage";
import { ChevronDown, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { STORAGE_KEYS } from "@/src/constants/storage-keys";
import { type User as UserLogged } from "@/src/types/users";
import { logoutUser } from "@/src/services/local-auth";
import { wait } from "@/src/utils/delay";
import { Spinner } from "@/src/components/ui/spinner";

export function UserDropdown() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserLogged | null>(null);
  const router = useRouter();
  const { currentUserKey, signedIn } = STORAGE_KEYS;
  const firstName = user?.name.split(" ")[0];

  useEffect(() => {
    function loadData() {
      const storedUser = getStorageItem(currentUserKey) as UserLogged | null;
      setUser(storedUser);
    }
    loadData();
  }, [currentUserKey]);

  async function handleLogout() {
    const isSignedIn = getStorageItem(signedIn);
    setIsLoading(true);
    if (!isSignedIn) return;
    await wait(1000);

    logoutUser();

    setIsLoading(false);
    router.push(ROUTES.auth);
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

          <span className="ml-2 hidden md:inline">
            {isLoading ? <Spinner /> : firstName}
          </span>
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
