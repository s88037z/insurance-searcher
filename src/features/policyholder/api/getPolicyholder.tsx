import { api, ExtraQueryConfig } from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { Policyholder, policyholderSchema } from "../types";
import { snakeToCamel } from "@/utils/format";

const getPolicyholder = async (policyholderCode: string | null | undefined) => {
  const res: { data: Policyholder | null } = await api.get(
    `/policyholders?code=${policyholderCode}`,
  );
  if (!res.data) return null;
  const camelizedData = snakeToCamel(res.data);
  const parsedData = policyholderSchema.parse(camelizedData);
  return parsedData;
};

export function policyholderOptions(
  policyholderCode: string | null | undefined,
) {
  return queryOptions({
    queryKey: ["policyholders", policyholderCode],
    queryFn: () => getPolicyholder(policyholderCode),
    enabled: !!policyholderCode,
  });
}

type usePolicyholderOptions = {
  policyholderCode: string;
  queryConfig?: ExtraQueryConfig<
    typeof policyholderOptions,
    string | null | undefined
  >;
};

export function usePolicyholder({
  queryConfig,
  policyholderCode,
}: usePolicyholderOptions) {
  return useQuery({
    ...policyholderOptions(policyholderCode),
    ...(queryConfig ?? {}),
  });
}

const getPolicyholderParent = async (policyholderCode: string) => {
  const res: { data: Policyholder | null } = await api.get(
    `/policyholders/${policyholderCode}/top`,
  );
  if (!res.data) return null;
  const camelizedData = snakeToCamel(res.data);
  const parsedData = policyholderSchema.parse(camelizedData);
  return parsedData;
};

export function usePolicyholderParent({
  policyholderCode,
}: {
  policyholderCode: string;
}) {
  return useQuery({
    queryKey: ["policyholders", policyholderCode, "top"],
    queryFn: () => getPolicyholderParent(policyholderCode),
  });
}
