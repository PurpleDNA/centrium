import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import '@nomicfoundation/hardhat-web3-v4'
require("dotenv").config();

const PRIVATE_KEY = process.env.PRIVATE_KEY
const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    bsctestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    },
  }
};

export default config;
