'use client';

import { useAccount, useReadContract } from "wagmi";
import { formatUnits } from "viem";
import { motion, AnimatePresence } from "framer-motion";

import Banner from "@/component/banner";
import Balance from "@/component/balance";
import ClaimButton from "@/component/claim-button";
import Option from "@/component/option";
import WalletConnectButton from "@/component/walletConnect-button";
import { BEAN_TOKEN } from "@/constants/token";

export default function Home() {
  const { address, isConnected } = useAccount();

  // Read totalSupply
  const { data: totalSupplyRaw } = useReadContract({
    ...BEAN_TOKEN,
    functionName: "totalSupply",
  });

  // Read balanceOf for connected wallet
  const { data: userBalanceRaw } = useReadContract({
    ...BEAN_TOKEN,
    functionName: "balanceOf",
    args: [address!],
    enabled: !!address,
  });

  const totalSupply = totalSupplyRaw
    ? Number(formatUnits(totalSupplyRaw, BEAN_TOKEN.decimals))
    : 0;

  const userBalance = userBalanceRaw
    ? Number(formatUnits(userBalanceRaw, BEAN_TOKEN.decimals))
    : 0;

  return (
    <main className="flex flex-col items-center min-h-screen">
      <div className="w-full max-w-2xl space-y-5">

        <Banner />

        <AnimatePresence>
          {!isConnected && (
            <motion.div
              key="connect-button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <WalletConnectButton />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isConnected && (
            <motion.div
              key="main-content"
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            >
              <div className="flex space-x-2">
                <Balance title="Total Supply" amount={totalSupply} />
                <Balance title="Your Balance" amount={userBalance} />
              </div>

              <div className="mt-4">
                <ClaimButton />
              </div>

              <h2 className="font-semibold text-lg text-[#432DA8] mt-10">
                Choose a coffee
              </h2>
              <Option />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}
