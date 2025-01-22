/* @refresh reload */
import {
  QueryClient,
  QueryClientProvider,
  createMutation,
} from "@tanstack/solid-query";
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";
import { render } from "solid-js/web";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SolidQueryDevtools />
      <Example />
    </QueryClientProvider>
  );
}

function Example() {
  const myMutation = createMutation(() => ({
    mutationFn: async () => {
      throw new Error("some failure");
    },
    throwOnError: true,
  }));
  return (
    <>
      <button
        onclick={() => {
          myMutation.mutate();
        }}
      >
        mutate
      </button>
      <button
        onclick={async () => {
          await myMutation.mutateAsync();
        }}
      >
        mutateAsync
      </button>
    </>
  );
}
render(() => <App />, document.getElementById("root") as HTMLElement);
