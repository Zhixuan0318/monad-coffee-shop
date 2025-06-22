'use client';

import Image from 'next/image';

export default function ClaimButton() {
  return (
    <button
      className="w-full h-15 flex items-center justify-center gap-2 px-6 py-3 rounded-3xl font-semibold bg-[#432DA8] text-white hover:bg-[#E1D0FF] hover:text-[#432DA8] transition-colors duration-200"
    >
      Claim 1
      <Image
        src="/bean-logo.png"
        alt="Bean Logo"
        width={20}
        height={20}
        className="h-5 w-5 object-contain"
      />
      BEAN
    </button>
  );
}
