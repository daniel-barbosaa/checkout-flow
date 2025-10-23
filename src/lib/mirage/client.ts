import { makeServer } from "./mirage";

export function initMirage() {
  if (process.env.NODE_ENV === "development") {
    makeServer({ environment: "development" });
  }
}
