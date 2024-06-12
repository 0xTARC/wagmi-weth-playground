import { zeroAddress } from "viem";
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
      <p>WETH Balance: {data?.toString()}</p>
    </div>
  );
};
