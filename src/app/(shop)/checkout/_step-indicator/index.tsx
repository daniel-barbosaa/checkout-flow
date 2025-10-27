"use client";

import { cn } from "@/src/utils/class-name-merge";

export function StepIndicator({ step = 1 }: { step?: number }) {
  const labels = ["Dados", "Pagamento", "Revisão", "Status"];
  const percent = ((step - 1) / (labels.length - 1)) * 100;
  return (
    <div className="w-full max-w-2xl">
      <div className="text-muted-foreground mb-2 flex justify-between text-sm">
        {labels.map((label, index) => (
          <div
            key={label}
            className={cn("text-center", {
              "font-semibold": index + 1 === step,
            })}
          >
            {label}
          </div>
        ))}
      </div>

      <div className="bg-muted h-2 overflow-hidden rounded-full">
        <div
          className="bg-primary h-full transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
