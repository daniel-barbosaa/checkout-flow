"use client";
import { FieldLabel } from "@/src/components/ui/field";
import { PaymentMethods } from "@/src/types/payment-methods";
import { usePaymentMethodController } from "./payment-method-controller";
import { cn } from "@/src/utils/class-name-merge";
import { Input } from "@/src/components/ui/input";

export function PaymentOption({
  value,
  icon: Icon,
  title,
  description,
  selected,
  register,
}: {
  value: PaymentMethods["type"];
  icon: React.ComponentType;
  title: string;
  description: string;
  selected: PaymentMethods["type"];
  register: ReturnType<typeof usePaymentMethodController>["register"];
}) {
  function getFieldClass(isSelected: boolean) {
    return cn(
      "flex-col rounded-lg border p-4 transition w-full",
      isSelected
        ? "border-primary bg-primary/5"
        : "border-gray-200 hover:shadow-sm",
    );
  }

  return (
    <FieldLabel className={getFieldClass(selected === value)}>
      <div className="flex items-center gap-3">
        <Icon />
        <div>
          <h1 className="font-medium">{title}</h1>
          <p className="text-muted-foreground text-xs">{description}</p>
        </div>
      </div>
      <Input
        type="radio"
        value={value}
        {...register("method")}
        className="sr-only"
      />
    </FieldLabel>
  );
}
