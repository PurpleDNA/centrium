// import React from 'react'
import Web3 from "web3";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
const WalletConnect = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [provider, setProvider] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [accountButtonDisabled, setAccountButtonDisabled] =
    useState<boolean>(false);
  const [accounts, setAccounts] = useState<string[] | null>(null);
  const [connectedAccount, setConnectedAccount] = useState<string | null>(null);
  const messageToSign = `Centrium wants you to sign this message with your Ethereum account:${connectedAccount}.Click 'Sign' or 'Approve' to prove that you are the account owner. This request will not trigger any blockchain transactions or cost any gas fees.`;
  const [signingResult, setSigningResult] = useState<string | null>(null);
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (window.ethereum) {
      setWeb3(new Web3(window.ethereum));
      if (window.ethereum.isMetaMask) {
        setProvider("Connected to bnb with Metamask");
      } else {
        setProvider("Non-MetaMask Ethereum Provider Detected");
      }
    } else {
      setWarning("Please install MetaMask");
      setAccountButtonDisabled(true);
    }
  }, []);

  useEffect(() => {
    async function getChainId() {
      if (web3 === null) {
        return;
      }

      setChainId(`Chain ID: ${await web3.eth.getChainId()}`);
    }
    getChainId();
  }, [web3]);

  async function switchToBSC() {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x38" }], // 0x38 is 56 in hexadecimal
      });
      console.log("Switched to BSC");
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

    if (chainId !== "56") {
      switchToBSC();
    }

    // request accounts from MetaMask
    await window.ethereum.request({ method: "eth_requestAccounts" });
    document.getElementById("requestAccounts")?.remove();

    // get list of accounts
    const allAccounts = await web3.eth.getAccounts();
    setAccounts(allAccounts);
    // get the first account and populate placeholder
    setConnectedAccount(allAccounts[0]);
  }
  async function signMessage() {
    if (web3 === null || accounts === null || messageToSign === null) {
      return;
    }

    // sign message with first MetaMask account
    const signature = await web3.eth.personal.sign(
      messageToSign,
      accounts[0],
      ""
    );

    setSigningResult(signature);
    setIsAuthenticated(true);
    navigate("/");
  }

  return (
    <div
      className={`w-screen h-screen fixed inset-0 items-center justify-center bg-slate-300/50 z-10 $`}
    >
      <div id="warn" style={{ color: "red" }}>
        {warning}
      </div>
      <div id="provider">{provider}</div>
      <div id="chainId">{chainId}</div>
      <div id="connectedAccount">{connectedAccount}</div>
      <div>
        <button
          onClick={() => requestAccounts()}
          id="requestAccounts"
          disabled={accountButtonDisabled}
          className="bg-black text-white p-2 "
        >
          Request MetaMask Accounts
        </button>
      </div>
      <div>
        <button
          onClick={() => signMessage()}
          id="signMessage"
          disabled={connectedAccount === null}
        >
          Sign Message
        </button>
        <div id="signingResult">{signingResult}</div>
      </div>
    </div>
  );
};

export default WalletConnect;
