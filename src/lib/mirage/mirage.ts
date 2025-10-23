import { createServer } from "miragejs";

export function makeServer({ environment = "test" } = {}) {
  const server = createServer({
    environment,
    routes() {
      this.namespace = "api";

      this.get(
        "/users",
        () => {
          return {
            users: [
              { id: 1, name: "Mendes", year: 21 },
              { id: 2, name: "Valquiria", year: 23 },
              { id: 3, name: "Daniel", year: 43 },
            ],
          };
        },
        { timing: 1000 },
      );
    },
  });
  return server;
}
