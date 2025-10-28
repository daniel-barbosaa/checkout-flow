import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PaymentMethods } from "../types/payment-methods";
import { getStorageItem } from "../helpers/local.storage";

export type Buyer = {
  name: string;
  email: string;
  phone?: string;
  address?: string;
};

type OrderStatus = "idle" | "processing" | "paid" | "failed" | "expired";

type StoredUser = {
  name: string;
  email: string;
};

const storedUser = (getStorageItem("user") as StoredUser) || null;

type CheckoutState = {
  currentStep: number;
  setStep: (step: number) => void;
  buyer: Buyer | null;
  payment: PaymentMethods | null;
  orderId?: string;
  status: OrderStatus;
  setBuyer: (b: Buyer) => void;
  setPayment: (p: PaymentMethods) => void;
  startProcessing: () => void;
  setStatus: (s: OrderStatus) => void;
  reset: () => void;
};

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      currentStep: 1,
      setStep: (step) => set({ currentStep: step }),
      buyer: storedUser
        ? { name: storedUser.name, email: storedUser.email }
        : null,
      payment: null,
      status: "idle",
      setBuyer: (b) => set({ buyer: b }),
      setPayment: (p) => set({ payment: p }),
      startProcessing: () =>
        set({ status: "processing", orderId: `order_${Date.now()}` }),
      setStatus: (s) => set({ status: s }),
      reset: () =>
        set({
          buyer: null,
          payment: null,
          status: "idle",
          orderId: undefined,
        }),
    }),
    { name: "checkout-storage" },
  ),
);
