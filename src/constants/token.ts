import { config } from "@/config/wagmi";
import { beanTokenABI } from "@/lib/abi/beanToken";

export const BEAN_TOKEN = {
  address: "0x110225d9A24a40374D752B1d05275488aB5CC8b6" as const,
  abi: beanTokenABI,
  chainId: config.chains[0].id,
  decimals: 18,
};
