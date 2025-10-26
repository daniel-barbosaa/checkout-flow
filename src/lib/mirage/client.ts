import { makeServer } from "./mirage";

let server: ReturnType<typeof makeServer> | undefined;

export function initMirage() {
  if (process.env.NODE_ENV === "development" && !server) {
    server = makeServer({ environment: "development" });
  }
}
