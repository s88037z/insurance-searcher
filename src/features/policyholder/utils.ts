import { Policyholder } from "./types";
import { cloneDeep } from "lodash-es";

type PolicyholderNode = Policyholder["l"][0];

export const toLevels = (root: Policyholder): PolicyholderNode[][] => {
  const levels: PolicyholderNode[][] = [[root]];
  const [leftNodes, rightNodes] = [cloneDeep(root.l), cloneDeep(root.r)];
  let level = 1;
  let [leftNodesInLevel, rightNodesInLevel] = [
    Math.pow(2, level) / 2,
    Math.pow(2, level) / 2,
  ];

  while (leftNodes.length > 0 || rightNodes.length > 0) {
    if (!levels[level]) {
      levels[level] = [];
    }

    if (leftNodesInLevel > 0) {
      levels[level].push(leftNodes.shift()!);
      leftNodesInLevel--;
    } else if (rightNodesInLevel > 0) {
      levels[level].push(rightNodes.shift()!);
      rightNodesInLevel--;
    } else {
      level += 1;
      [leftNodesInLevel, rightNodesInLevel] = [
        Math.pow(2, level) / 2,
        Math.pow(2, level) / 2,
      ];
    }
  }
  return levels;
};
