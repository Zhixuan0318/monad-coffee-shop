"use client";

import { useAccount } from "wagmi";
import { useState } from "react";

interface ClaimButtonProps {
  onClaimSuccess?: () => void;
}

export default function ClaimButton({ onClaimSuccess }: ClaimButtonProps) {
  const { address, isConnected } = useAccount();
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleClaim = async () => {
    if (!isConnected || !address) return;

    setLoading(true);
    setError(null);
    setTxHash(null);

    try {
      const res = await fetch("/api/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");

      setTxHash(data.hash);
      onClaimSuccess?.();
    } catch (err: unknown) {
      console.error("Claim failed:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error");
      }
    } finally {
      setLoading(false);
    }
  };

  const formatTx = (hash: string) => {
    return `${hash.slice(0, 6)}...${hash.slice(-5)}`;
  };

  return (
    <div className="space-y-2 text-center">
      <button
        onClick={handleClaim}
        disabled={loading || !isConnected}
        className="w-full h-15 flex items-center justify-center gap-2 px-6 py-3 rounded-3xl font-semibold bg-[#432DA8] text-white hover:bg-[#E1D0FF] hover:text-[#432DA8] transition-colors duration-200"
      >
        {loading ? "Claiming..." : "Claim 1 BEAN"}
      </button>

      {txHash && (
        <p className="text-md font-semibold text-[#432DA8] mt-3">
          You had received 1 BEAN:{" "}
          <a
            href={`https://testnet.monadexplorer.com/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-500 transition-colors duration-200"
          >
            {formatTx(txHash)}
          </a>
        </p>
      )}

      {error && (
        <p className="text-sm text-red-500 break-words text-center">
          ❌ {error}
        </p>
      )}
    </div>
  );
}
