'use client';

import Image from 'next/image';
import clsx from 'clsx';

const options = [
  { name: 'Cappuccino', image: '/cappuccino.png' },
  { name: 'Americano', image: '/americano.png' },
  { name: 'Latte', image: '/latte.png' },
];

type OptionProps = {
  selected: string | null;
  onSelect: (value: string) => void;
};

export default function Option({ selected, onSelect }: OptionProps) {
  return (
    <div className="w-full flex flex-col items-center space-y-6">
      {/* Option cards */}
      <div className="w-full flex justify-center gap-x-4">
        {options.map((option) => {
          const isSelected = selected === option.name;

          return (
            <div
              key={option.name}
              onClick={() => onSelect(option.name)}
              className={clsx(
                'flex-1 cursor-pointer border-2 rounded-xl p-4 text-center transition-transform transform hover:scale-105',
                isSelected ? 'border-4 border-[#6448E1]' : 'border-gray-200'
              )}
            >
              <Image
                src={option.image}
                alt={option.name}
                width={100}
                height={100}
                className="mx-auto mb-2 object-contain w-24 h-24"
              />
              <div className="text-md font-semibold text-gray-800">{option.name}</div>
              <div className="mt-2 flex items-center justify-center space-x-1 text-md text-gray-700">
                <span>1</span>
                <Image
                  src="/bean-logo.png"
                  alt="Bean Logo"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
