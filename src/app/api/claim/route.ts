import { NextResponse } from 'next/server';
import { privateKeyToAccount } from 'viem/accounts';
import {
  createWalletClient,
  createPublicClient,
  encodeFunctionData,
  parseUnits,
  http,
} from 'viem';
import { monadTestnet } from '@wagmi/core/chains';
import { beanTokenABI } from '@/lib/abi/beanToken';

const FAUCET_PRIVATE_KEY = process.env.FAUCET as `0x${string}`;
const BEAN_ADDRESS = '0x110225d9A24a40374D752B1d05275488aB5CC8b6';

export async function POST(req: Request) {
  const { address } = await req.json();

  if (!address) {
    return NextResponse.json({ error: 'Missing address' }, { status: 400 });
  }

  try {
    const account = privateKeyToAccount(FAUCET_PRIVATE_KEY);

    const walletClient = createWalletClient({
      account,
      chain: monadTestnet,
      transport: http(),
    });

    const publicClient = createPublicClient({
      chain: monadTestnet,
      transport: http(),
    });

    // Send the transaction
    const txHash = await walletClient.sendTransaction({
      to: BEAN_ADDRESS,
      data: encodeFunctionData({
        abi: beanTokenABI,
        functionName: 'transfer',
        args: [address, parseUnits('1', 18)],
      }),
    });

    // Wait for confirmation
    await publicClient.waitForTransactionReceipt({ hash: txHash });

    return NextResponse.json({ hash: txHash });
  } catch (error) {
    console.error('Claim Error:', error);
    return NextResponse.json({ error: 'Claim failed' }, { status: 500 });
  }
}
