import { isRouteErrorResponse } from "react-router-dom";

export function toErrorString(error: unknown) {
  let errorMessage: string;
  if (isRouteErrorResponse(error)) {
    errorMessage = error.data?.message || error.statusText;
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
