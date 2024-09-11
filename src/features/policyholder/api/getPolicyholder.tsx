import { api } from "@/lib/apiClient";
import { useQuery, QueryClient } from "@tanstack/react-query";
import { queryOptions } from "@tanstack/react-query";

enum QueryKey {
  Policyholders = "policyholders",
}
export function policyholderOptions() {
  return queryOptions({
    queryKey: [QueryKey.Policyholders],
    queryFn: () => {
      return api.get("/policyholders");
    },
  });
}

export function usePolicyholder(
  queryConfig?: ReturnType<typeof policyholderOptions>,
) {
  return useQuery({
    ...policyholderOptions(),
    ...(queryConfig ?? {}),
  });
}

export const policyholdersLoader = (queryClient: QueryClient) => async () => {
  const query = policyholderOptions();
  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query))
  );
};
