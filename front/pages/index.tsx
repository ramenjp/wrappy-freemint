import * as React from "react";
import type { NextPage } from "next";
import { useEthers } from "@usedapp/core";
import { Template } from "../templates";
import { Contract } from "@ethersproject/contracts";
import abi from "../abi.json";
import { utils } from "ethers";
import { ethers } from "ethers";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { activateBrowserWallet, chainId, account, library } = useEthers();
  const router = useRouter();
  const [mintStatus, setMintStatus] = React.useState<boolean>(false);
  const [isPolygon, setIsPolygon] = React.useState<boolean>(true);
  const contractAddress = "0xa94A7bBBe4723986268f158238d9c6b9d7a68Dc4";
  const contractInterface = new utils.Interface(abi);

  const mintBlack = async () => {
    const signer = library?.getSigner();
    const contract = await new ethers.Contract(contractAddress, abi, signer);
    const tx = await contract.mintBlack();
  };

  const mintColorful = async () => {
    const signer = library?.getSigner();
    const contract = await new ethers.Contract(contractAddress, abi, signer);
    const tx = await contract.mintBlack();
  };

  // if (chainId === 137) setIsPolygon(true);

  console.log("chainId :", chainId);

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
    <Template
      account={account}
      mintStatus={mintStatus}
      isPolygon={isPolygon}
      mintBlack={mintBlack}
      mintColorful={mintColorful}
      activeWallet={connect}
    />
  );
};

export default Home;
