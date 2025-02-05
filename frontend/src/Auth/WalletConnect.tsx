// import React from 'react'
import Web3 from "web3";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import Centrium from "../assets/Centrum2.png";
import BNB2 from "../assets/BNB.png";
import bnbVector from "../assets/Vector.png";
import metafox from "../assets/metafox.png";
import { Button } from "@/components/ui/button";
import { ArrowBigRightDash, Wallet, X } from "lucide-react";
import { motion } from "motion/react";
const WalletConnect = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [accounts, setAccounts] = useState<string[] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [connectedAccount, setConnectedAccount] = useState<string | null>(null);
  const trunc = `${connectedAccount?.slice(
    0,
    6
  )}.......${connectedAccount?.slice(
    connectedAccount?.length - 7,
    connectedAccount?.length - 1
  )} `;
  const messageToSign = `Centrium wants you to sign this message with your Ethereum account: ${trunc}. Click 'Sign' or 'Approve' to prove that you are the account owner. This request will not trigger any blockchain transactions or cost any gas fees.`;
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  //Set Web3 on load
  useEffect(() => {
    if (window.ethereum) {
      setWeb3(new Web3(window.ethereum));
    }
  }, []);

  //Grab and Set Chain ID
  useEffect(() => {
    async function getChainId() {
      if (web3 === null) {
        return;
      }

      setChainId(`${await web3.eth.getChainId()}`);
    }
    getChainId();
    console.log(chainId);
  }, []);

  //Log new chain ID on change
  web3?.provider?.on("chainChanged", (newId) => {
    const decId = parseInt(newId, 16);
    setChainId(`${decId}`);
    console.log(chainId);
  });

  //Log new accounts on change
  web3?.provider?.on("accountsChanged", () => {
    window.ethereum
      .request({ method: "eth_accounts" })
      .then((accounts: string | string[]) => {
        if (accounts.length > 0) {
          if (!accounts.includes(connectedAccount!))
            setConnectedAccount(accounts[0]);
          console.log("Currently connected accounts:", accounts);
        } else {
          setIsAuthenticated(false);
          setIsConnected(false);
          console.log("No accounts connected");
        }
      });
  });

  async function switchToBSC() {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x38" }], // 0x38 is 56 in hexadecimal
      });
      console.log("Switched to BSC");
      setChainId("56");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.code === 4902) {
        console.error("BSC network not found in Metamask");
      } else {
        console.error("Failed to switch network", error);
      }
    }
  }

  async function requestAccounts() {
    if (web3 === null) {
      return;
    }

    await window.ethereum.request({ method: "eth_requestAccounts" });

    const allAccounts = await web3.eth.getAccounts();
    setAccounts(allAccounts);

    setConnectedAccount(allAccounts[0]);
    setIsConnected(true);
  }
  async function signMessage() {
    if (web3 === null || accounts === null || messageToSign === null) {
      return;
    }

    // sign message with first MetaMask account
    await web3.eth.personal.sign(messageToSign, accounts[0], "");

    setIsAuthenticated(true);
    navigate("/");
  }

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div
      className={`w-screen bg-cover bg-center`}
      style={{ backgroundImage: `url(${"../../public/Landing2.png"})` }}
    >
      <div className="header flex justify-between items-center mx-auto px-[5%] py-4 border-b-2 border-slate-400">
        <img src={Logo} alt="" className="" />
        <Button
          onClick={handleModal}
          className="py-5 bg-[#3801A7] hover:bg-[#1e0846] modalbtn"
        >
          {" "}
          Get Started
          <ArrowBigRightDash className="ml-4" />
        </Button>
      </div>
      <div className="hero w-[65%] mx-auto flex flex-col gap-10 py-10">
        <h1 className="font-sofia font-semibold text-[#051314] text-7xl text-center">
          Discover, Learn, and Grow in Web3 – All in One Place
        </h1>
        <p className="font-poppins text-lg text-center">
          Centrium bridges the gap in Web3 content discovery by providing
          structured threads, step-by-step guides, and tailored community
          spaces. Whether you're new or experienced, Centrium makes navigating
          Web3 easy and engaging.
        </p>
        <Button
          onClick={handleModal}
          className="py-5 bg-[#3801A7] hover:bg-[#1e0846] w-max px-8 mx-auto modalbtn"
        >
          Connect Wallet <Wallet className="ml-6" />
        </Button>
      </div>
      <div className="footer flex justify-center items-center gap-6 w-full py-7">
        <img src={Centrium} alt="" />
        <img src={BNB2} alt="" className="w-14" />
      </div>
      <div
        className={`w-screen h-screen fixed inset-0 items-center justify-center bg-slate-300/50 z-10 ${
          isModalOpen ? "flex" : "hidden"
        }`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 1 }}
          className="p-4 rounded-lg flex flex-col gap-3 bg-white w-96 mt-[3.5rem]"
        >
          <div className="w-full flex justify-end">
            <X onClick={handleModal} className="cursor-pointer" />
          </div>
          <img src={Centrium} alt="" className="w-14 mx-auto" />
          <p className="text-center font-sofia">
            Start your Centrium journey by connecting your wallet
          </p>
          {chainId !== "56" && (
            <Button
              onClick={switchToBSC}
              className="py-5 hover:bg-[#1e0846] w-max px-8 mx-auto modalbtn"
            >
              <img src={bnbVector} alt="" className="w-7" /> Switch to BSC
            </Button>
          )}
          {chainId == "56" && !isConnected && (
            <Button
              onClick={() => requestAccounts()}
              className="py-5 hover:bg-[#1e0846] w-max px-8 mx-auto modalbtn"
            >
              <img src={metafox} alt="" className="w-8" /> Login with MetaMask
            </Button>
          )}
          {chainId == "56" && isConnected && (
            <div className="py-5 w-[90%] px-4 mx-auto rounded-lg bg-slate-100">
              <p className=" text-sm font-syne font-semibold my-3">
                Centrium wants you to sign this message with your Ethereum
                account:
              </p>
              <p className="text-center text-sm font-syne font-semibold">{`${trunc}.`}</p>
            </div>
          )}
          {chainId == "56" && isConnected && (
            <Button
              onClick={signMessage}
              className="py-5 hover:bg-[#1e0846] w-max px-8 mx-auto modalbtn"
            >
              Proceed to Sign
            </Button>
          )}
          <p className="text-slate-500 text-sm font-sofia text-center">
            MetaMask must be installed
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default WalletConnect;
