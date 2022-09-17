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
  const { activateBrowserWallet, chainId, account, library } = useEthers();
  const [mintStatus, setMintStatus] = React.useState<boolean>(false);
  const [isPolygon, setIsPolygon] = React.useState<boolean>(true);
  const contractAddress = "0xc04539E9e05ad94D16a6b9b7ff22A317B9b9F5Eb";
  const contractInterface = new utils.Interface(abi);

  // const useMintNftBlack = () => {
  //   const value = useCall(
  //     contractAddress && {
  //       contract: new Contract(contractAddress, contractInterface),
  //       method: "mintNftId_1",
  //       args: [],
  //     }
  //   );
  //   // if (error) return undefined;
  //   console.log("value :", value);
  //   return value;
  // };

  // const mintNftId_1 = useMintNftBlack();
  // console.log("mintNftId_1 :", mintNftId_1);

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

  const getmintNftId1 = async () => {
    const signer = library?.getSigner();
    const contract = await new ethers.Contract(contractAddress, abi, signer);
    const tx = await contract.mintNftId_1();
    console.log("tx :", tx);
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
        isPolygon={isPolygon}
        mintBlack={mintBlack}
        mintColorful={mintColorful}
        activeWallet={connect}
      />
    </>
  );
};

export default Home;
