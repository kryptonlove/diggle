import React from "react";
import ReactDOM from "react-dom";
import { WagmiConfig, createClient, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { RainbowKitProvider, ConnectButton } from "@rainbow-me/rainbowkit";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import "@rainbow-me/rainbowkit/styles.css";

// Configure chains and client
const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [publicProvider()]
);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: () => [],
  provider,
});

function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <ConnectButton />
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

const root = document.getElementById("root");
ReactDOM.render(<App />, root);
