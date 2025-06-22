'use client';

import { useAccount, useSwitchChain } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import clsx from 'clsx';
import { config } from '@/config/wagmi';

const TARGET_CHAIN = config.chains[0]; // monadTestnet from config

export default function WalletConnectButton() {
  const { isConnected, chainId } = useAccount();
  const { switchChain } = useSwitchChain({ config });

  const needsSwitch = isConnected && chainId !== TARGET_CHAIN.id;

  return (
    <ConnectButton.Custom>
      {({ openConnectModal }) => {
        let label = 'Wallet Connected';
        let onClick = () => {};

        if (!isConnected) {
          label = 'Connect Wallet';
          onClick = () => openConnectModal?.();
        } else if (needsSwitch) {
          label = `Switch to ${TARGET_CHAIN.name}`;
          onClick = () => switchChain?.({ chainId: TARGET_CHAIN.id });
        }

        return (
          <button
            onClick={onClick}
            className={clsx(
              'w-full h-15 flex items-center justify-center gap-2 px-6 py-3 rounded-3xl font-semibold transition-colors duration-200',
              needsSwitch
                ? 'bg-orange-400 text-white hover:bg-yellow-400'
                : !isConnected
                ? 'bg-[#432DA8] text-white hover:bg-[#E1D0FF] hover:text-[#432DA8]'
                : 'bg-[#432DA8] text-white'
            )}
          >
            {label}
          </button>
        );
      }}
    </ConnectButton.Custom>
  );
}
