import { cn } from "@/src/utils/class-name-merge";
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
import { useSigninController } from "../app/account/signin/useSigninController";
import { Spinner } from "./ui/spinner";

interface LoginFormProps extends React.ComponentProps<"div"> {
  onChangeTab: (value: string) => void;
}

export function LoginForm({
  onChangeTab,
  className,
  ...props
}: LoginFormProps) {
  const { register, errors, handleSubmit, isLoading } = useSigninController();
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Faça login na sua conta</CardTitle>
          <CardDescription>
            Digite seu e-mail abaixo para fazer login em sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
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
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  error={errors.password?.message}
                />
              </Field>
              <Field>
                <Button type="submit">
                  {isLoading ? <Spinner /> : "Entrar"}
                </Button>
                <FieldDescription className="text-center">
                  Não tem uma conta?{" "}
                  <button
                    onClick={() => onChangeTab("signup")}
                    className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
                  >
                    Criar conta
                  </button>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
