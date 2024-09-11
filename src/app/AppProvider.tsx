import MainError from "@/components/MainError";
import { defaultQueryConfig } from "@/lib/reactQuery";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

type AppProviderProps = {
  children: React.ReactNode;
};
const queryClient = new QueryClient({ defaultOptions: defaultQueryConfig });

export default function AppProvider({ children }: AppProviderProps) {
  return (
    <ErrorBoundary FallbackComponent={MainError}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ErrorBoundary>
  );
}
