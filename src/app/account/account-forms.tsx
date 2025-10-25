"use client";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/src/components/ui/tabs";
import { LoginForm } from "@/src/components/login-form";
import { SignupForm } from "@/src/components/signup-form";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStorageItem } from "../../helpers/local.storage";

export function AccountForms() {
  const [tab, setTab] = useState("signin");
  const router = useRouter();

  useEffect(() => {
    const signedIn = getStorageItem("signedIn");
    if (signedIn) {
      router.replace("/catalog");
    }
  }, [router]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Tabs
          value={tab}
          onValueChange={setTab}
          defaultValue="signin"
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Entrar</TabsTrigger>
            <TabsTrigger value="signup">Criar conta</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <LoginForm onChangeTab={setTab} />
          </TabsContent>

          <TabsContent value="signup">
            <SignupForm onChangeTab={setTab} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
