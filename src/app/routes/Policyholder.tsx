import PolicyholderLayout from "@/features/policyholder/components/PolicyholderLayout";
import PolicyholderSearcher, {
  ISearcherForm,
} from "@/features/policyholder/components/PolicyholderSearcher";
import PolicyholderPreview from "../../features/policyholder/components/PolicyholderPreview";
import { useSearchParams } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";
import { PolicyholderSearchKeys } from "@/features/policyholder/types";
import { useQueryClient } from "@tanstack/react-query";

export default function PolicyholderRoute() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const code = searchParams.get(PolicyholderSearchKeys.Code);
  const handleSubmit: SubmitHandler<ISearcherForm> = (data) => {
    const hasCode = !!data[PolicyholderSearchKeys.Code];
    setSearchParams(
      hasCode
        ? { [PolicyholderSearchKeys.Code]: data[PolicyholderSearchKeys.Code] }
        : {},
    );
    if (hasCode) {
      queryClient.invalidateQueries({
        queryKey: ["policyholders", data[PolicyholderSearchKeys.Code]],
      });
    }
  };

  return (
    <PolicyholderLayout>
      <h1 className="mt-4 text-3xl">Policyholder Searcher 🎉</h1>
      <PolicyholderSearcher onSubmit={handleSubmit} />
      {code ? (
        <PolicyholderPreview code={code} />
      ) : (
        <p className="mt-8">Please entering search code...</p>
      )}
    </PolicyholderLayout>
  );
}
