import { WagmiProvider, createConfig, http } from "wagmi";
import { bscTestnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { injected } from "wagmi/connectors";

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [bscTestnet],
    connectors: [injected()],
    // multiInjectedProviderDiscovery: false,
    transports: {
      // RPC URL for each chain
      [bscTestnet.id]: http(`https://data-seed-prebsc-2-s1.bnbchain.org:8545`),
    },

    // Required API Keys
    walletConnectProjectId:
      String(import.meta.env.VITE_PUBLIC_WALLETCONNECT_PROJECT_ID) || "",

    // Required App Info
    appName: "ConnectKit Demo",
  })
);

const queryClient = new QueryClient();

interface Web3ProviderProps {
  children: React.ReactNode;
}

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
