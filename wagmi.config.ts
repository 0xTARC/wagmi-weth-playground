import { defineConfig } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import { erc20Abi } from "viem";
import { mainnet, sepolia } from "viem/chains";

console.log('process.env',process.env)
export default defineConfig({
  out: "src/generated.ts",
  contracts: [
    {
      name: "erc20",
      abi: erc20Abi,
    },
  ],
  plugins: [
    etherscan({
      apiKey: process.env.ETHERSCAN_API_KEY!,
      chainId: mainnet.id,
      contracts: [
        {
          name: "WETH",
          address: {
            [mainnet.id]: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
          },
        },
      ],
    }),
  ],
});
