import Banner from "@/component/banner";
import Balance from "@/component/balance";
import ClaimButton from "@/component/claim-button";
import Option from "@/component/option";
import WalletConnectButton from "@/component/walletConnect-button";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen">
      <div className="w-full max-w-2xl space-y-5">
        {/* Banner */}
        <Banner />
        <WalletConnectButton/>

        {/* Balance Row */}
        <div className="flex space-x-2">
          <Balance title="Total Supply" amount={1000} />
          <Balance title="Your Balance" amount={1000} />
        </div>
        
        {/* Claim */}
        <div className="mt-4">
          <ClaimButton />
        </div>

        <h2 className="font-semibold text-lg text-[#432DA8] mt-10">Choose a coffee</h2>
        <Option/>
      </div>
    </main>
  );
}
