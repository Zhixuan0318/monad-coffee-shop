import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { monadTestnet } from '@wagmi/core/chains';

export const config = getDefaultConfig({
  appName: 'monad-coffee-shop',
  projectId: '0d96c994eeaf761d2d2ac3a07192d980',
  chains: [monadTestnet],
  ssr: true,
});
