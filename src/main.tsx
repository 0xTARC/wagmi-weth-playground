import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Buffer } from "buffer";
import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiProvider } from "wagmi";

import App from "./App.tsx";
import { config } from "./wagmi.ts";

import "./index.css";
import toast, { Toaster } from "react-hot-toast";

globalThis.Buffer = Buffer;

// Toast on success and error using "meta" property following TKDodo's (react-query maintainer) recommendations in the following blogs:
// https://tkdodo.eu/blog/breaking-react-querys-api-on-purpose
// https://tkdodo.eu/blog/react-query-error-handling
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query?.meta?.errorMessage) {
        toast.error(`Something went wrong: ${query.meta.errorMessage}`);
      }
    },
    onSuccess: (data, query) => {
      // Only show success toast on first success of each query
      if (query.state.dataUpdateCount === 1 && query?.meta?.successMessage) {
        toast.success(`${query?.meta?.successMessage}`);
      }
    },
  }),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster />
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
