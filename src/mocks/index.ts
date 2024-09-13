import { env } from "@/config/env";
import { initDb } from "./db";

export async function enableMocking() {
  if (!env.ENABLE_API_MOCKING) {
    return;
  }
  const { worker } = await import("./browser");
  initDb();
  return worker.start({
    onUnhandledRequest: "bypass",
  });
}
