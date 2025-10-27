import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";

import { useSignupController } from "../app/(account)/signup/signup-controller";
import { Spinner } from "./ui/spinner";

interface SignupFormProps extends React.ComponentProps<typeof Card> {
  onChangeTab: (value: string) => void;
}

export function SignupForm({ onChangeTab, ...props }: SignupFormProps) {
  const { register, errors, handleSubmit, isLoading } = useSignupController({
    onChangeTab,
  });

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Crie uma conta</CardTitle>
        <CardDescription>
          Insira suas informações abaixo para criar sua conta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Nome</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                {...register("name")}
                error={errors.name?.message}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                {...register("email")}
                error={errors.email?.message}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Senha</FieldLabel>
              <Input
                id="password"
                type="password"
                {...register("password")}
                error={errors.password?.message}
              />
              <FieldDescription>
                Deve ter pelo menos 8 caracteres.
              </FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? <Spinner /> : "Criar conta"}
                </Button>
                <FieldDescription className="px-6 text-center">
                  Já tem uma conta?{" "}
                  <button
                    onClick={() => onChangeTab("signin")}
                    className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
                  >
                    Entrar
                  </button>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
