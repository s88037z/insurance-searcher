import { usePolicyholder } from "@/features/policyholder/api/getPolicyholder";
import PolicyholderLayout from "@/features/policyholder/components/PolicyholderLayout";
import PolicyholderSearcher from "@/features/policyholder/components/PolicyholderSearcher";

export default function PolicyholderRoute() {
  const policyholderQuery = usePolicyholder();

  return (
    <PolicyholderLayout>
      {policyholderQuery.isLoading && <p>Loading...</p>}
      {policyholderQuery.data?.data && <PolicyholderSearcher />}
    </PolicyholderLayout>
  );
}
