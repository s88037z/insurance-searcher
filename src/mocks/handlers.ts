import { env } from "@/config/env";
import { http, HttpResponse } from "msw";
import { appendPolicyholderChildren, networkDelay } from "./utils";
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

  http.get(`${env.API_URL}/policyholders/:code/top`, async ({ params }) => {
    await networkDelay();
    const { code } = params;

    const policyholder = db.policyholder.findFirst({
      where: { code: { equals: code as string } },
    }) as PolicyholderModel | null;
    if (!policyholder || !policyholder.parent)
      return HttpResponse.json({ data: null });

    const policyholderParent = db.policyholder.findFirst({
      where: { id: { equals: policyholder?.parent } },
    }) as PolicyholderModel | null;
    if (!policyholderParent) return HttpResponse.json({ data: null });

    const policyholders = db.policyholder.getAll() as PolicyholderModel[];
    return HttpResponse.json({
      data: appendPolicyholderChildren(policyholderParent, policyholders),
    });
  }),
];
