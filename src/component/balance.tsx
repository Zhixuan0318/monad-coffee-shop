'use client';

import Image from 'next/image';

interface BalanceProps {
  title: string;
  amount: string | number;
}

export default function Balance({ title, amount }: BalanceProps) {
  return (
    <div className="flex items-center border-2 border-gray-200 bg-[#FAF6FF] rounded-3xl p-4 space-x-2 w-full">
      {/* Logo */}
      <Image
        src="/bean-logo.png"
        alt="Bean Logo"
        width={32}
        height={32}
      />

      {/* Title and Amount */}
      <div className="flex space-x-2 items-baseline">
        <span className="text-[#432DA8] text-md font-semibold">{title}:</span>
        <span className="text-[#333] font-mono font-medium">{amount}</span>
      </div>
    </div>
  );
}
