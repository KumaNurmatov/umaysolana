"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function ConnectWalletButton({ className = "" }: { className?: string }) {
  return (
    <WalletMultiButton
      className={`px-8 py-3 bg-gradient-to-br from-primary to-primary/90 text-white text-lg font-semibold rounded-lg shadow-lg shadow-primary/20 hover:shadow-xl transition-all duration-200 ${className}`}
    />
  );
}
