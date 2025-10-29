import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PaymentMethods } from "../types/payment-methods";
import { getStorageItem } from "../helpers/local.storage";
import { v4 as uuid } from "uuid";

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

type CheckoutState = {
  idempotencyKey: string | null;
  currentStep: number;
  buyer: Buyer | null;
  payment: PaymentMethods | null;
  orderId?: string;
  status: OrderStatus;
  setBuyer: (buyer: Buyer) => void;
  setPayment: (payment: PaymentMethods) => void;
  startProcessing: () => void;
  setStatus: (state: OrderStatus) => void;
  setIdempotencyKey: (key?: string) => void;
  setStep: (step: number) => void;
  reset: () => void;
};

const storedUser = (getStorageItem("user") as StoredUser) || null;

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
      idempotencyKey: null,

      setBuyer: (buyer) => set({ buyer: buyer }),
      setPayment: (payment) => set({ payment: payment }),

      setIdempotencyKey: (key) =>
        set((state) => ({
          idempotencyKey: key ?? state.idempotencyKey ?? uuid(),
        })),

      startProcessing: () => {
        set((state) => ({
          status: "processing",
          orderId: `order_${Date.now()}`,
          idempotencyKey: state.idempotencyKey ?? uuid(),
        }));
      },

      setStatus: (state) => set({ status: state }),

      reset: () =>
        set({
          buyer: null,
          payment: null,
          status: "idle",
          orderId: undefined,
          idempotencyKey: null,
        }),
    }),
    { name: "checkout-storage" },
  ),
);
