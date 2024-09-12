import { Policyholder } from "../types";
import classNames from "classnames";

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
  const bgColor =
    policyholder.code == rootCode
      ? rootColor
      : policyholder.introducerCode == rootCode
        ? directChildColor
        : indirectChildColor;
  return (
    <>
      <div
        className={classNames(
          "basis-[200px] rounded-lg border-2 border-gray-700 p-2",
          bgColor,
        )}
      >
        <div className="mb-2 text-center">{policyholder.code}</div>
        <div className="text-center">{policyholder.name}</div>
      </div>
    </>
  );
}
