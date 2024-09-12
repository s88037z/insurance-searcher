import { env } from "@/config/env";
import { http, HttpResponse } from "msw";
import { appendPolicyholderChildren, networkDelay } from "./utiles";
import { db, PolicyholderModel } from "./db";

export const handlers = [
  http.get(`${env.API_URL}/policyholders`, async ({ request }) => {
    await networkDelay();
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    if (!code) {
      const policyholders = db.policyholder.getAll();
      return HttpResponse.json({
        data: policyholders,
      });
    } else {
      const policyholders = db.policyholder.getAll() as PolicyholderModel[];
      const policyholder = db.policyholder.findFirst({
        where: { code: { equals: code } },
      }) as PolicyholderModel | null;

      return HttpResponse.json({
        data: appendPolicyholderChildren(policyholder, policyholders),
      });
    }
  }),
];
