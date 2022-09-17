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
  const [message, setMessage] = React.useState<string>("");
  const [message2, setMessage2] = React.useState<string>("");
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
      setMessage2("スマホです");
    }
    if (agent.indexOf("chrome") != -1) {
      setMessage("ブラウザはchromeです。");
    } else if (agent.indexOf("safari") != -1) {
      setMessage("ブラウザはsafariです。");
    } else if (agent.indexOf("metamask") != -1) {
      setMessage("ブラウザはmetamaskです。");
    }

    {
      // if () {
      //   router.replace(
      //     "https://metamask.app.link/dapp/wrappy-freemint.vercel.app/"
      //   );
    }
    // activateBrowserWallet();
  };

  return (
    <>
      <div>{message}</div>
      <div>{message2}</div>
      <Template
        activeWallet={connect}
        account={account}
        mintStatus={mintStatus}
        mintBlack={mintBlack}
        mintColorful={mintColorful}
        isPolygon={isPolygon}
      />
    </>
  );
};

export default Home;
