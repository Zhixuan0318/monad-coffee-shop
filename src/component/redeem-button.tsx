"use client";

import clsx from "clsx";
import { useAccount, useWriteContract } from "wagmi";
import { useState } from "react";
import { parseUnits } from "viem";
import { beanTokenABI } from "@/lib/abi/beanToken";

const BEAN_ADDRESS = "0x110225d9A24a40374D752B1d05275488aB5CC8b6";
const SPENDER = "0xB1061f26eDcAD70d33ea4681d96e18F9B5316791";

type RedeemProps = {
  selected: string | null;
  onRedeemSuccess?: () => void;
};

export default function Redeem({ selected, onRedeemSuccess }: RedeemProps) {
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRedeem = async () => {
    if (!selected || !isConnected || !address) return;

    setLoading(true);
    setError(null);
    setTxHash(null);

    try {
      // Step 1: Approve 1 BEAN to SPENDER
      await writeContractAsync({
        address: BEAN_ADDRESS,
        abi: beanTokenABI,
        functionName: "approve",
        args: [SPENDER, parseUnits("1", 18)],
      });

      // Step 2: Redeem coffee
      const hash = await writeContractAsync({
        address: BEAN_ADDRESS,
        abi: beanTokenABI,
        functionName: "redeemCoffee",
        args: [address, selected],
      });

      setTxHash(hash);
      onRedeemSuccess?.();
    } catch (err: unknown) {
      console.error("Redeem failed:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Transaction failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const formatTx = (hash: string) => `${hash.slice(0, 6)}...${hash.slice(-5)}`;

  return (
    <div className="space-y-2 text-center">
      <button
        onClick={handleRedeem}
        disabled={!selected || loading || !isConnected}
        className={clsx(
          "w-full h-15 flex items-center justify-center gap-2 px-6 py-3 rounded-3xl font-semibold transition-colors duration-200",
          selected && !loading && isConnected
            ? "bg-[#432DA8] text-white hover:bg-[#E1D0FF] hover:text-[#432DA8]"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        )}
      >
        {loading
          ? "Redeeming..."
          : selected
          ? `Redeem ${selected}`
          : "Select a coffee to redeem"}
      </button>

      {txHash && selected && (
        <p className="text-md font-semibold text-[#432DA8] text-center">
          You redeemed one {selected}:{" "}
          <a
            href={`https://testnet.monadexplorer.com/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-500"
          >
            {formatTx(txHash)}
          </a>
        </p>
      )}

      {error && <p className="text-sm text-red-500 break-words">{error}</p>}
    </div>
  );
}
