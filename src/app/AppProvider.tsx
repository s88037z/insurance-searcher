import MainError from "@/components/MainError";
import { ErrorBoundary } from "react-error-boundary";

type AppProviderProps = {
  children: React.ReactNode;
};
export default function AppProvider({ children }: AppProviderProps) {
  return (
    <ErrorBoundary FallbackComponent={MainError}>{children}</ErrorBoundary>
  );
}
