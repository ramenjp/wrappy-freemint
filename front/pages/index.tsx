import * as React from "react";
import type { NextPage } from "next";
import {
  useEthers,
  Mainnet,
  Goerli,
  useContractFunction,
  useCall,
} from "@usedapp/core";
import { getDefaultProvider } from "ethers";
import { Template } from "../templates";
import { Contract } from "@ethersproject/contracts";
import abi from "../abi.json";
import { utils } from "ethers";

const Home: NextPage = () => {
  const config = {
    readOnlyUrls: {
      [Mainnet.chainId]: getDefaultProvider("mainnet"),
      [Goerli.chainId]: getDefaultProvider("goerli"),
    },
  };

  const { activateBrowserWallet, chainId, account } = useEthers();

  const contractAddress = "0x1A1f274b1A5Bb1613d947D00330473d3d57cd7A7";
  const contractInterface = new utils.Interface(abi);

  const { value, error } =
    useCall(
      contractAddress && {
        contract: new Contract(contractAddress, contractInterface),
        method: "name",
        args: [],
      }
    ) ?? {};

  console.log("value :", value);
  console.log("error :", error);

  return (
    <Template
      activeWallet={activateBrowserWallet}
      account={account}
      chainId={chainId}
    />
  );
};

export default Home;
