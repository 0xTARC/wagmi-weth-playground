import { Address } from "viem";
import { mainnet, sepolia } from "viem/chains";

export const addresses: Record<number, Record<string, Address>> = {
  // mainnet
  [mainnet.id]: {
    Weth: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  },
  [sepolia.id]: {
    Weth: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14",
  },
};
