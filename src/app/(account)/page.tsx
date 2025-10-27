import { Metadata } from "next";
import { AccountForms } from "./account-forms";

export const metadata: Metadata = {
  title: "Login / Cadastro",
};

export default function Page() {
  return <AccountForms />;
}
