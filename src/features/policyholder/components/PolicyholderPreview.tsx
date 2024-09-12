import { usePolicyholder } from "@/features/policyholder/api/getPolicyholder";
import { toErrorString } from "@/utils/format";
import PolicyholderRoot from "./PolicyholderRoot";

type PolicyholderPreviewProps = {
  code: string | null;
};

export default function PolicyholderPreview({
  code,
}: PolicyholderPreviewProps) {
  const query = usePolicyholder({ policyholderCode: code });
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
          <PolicyholderRoot policyholder={policyholder} />
          <pre className="mt-12">{JSON.stringify(policyholder, null, 2)}</pre>
        </>
      ) : isPending ? (
        <div>Please entering search code!</div>
      ) : (
        <div>Not found</div>
      )}
    </div>
  );
}
