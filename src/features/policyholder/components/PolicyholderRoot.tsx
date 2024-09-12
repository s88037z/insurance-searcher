import { Policyholder } from "../types";
import PolicyholderBlock from "./PolicyholderBlock";
import { toLevels } from "../utils";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

const gridColdVariants: Record<number, string> = {
  0: "grid-cols-1",
  1: "grid-cols-2",
  2: "grid-cols-4",
  3: "grid-cols-8",
};

type PolicyholderRootProps = {
  policyholder: Policyholder;
  parent?: Policyholder | null;
};

const previousButtonVariants = {
  active:
    "transform rounded-lg bg-blue-600 px-6 py-2 font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 cursor-pointer",
  inactive: "bg-gray-300 px-6 py-2 font-medium text-gray-400",
};
export default function PolicyholderRoot({
  policyholder,
  parent,
}: PolicyholderRootProps) {
  const navigate = useNavigate();

  // To follow the API spec,currently we cna only assume the childNodes in l,r are ordered like BFS,
  // Another way may be adding properties like {left:[child_id],right:[child_id]} into Policyholder Model of api response, let us can actually check the relationship.
  const levels = toLevels(policyholder);

  const previousButtonStyle = parent
    ? previousButtonVariants.active
    : previousButtonVariants.inactive;
  return (
    <>
      <div className="grid">
        {levels.map((levelNodes, levelIndex) => (
          <div
            key={levelIndex}
            className={`relative grid ${gridColdVariants[levelIndex]} mt-4 gap-4`}
          >
            {levelNodes.map((node) => (
              <div key={node.code} className="relative flex justify-center">
                <PolicyholderBlock
                  rootCode={policyholder.code}
                  policyholder={node}
                />
                {node.code === policyholder.code && (
                  <button
                    disabled={!parent}
                    onClick={() => {
                      navigate(`/policyholders?code=${parent!.code}`);
                    }}
                    className={classNames(
                      "absolute left-1/2 top-0 top-1/4 ml-[120px]",
                      previousButtonStyle,
                    )}
                  >
                    Previous level
                  </button>
                )}
                {levelIndex < levels.length - 1 && <ConnectLine />}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

function ConnectLine() {
  return (
    <div className="absolute top-full h-6 w-full items-start">
      <span className="absolute left-1/2 h-4 border-l border-gray-500" />
      <span className="absolute left-1/2 h-4 w-1/4 border-b border-gray-500" />
      <span className="absolute right-1/2 h-4 w-1/4 border-b border-gray-500" />
    </div>
  );
}
