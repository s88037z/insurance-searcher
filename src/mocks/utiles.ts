import { delay } from "msw";
import { PolicyholderModel } from "./db";
import { omit } from "lodash-es";

export const networkDelay = () => {
  const delayTime = import.meta.env.TEST
    ? 200
    : Math.floor(Math.random() * 700) + 300;
  return delay(delayTime);
};

export const appendPolicyholderChildren = (
  policyholder: PolicyholderModel | null,
  allPolicyholders: PolicyholderModel[],
) => {
  if (!policyholder) {
    return null;
  }
  const leftTrack = [policyholder.l];
  const rightTrack = [policyholder.r];
  const left = [];
  const right = [];

  while (leftTrack.length > 0) {
    const curId = leftTrack.pop();
    const found = allPolicyholders.find((item) => item.id === curId);
    if (found) {
      const { code, name, registration_date, introducer_code } = found;
      left.push({ code, name, registration_date, introducer_code });
      if (found.l) {
        leftTrack.push(found.l);
      }
      if (found.r) {
        leftTrack.push(found.r);
      }
    }
  }
  while (rightTrack.length > 0) {
    const curId = rightTrack.pop();
    const found = allPolicyholders.find((item) => item.id === curId);
    if (found) {
      const { code, name, registration_date, introducer_code } = found;
      right.push({ code, name, registration_date, introducer_code });
      if (found.l) {
        rightTrack.push(found.l);
      }
      if (found.r) {
        rightTrack.push(found.r);
      }
    }
  }
  left.sort((a, b) => a.code.localeCompare(b.code));
  right.sort((a, b) => a.code.localeCompare(b.code));
  return { ...omit(policyholder, "parent"), l: left, r: right };
};
