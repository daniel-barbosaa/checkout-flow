const statusLabels = {
  paid: "Pedido Confirmado",
  failed: "Pagamento Falhou",
  expired: "Pedido Expirado",
  processing: "Aguardando...",
} as const;

export type StatusLabelKey = keyof typeof statusLabels;

export function getStatusLabel(status: string): string {
  return statusLabels[status as StatusLabelKey] ?? "Aguardando...";
}
