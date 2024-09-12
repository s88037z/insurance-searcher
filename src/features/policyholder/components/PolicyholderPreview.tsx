import {
  usePolicyholder,
  usePolicyholderParent,
} from "@/features/policyholder/api/getPolicyholder";
import { toErrorString } from "@/utils/format";
import PolicyholderRoot from "./PolicyholderRoot";

type PolicyholderPreviewProps = {
  code: string;
};

export default function PolicyholderPreview({
  code,
}: PolicyholderPreviewProps) {
  const query = usePolicyholder({ policyholderCode: code });
  const queryParent = usePolicyholderParent({ policyholderCode: code });
  const { isFetching, isError, data: policyholder, error, isPending } = query;
  if (isFetching) return <div className="mt-8">Loading...</div>;
  if (isError) {
    return (
      <pre className="mt-8">Some Error Occurred: {toErrorString(error)}</pre>
    );
  }
  return (
    <div className="mt-8 flex flex-col items-center">
      {policyholder ? (
        <>
          <PolicyholderRoot
            policyholder={policyholder}
            parent={queryParent.data}
          />
        </>
      ) : isPending ? (
        <div>Please entering search code!</div>
      ) : (
        <div>Not found</div>
      )}
    </div>
  );
}
