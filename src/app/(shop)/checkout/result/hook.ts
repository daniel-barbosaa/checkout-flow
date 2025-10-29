import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useCheckoutStore } from "@/src/store/checkout";
import { useCartStore } from "@/src/store/cart";
import { ROUTES } from "@/src/constants/routes";
import { wait } from "@/src/utils/delay";
import { PossibleStatus } from "@/src/types/possible-status";

export function useResult() {
  const router = useRouter();
  const payment = useCheckoutStore((state) => state.payment);
  const status = useCheckoutStore((state) => state.status);
  const setStatus = useCheckoutStore((state) => state.setStatus);
  const resetCheckout = useCheckoutStore((state) => state.reset);
  const setStep = useCheckoutStore((state) => state.setStep);
  const clearCart = useCartStore((state) => state.clearCart);
  const cartItems = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total);
  const idempotencyKey = useCheckoutStore((state) => state.idempotencyKey);

  function handleRetry() {
    setStatus("idle");

    const boletoOrPix = payment?.type === "pix" || payment?.type === "boleto";
    const credit = payment?.type === "credit_card";

    if (credit && status === "failed") {
      setStep(3);
      router.push(ROUTES.checkout.review);
      return;
    }
    if (boletoOrPix && status === "expired") {
      setStep(2);
      router.push(ROUTES.checkout.paymentForm);
      return;
    }
  }

  function handleBackToStart() {
    clearCart();
    resetCheckout();
    setStep(1);
    router.push(ROUTES.shop.main);
  }

  useEffect(() => {
    let cancelled = false;
    let hasSimulated = false;

    async function simulateResult() {
      if (hasSimulated || status !== "processing") return;
      hasSimulated = true;

      await wait(3000);
      if (cancelled) return;

      let possible: PossibleStatus[] = [];

      switch (payment?.type) {
        case "credit_card":
          possible = ["failed", "processing", "paid"];
          break;
        case "pix":
        case "boleto":
          possible = ["processing", "paid", "expired"];
          break;
      }

      const randomStatus =
        possible[Math.floor(Math.random() * possible.length)];
      setStatus(randomStatus);
      toast.dismiss();

      async function processPayment() {
        await wait(5000);
        if (!cancelled) setStatus("paid");
      }

      if (randomStatus === "paid")
        toast.success("Pagamento aprovado com sucesso!");
      else if (randomStatus === "failed")
        toast.error("Falha no pagamento com cartão. Tente novamente.");
      else if (randomStatus === "expired") {
        toast.error(
          payment?.type === "pix"
            ? "QR Code expirado. Gere um novo Pix."
            : "Boleto expirado. Gere um novo para continuar.",
        );
      } else if (randomStatus === "processing") {
        await toast.promise(processPayment(), {
          loading: "Pagamento em processamento. Aguarde a compensação...",
          success: "Pagamento confirmado!",
        });
      }
    }

    simulateResult();

    return () => {
      cancelled = true;
    };
  }, [status, payment, setStatus]);

  return {
    handleRetry,
    handleBackToStart,
    status,
    payment,
    cartItems,
    total,
    idempotencyKey,
  };
}
