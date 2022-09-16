import * as React from "react";
import type { NextPage } from "next";
import { useEthers } from "@usedapp/core";
import { Template } from "../templates";
import { Contract } from "@ethersproject/contracts";
import abi from "../abi.json";
import { utils } from "ethers";
import { ethers } from "ethers";

const Home: NextPage = () => {
  const { activateBrowserWallet, chainId, account, library } = useEthers();
  const [mintStatus, setMintStatus] = React.useState<boolean>(false);
  const [isPolygon, setIsPolygon] = React.useState<boolean>(false);
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

  if (chainId === 137) setIsPolygon(true);

  console.log("chainId :", chainId);
  return (
    <Template
      activeWallet={activateBrowserWallet}
      account={account}
      mintStatus={mintStatus}
      mintBlack={mintBlack}
      mintColorful={mintColorful}
      isPolygon={isPolygon}
    />
  );
};

export default Home;
