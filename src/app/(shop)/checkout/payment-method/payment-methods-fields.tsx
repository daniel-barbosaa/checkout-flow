import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";

import { Button } from "@/src/components/ui/button";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";

function handleCopy(code: string, message: string) {
  navigator.clipboard.writeText(code);
  toast.success(message);
}

export function PixFields() {
  const pixCode = "000e9a...-PIX-CHAVE-FAKE";

  function handleClickCopy() {
    handleCopy(pixCode, "Chave pix copiada!");
  }

  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="pix">Chave Pix</FieldLabel>
        <div className="flex gap-2">
          <Input readOnly value={pixCode} />
          <Button type="button" onClick={handleClickCopy} variant="outline">
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </Field>
    </FieldGroup>
  );
}

export function CardFields() {
  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="cardNumber">Número do cartão</FieldLabel>
        <Input id="cardNumber" placeholder="0000 0000 0000 0000" />
      </Field>
      <Field>
        <FieldLabel htmlFor="expiry">Validade</FieldLabel>
        <Input placeholder="MM/AA" />
      </Field>
      <Field>
        <FieldLabel htmlFor="cvv">CVV</FieldLabel>
        <Input placeholder="123" />
      </Field>
    </FieldGroup>
  );
}

export function BoletoFields() {
  const boletoCode = "23790.12345 67890.123456 78901.234567 8 12340000012345";

  function handleClickCopy() {
    handleCopy(boletoCode, "Códido do boleto copiado, efetue o pagamento!");
  }

  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="boleto">Boleto Bancário</FieldLabel>
        <div className="flex items-center gap-2">
          <Input id="boleto" readOnly value={boletoCode} />
          <Button type="button" onClick={handleClickCopy} variant="outline">
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <FieldDescription>
          O boleto será pago após a confirmação do pedido. Use o botão ao lado
          para copiar o código.
        </FieldDescription>
      </Field>
    </FieldGroup>
  );
}
