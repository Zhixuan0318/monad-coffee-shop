"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { createPublicClient, http, formatUnits } from "viem";
import { monadTestnet } from "@wagmi/core/chains";

import { beanTokenABI } from "@/lib/abi/beanToken";
import Banner from "@/component/banner";
import Balance from "@/component/balance";
import ClaimButton from "@/component/claim-button";
import Option from "@/component/option";
import Redeem from "@/component/redeem-button"; // ← Add this import
import WalletConnectButton from "@/component/walletConnect-button";

const BEAN_ADDRESS = "0x110225d9A24a40374D752B1d05275488aB5CC8b6";

export default function Home() {
  const { address, isConnected } = useAccount();
  const [totalSupply, setTotalSupply] = useState("0");
  const [userBalance, setUserBalance] = useState("0");
  const [selected, setSelected] = useState<string | null>(null); // ← Add selected drink

  const client = createPublicClient({
    chain: monadTestnet,
    transport: http(),
  });

  const fetchBalances = async () => {
    try {
      const [total, balance] = await Promise.all([
        client.readContract({
          address: BEAN_ADDRESS,
          abi: beanTokenABI,
          functionName: "totalSupply",
        }),
        address
          ? client.readContract({
              address: BEAN_ADDRESS,
              abi: beanTokenABI,
              functionName: "balanceOf",
              args: [address],
            })
          : Promise.resolve(0n),
      ]);

      setTotalSupply(formatUnits(total, 18));
      setUserBalance(formatUnits(balance, 18));
    } catch (err) {
      console.error("Error fetching balances:", err);
    }
  };

  useEffect(() => {
    fetchBalances();
  }, [address]);

  return (
    <main className="flex flex-col items-center min-h-screen">
      <div className="w-full max-w-2xl space-y-5">
        <Banner />
        {!isConnected && <WalletConnectButton />}

        {isConnected && (
          <>
            <div className="flex space-x-2">
              <Balance title="Total Supply" amount={totalSupply} />
              <Balance title="Your Balance" amount={userBalance} />
            </div>

            <div className="mt-4">
              <ClaimButton onClaimSuccess={fetchBalances} />
            </div>

            <h2 className="font-semibold text-lg text-[#432DA8] mt-5">
              Choose a coffee
            </h2>

            <Option selected={selected} onSelect={setSelected}/>

            <div className="mt-2">
              <Redeem selected={selected} onRedeemSuccess={fetchBalances} />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
