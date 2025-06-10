import { formatUnits, zeroAddress } from "viem";
import {
  useAccount,
  useChainId,
  useReadContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { addresses } from "./constants";
import {
  useSimulateWethDeposit,
  useWriteWeth,
  useWriteWethDeposit,
  wethAbi,
} from "./generated";
import { waitForTransactionReceipt } from "wagmi/actions";
import { useConfig } from "wagmi";
import toast from "react-hot-toast";
import { useChains } from "wagmi";
import { TransactionExplorerLink } from "./TransactionExplorerLink";

export const Weth = () => {
  const wagmiConfig = useConfig();
  const chainId = useChainId();
  const chains = useChains();
  const account = useAccount();

  const readBalanceOf = useReadContract({
    address: addresses?.[chainId]?.Weth ?? zeroAddress,
    abi: wethAbi,
    functionName: "balanceOf",
    args: [account?.address ?? zeroAddress],
    query: {
      meta: {
        onSuccess: () => toast.success("WETH balance fetched successfully!"),
      },
    },
  });

  const simWethDeposit = useSimulateWethDeposit({
    value: 1n,
  });
  const writeWethDeposit = useWriteWethDeposit({
    mutation: {
      onSuccess: () => alert("success"),
    },
  });
  const waitWethDeposit = useWaitForTransactionReceipt({
    hash: writeWethDeposit.data,
    query: {
      meta: {
        onSuccess: (data) => {
          // toast here
        },
      },
    },
  });

  // const handleWriteWethAsync = async () => {
  //   if (sim?.data?.request == null) {
  //     return null;
  //   }
  //   const writeResult = await writeWethDeposit.writeContractAsync(
  //     sim.data.request
  //   );
  //   await waitForTransactionReceipt(wagmiConfig, { hash: writeResult });
  // };

  const handleWriteWethSync = () => {
    if (simWethDeposit?.data?.request == null) {
      return null;
    }
    writeWethDeposit.writeContract(simWethDeposit.data.request, {
      onSuccess: (data) => {
        toast(
          <>
            Success! <TransactionExplorerLink txnHash={data} />
          </>
        );
      },
    });
  };

  return (
    <div>
      <h2>Weth</h2>
      <h3>Weth Balance</h3>
      {readBalanceOf.isLoading ? (
        <p>Loading...</p>
      ) : readBalanceOf.isError ? (
        <p>{readBalanceOf.error.message}</p>
      ) : (
        <p>WETH Balance: {formatUnits(readBalanceOf.data ?? 0n, 18)}</p>
      )}

      {simWethDeposit.isLoading ||
      writeWethDeposit.isPending ||
      waitWethDeposit.isLoading ? (
        <p>Loading...</p>
      ) : null}
      <button onClick={handleWriteWethSync}>Deposit 1 Weth</button>
    </div>
  );
};
