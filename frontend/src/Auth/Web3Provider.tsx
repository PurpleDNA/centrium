import { WagmiProvider, createConfig, http } from "wagmi";
import { bsc, mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { injected, metaMask } from "wagmi/connectors";

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [bsc, mainnet],
    connectors: [injected(), metaMask()],
    // multiInjectedProviderDiscovery: false,
    transports: {
      // RPC URL for each chain
      [bsc.id]: http(`https://binance.llamarpc.com}`),
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
