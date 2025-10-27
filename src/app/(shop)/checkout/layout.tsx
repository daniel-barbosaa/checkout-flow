import { Metadata } from "next";
import { StepIndicator } from "./_step-indicator";

export const metadata: Metadata = {
  title: "Checkout",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center space-y-6 p-4 sm:px-6 lg:px-8">
      <StepIndicator />
      {children}
    </div>
  );
}
