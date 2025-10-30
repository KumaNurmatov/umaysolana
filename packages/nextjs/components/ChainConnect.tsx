"use client";

import { useState } from "react";
import { ConnectButton as EthConnectButton } from "@rainbow-me/rainbowkit";
import ConnectWalletButton from "./solana/ConnectWalletButton";

type Props = { size?: "sm" | "md"; fullWidth?: boolean };

export default function ChainConnect({ size = "md", fullWidth = false }: Props) {
  const [chain, setChain] = useState<"solana" | "ethereum">("solana");

  const toggleBtnBase = size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm";
  const solBtnSize = size === "sm" ? "px-4 py-2 text-sm" : "px-8 py-3 text-lg";
  const containerWidth = fullWidth ? "w-full" : "";

  return (
    <div className={`flex items-center gap-3 ${containerWidth}`}>
      <div className="flex rounded-lg border border-border overflow-hidden">
        <button
          onClick={() => setChain("solana")}
          className={`${toggleBtnBase} font-medium transition-colors ${
            chain === "solana" ? "bg-primary text-white" : "bg-background text-foreground hover:bg-card"
          }`}
        >
          Solana
        </button>
        <button
          onClick={() => setChain("ethereum")}
          className={`${toggleBtnBase} font-medium transition-colors border-l border-border ${
            chain === "ethereum" ? "bg-primary text-white" : "bg-background text-foreground hover:bg-card"
          }`}
        >
          Ethereum
        </button>
      </div>

      {chain === "solana" ? (
        <div className={fullWidth ? "flex-1" : ""}>
          <ConnectWalletButton className={`${fullWidth ? "w-full justify-center" : ""} ${solBtnSize}`} />
        </div>
      ) : (
        <EthConnectButton.Custom>
          {({ account, chain, openConnectModal, mounted }) => {
            const ready = mounted;
            const connected = ready && account && chain;
            if (!connected) {
              return (
                <button
                  onClick={openConnectModal}
                  className={`${solBtnSize} ${fullWidth ? "w-full" : ""} bg-gradient-to-br from-primary to-primary/90 text-white font-semibold rounded-lg shadow-lg shadow-primary/20 hover:shadow-xl transition-all duration-200`}
                >
                  Connect
                </button>
              );
            }
            return (
              <div className={`${fullWidth ? "w-full text-center" : ""} px-4 py-2 text-sm font-medium rounded-lg border border-border bg-background text-foreground`}>
                {account?.displayName}
              </div>
            );
          }}
        </EthConnectButton.Custom>
      )}
    </div>
  );
}


