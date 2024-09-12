import { Policyholder } from "../types";
import PolicyholderBlock from "./PolicyholderBlock";
import { toLevels } from "../utils";

type PolicyholderRootProps = {
  policyholder: Policyholder;
};
export default function PolicyholderRoot({
  policyholder,
}: PolicyholderRootProps) {
  // To follow the API spec,currently we cna only assume the childNodes in l,r are ordered like BFS,
  // Another way may be adding properties: {left:[child_id],right:[child_id]} to Policyholder Model in api response, let us can actually check the relationship.
  const levels = toLevels(policyholder);

  const gridColdVariants: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-4",
    4: "grid-cols-8",
  };
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
