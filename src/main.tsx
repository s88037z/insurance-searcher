import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import "@/index.css";
import { env } from "./config/env";
import { initDb } from "@/mocks/db";

async function enableMocking() {
  if (!env.ENABLE_API_MOCKING) {
    return;
  }
  const { worker } = await import("./mocks/browser");
  initDb();
  return worker.start();
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
