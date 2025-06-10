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
import { parseCustomError } from "./error-utils.ts";
import { ContractFunctionRevertedError } from "viem";

globalThis.Buffer = Buffer;

// Type the `query.meta` and `mutation.meta` properties used in the QueryCache
declare module "@tanstack/react-query" {
  interface Register {
    queryMeta: {
      onError?: (error: Error) => void;
      onSuccess?: (data: unknown) => void;
    };
  }
}

// Toast on success and error using "meta" property following TKDodo's (react-query maintainer) recommendations in the following blogs:
// https://tkdodo.eu/blog/breaking-react-querys-api-on-purpose
// https://tkdodo.eu/blog/react-query-error-handling
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      // Parse and log wagmi errors using their ABI. If error is not from wagmi, original error will get logged.
      console.error(error);
      // const parsedError = parseCustomError(error);
      // if (parsedError instanceof ContractFunctionRevertedError) {
      //   console.error(
      //     "Custom Error | Name: %s | Short message: %s",
      //     parsedError?.data?.errorName,
      //     parsedError?.shortMessage
      //   );
      // }

      if (query?.meta?.onError) {
        query?.meta?.onError(error);
      }
    },
    onSuccess: (data, query) => {
      if (query?.meta?.onSuccess) {
        query?.meta?.onSuccess(data);
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
