'use client';

import { useAccount } from 'wagmi';
import { motion, AnimatePresence } from 'framer-motion';

import Banner from "@/component/banner";
import Balance from "@/component/balance";
import ClaimButton from "@/component/claim-button";
import Option from "@/component/option";
import WalletConnectButton from "@/component/walletConnect-button";

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <main className="flex flex-col items-center min-h-screen">
      <div className="w-full max-w-2xl space-y-5">

        {/* Banner - always shown */}
        <Banner />

        {/* Wallet Connect - shown only when NOT connected */}
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

        {/* Remaining content - only when connected */}
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
                <Balance title="Total Supply" amount={1000} />
                <Balance title="Your Balance" amount={1000} />
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
