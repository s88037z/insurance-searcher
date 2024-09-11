import { env } from "@/config/env";
import { http, HttpResponse } from "msw";
import { networkDelay } from "./utiles";
import { db } from "./db";

export const handlers = [
  http.get(`${env.API_URL}/policyholders`, async () => {
    await networkDelay();
    const policyholders = db.policyholder.getAll();
    return HttpResponse.json({
      data: policyholders,
    });
  }),
];
