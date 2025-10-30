import { Metadata } from "next";

import "@rainbow-me/rainbowkit/styles.css";

import { ScaffoldEthAppWithProviders } from "../components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "../components/ThemeProvider";
import WalletProviders from "../components/solana/WalletProviders";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Umay - Agricultural Investment Platform",
  description: "Decentralized agricultural investment platform for Kyrgyzstan",
  icons: "/logo.svg",
};

const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider enableSystem>
          <WalletProviders>
            <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
          </WalletProviders>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default ScaffoldEthApp;
