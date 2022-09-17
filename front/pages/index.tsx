import * as React from "react";
import type { NextPage } from "next";
import { useEthers } from "@usedapp/core";
import { Template } from "../templates";
import abi from "../abi.json";
import { utils } from "ethers";
import { ethers } from "ethers";

const Home: NextPage = () => {
  const { activateBrowserWallet, account, library } = useEthers();
  const [mintStatus, setMintStatus] = React.useState<boolean>(false);
  const contractAddress = "0x91c08B3c72B1A665F038b6629C3d683C81a6a4B2";
  const contractInterface = new utils.Interface(abi);

  const mintBlack = async () => {
    const signer = library?.getSigner();
    const contract = await new ethers.Contract(contractAddress, abi, signer);
    const tx = await contract.mintBlack();
  };

  const mintColorful = async () => {
    const signer = library?.getSigner();
    const contract = await new ethers.Contract(contractAddress, abi, signer);
    const tx = await contract.mintColorful();
  };

  const connect = () => {
    const agent = window.navigator.userAgent.toLowerCase();
    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
      const { ethereum } = window;
      if (ethereum && ethereum.isMetaMask) {
        console.log("metamask installed!");
        activateBrowserWallet();
      } else {
        window.open(
          "https://metamask.app.link/dapp/wrappy-freemint.vercel.app/"
        );
        console.log("please metamask install");
      }
    }
    activateBrowserWallet();
  };

  return (
    <>
      <Template
        account={account}
        mintStatus={mintStatus}
        mintBlack={mintBlack}
        mintColorful={mintColorful}
        activeWallet={connect}
      />
    </>
  );
};

export default Home;
