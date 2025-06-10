import React from "react";
import { Hex } from "viem";
import { useChainId, useChains } from "wagmi";

export const TransactionExplorerLink = ({ txnHash }: { txnHash: Hex }) => {
  const chainId = useChainId();
  const chains = useChains();
  return (
    <>
      View transaction on{" "}
      <a href={`${chains[chainId].blockExplorers?.default.url}/txn/${txnHash}`}>
        {chains[chainId].blockExplorers?.default.name}
      </a>
    </>
  );
};
