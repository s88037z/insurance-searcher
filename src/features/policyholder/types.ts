import { z } from "zod";
export enum PolicyholderSearchKeys {
  Code = "code",
}

export const policyholderSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
  registrationDate: z.string().datetime(),
  introducerCode: z.string(),
  l: z.array(
    z.object({
      code: z.string(),
      name: z.string(),
      registrationDate: z.string(),
      introducerCode: z.string(),
    }),
  ),
  r: z.array(
    z.object({
      code: z.string(),
      name: z.string(),
      registrationDate: z.string(),
      introducerCode: z.string(),
    }),
  ),
});

export type Policyholder = z.infer<typeof policyholderSchema>;
