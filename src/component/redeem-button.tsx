'use client';

import clsx from 'clsx';

type RedeemProps = {
  selected: string | null;
};

export default function Redeem({ selected }: RedeemProps) {
  return (
    <button
      disabled={!selected}
      className={clsx(
        'w-full h-15 flex items-center justify-center gap-2 px-6 py-3 rounded-3xl font-semibold transition-colors duration-200',
        selected
          ? 'bg-[#432DA8] text-white hover:bg-[#E1D0FF] hover:text-[#432DA8]'
          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
      )}
    >
      {selected ? `Redeem ${selected}` : 'Select a coffee to redeem'}
    </button>
  );
}
