import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CustomerFormSchema, customerFormSchema } from "./customer-form-schema";

import { useCheckoutStore } from "@/src/store/checkout";
import { wait } from "@/src/utils/delay";
import { getStorageItem } from "@/src/helpers/local.storage";
import { STORAGE_KEYS } from "@/src/constants/storage-keys";
import { useState } from "react";

type User = {
  name: string;
  email: string;
};

export function useCustomerController() {
  const [submitting, setSubmitting] = useState(false);
  const setBuyer = useCheckoutStore((state) => state.setBuyer);
  const { currentUserKey } = STORAGE_KEYS;
  const user = getStorageItem(currentUserKey) as User | null;

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors },
  } = useForm<CustomerFormSchema>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    setSubmitting(true);

    await wait(1000);
    setBuyer(data);
    setSubmitting(false);
  });

  return { errors, register, handleSubmit, submitting };
}
