import * as React from "react";
import type { NextPage } from "next";
import { useEthers, useCall } from "@usedapp/core";
import { Template } from "../templates";
import { Contract } from "@ethersproject/contracts";
import abi from "../abi.json";
import { utils } from "ethers";
import { ethers } from "ethers";
import { redirect } from "next/dist/server/api-utils";

const Home: NextPage = () => {
  const { activateBrowserWallet, account, library } = useEthers();
  const [mintStatus, setMintStatus] = React.useState<boolean>(false);
  const contractAddress = "0xBf1Ac2Bb8D7AB67F8864C5A9B122E7C2917e2f85";
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
