import AppProvider from "./AppProvider";
import AppRouter from "./AppRouter";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <AppProvider>
      <AppRouter />
      <ReactQueryDevtools />
    </AppProvider>
  );
}

export default App;
