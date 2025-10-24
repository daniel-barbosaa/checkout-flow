import { createServer, Model, Response } from "miragejs";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export function makeServer({ environment = "test" } = {}) {
  const server = createServer({
    environment,

    models: {
      user: Model.extend<Partial<User>>({}),
    },

    seeds(server) {
      server.create("user", {
        id: "12s2-23er-2dx3-cc33",
        name: "Daniel",
        email: "daniel@test.com",
        password: "12345678",
      });
    },
    routes() {
      this.namespace = "api";

      this.post("/auth/login", (schema, request) => {
        const { email, password } = JSON.parse(request.requestBody);

        const user = schema.db.users.findBy({ email, password });
        if (user) {
          return { id: user.id, name: user.name, email: user.email };
        }
        return new Response(401, {}, { error: "Credenciais inválida." });
      });

      this.post("/auth/signup", (schema, request) => {
        const { name, email, password } = JSON.parse(request.requestBody);
        const exists = schema.db.users.findBy({ email });
        if (exists) {
          return new Response(
            400,
            {},
            {
              error: "Já existe uma conta com este e-mail. Tente fazer login.",
            },
          );
        }
        const newUser = schema.db.users.insert({ name, email, password });
        return { user: newUser };
      });
    },
    timing: 2000,
  });

  return server;
}
