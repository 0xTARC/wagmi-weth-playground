import { formatUnits, zeroAddress } from "viem";
import { useAccount, useChainId, useReadContract } from "wagmi";
import { addresses } from "./constants";
import { wethAbi } from "./generated";

export const Weth = () => {
  const chainId = useChainId();
  const account = useAccount();

  const { data, isLoading, isError, error } = useReadContract({
    address: addresses?.[chainId]?.Weth ?? zeroAddress,
    abi: wethAbi,
    functionName: "balanceOf",
    args: [account?.address ?? zeroAddress],
    query: {
      meta: { successMessage: "WETH balance fetched successfully!" },
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    console.error("Error: ", error);
    return <p>{error.message}</p>;
  }

  return (
    <div>
      <p>WETH Balance: {formatUnits(data ?? 0n, 18)}</p>
    </div>
  );
};
