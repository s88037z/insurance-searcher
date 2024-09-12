import { isRouteErrorResponse } from "react-router-dom";
import { camelCase } from "lodash-es";
import { z } from "zod";
export function toErrorString(error: unknown) {
  let errorMessage: string;
  if (isRouteErrorResponse(error)) {
    errorMessage = error.data?.message || error.statusText;
  } else if (error instanceof z.ZodError) {
    errorMessage = JSON.stringify(error.issues, null, 2);
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = "Unknown error";
  }
  return errorMessage;
}

export const snakeToCamel = (data: unknown): unknown => {
  if (Array.isArray(data)) {
    return data.map(snakeToCamel);
  } else if (data !== null && typeof data === "object") {
    return Object.keys(data).reduce(
      (result, key) => {
        const camelKey = camelCase(key);
        result[camelKey] = snakeToCamel(data[key as keyof typeof data]);
        return result;
      },
      {} as Record<string, unknown>,
    );
  }
  return data;
};
