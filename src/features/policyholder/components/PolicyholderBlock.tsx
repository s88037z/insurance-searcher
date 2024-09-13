import { useNavigate } from "react-router-dom";
import { Policyholder } from "../types";
import classNames from "classnames";
import { useQueryClient } from "@tanstack/react-query";
import { policyholderOptions } from "../api/getPolicyholder";

const rootColor = `bg-yellow-200`;
const directChildColor = `bg-green-200`;
const indirectChildColor = `bg-grey-200`;

type PolicyholderBlockProps = {
  rootCode: string;
  policyholder: Policyholder["l"][0];
};
export default function PolicyholderBlock({
  rootCode,
  policyholder,
}: PolicyholderBlockProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const onPolicyholderHover = async () => {
    await queryClient.prefetchQuery(policyholderOptions(policyholder.code));
  };
  const bgColor =
    policyholder.code == rootCode
      ? rootColor
      : policyholder.introducerCode == rootCode
        ? directChildColor
        : indirectChildColor;

  return (
    <div
      className={classNames(
        "basis-[200px] cursor-pointer rounded-lg border-2 border-gray-700 p-2 hover:border-blue-400",
        bgColor,
      )}
      onMouseEnter={onPolicyholderHover}
      onClick={() => navigate(`/policyholders?code=${policyholder.code}`)}
    >
      <div
        className="mb-2 text-center"
        aria-labelledby="policyholder-code-label"
      >
        <span id="policyholder-code-label" className="sr-only">
          Policyholder Code:
        </span>
        {policyholder.code}
      </div>
      <div className="text-center" aria-labelledby="policyholder-name-label">
        <span id="policyholder-name-label" className="sr-only">
          Policyholder Name:
        </span>
        {policyholder.name}
      </div>
    </div>
  );
}
