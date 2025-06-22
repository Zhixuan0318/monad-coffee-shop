'use client';

import Image from 'next/image';

export default function Banner() {
  return (
    <div className="min-w-xl min-h-[200px] rounded-4xl bg-[#E1D0FF] flex items-center justify-between p-6 mt-8">
      {/* Left Section */}
      <div className="flex flex-col justify-center space-y-2 ml-12 mt-2">
        <span className="text-4xl font-medium text-[#432DA8]">Start your day with</span>
        <div className="flex items-center space-x-2">
          <span className="text-4xl font-medium text-[#432DA8]">the Monad coffee</span>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex justify-center items-center mr-20">
        <Image
          src="/monad-coffee-cup.png"
          alt="Coffee Cup"
          width={85}
          height={85}
          className="object-contain"
        />
      </div>
    </div>
  );
}
