import { api, ExtraQueryConfig } from "@/lib/apiClient";
import { useQuery, QueryClient } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";
import { useState } from "react";
import { Policyholder, policyholderSchema } from "../types";
import { snakeToCamel } from "@/utils/format";

const getPolicyHolder = async (policyholderCode: string | null | undefined) => {
  const res: { data: Policyholder | null } = await api.get(
    `/policyholders?code=${policyholderCode}`,
  );
  const camelizedData = snakeToCamel(res.data);
  if (!camelizedData) return null;
  const parsedData = policyholderSchema.parse(camelizedData);
  return parsedData;
};

export function policyholderOptions(
  policyholderCode: string | null | undefined,
) {
  return queryOptions({
    queryKey: ["policyholders", policyholderCode],
    queryFn: () => getPolicyHolder(policyholderCode),
    enabled: !!policyholderCode,
  });
}

type usePolicyholderOptions = {
  policyholderCode: string | null;
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
export function useLazyPolicyholder(args: usePolicyholderOptions) {
  const [start, setStart] = useState(false);
  const { policyholderCode, queryConfig } = args;
  const query = usePolicyholder({
    policyholderCode,
    queryConfig: {
      ...queryConfig,
      ...{ enabled: !!policyholderCode && start },
    },
  });
  return {
    setStart: () => {
      if (!start) {
        setStart(true);
      }
    },
    query,
  };
}

export const policyholdersLoader = (queryClient: QueryClient) => async () => {
  const fetchAllQuery = {
    queryKey: ["policyholders"],
    queryFn: () => {
      return api.get(`/policyholders`);
    },
  };
  return (
    queryClient.getQueryData(fetchAllQuery.queryKey) ??
    (await queryClient.fetchQuery(fetchAllQuery))
  );
};
