import { NextResponse } from 'next/server';
import { privateKeyToAccount } from 'viem/accounts';
import {
  createWalletClient,
  createPublicClient,
  encodeFunctionData,
  http,
} from 'viem';
import { monadTestnet } from '@wagmi/core/chains';
import { beanTokenABI } from '@/lib/abi/beanToken';

const FAUCET_PRIVATE_KEY = process.env.FAUCET as `0x${string}`;
const BEAN_ADDRESS = '0x110225d9A24a40374D752B1d05275488aB5CC8b6';

export async function POST(req: Request) {
  const { userAddress, drinkName } = await req.json();

  if (!userAddress || !drinkName) {
    return NextResponse.json({ error: 'Missing userAddress or drinkName' }, { status: 400 });
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

    // Call redeemCoffee(userAddress, drinkName) from FAUCET account
    const txHash = await walletClient.sendTransaction({
      to: BEAN_ADDRESS,
      data: encodeFunctionData({
        abi: beanTokenABI,
        functionName: 'redeemCoffee',
        args: [userAddress, drinkName],
      }),
    });

    await publicClient.waitForTransactionReceipt({ hash: txHash });

    return NextResponse.json({ hash: txHash });
  } catch (error) {
    console.error('Redeem Error:', error);
    return NextResponse.json({ error: 'Redeem failed' }, { status: 500 });
  }
}
