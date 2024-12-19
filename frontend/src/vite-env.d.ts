// import { MetaMaskProvider } from 'web3';
/// <reference types="vite/client" />

declare global {
	interface Window {
		ethereum: import('web3').MetaMaskProvider;
	}
}
export {}