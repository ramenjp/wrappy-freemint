import * as React from "react";
import type { NextPage } from "next";
import { useEthers, Mainnet, Goerli, useContractFunction } from "@usedapp/core";
import { getDefaultProvider } from "ethers";
import { Template } from "../templates";
import { Contract } from "@ethersproject/contracts";
import abi from "../abi.json";
import ethers from "ethers";

const Home: NextPage = () => {
  const config = {
    readOnlyUrls: {
      [Mainnet.chainId]: getDefaultProvider("mainnet"),
      [Goerli.chainId]: getDefaultProvider("goerli"),
    },
  };

  const { activateBrowserWallet, chainId, account } = useEthers();

  const contractAddress = "0x7b98de4493979474cffbe1ab6cd45a72450b4cc0";
  const contractInterface = new ethers.utils.Interface(abi);
  const contract = new Contract(contractAddress, contractInterface);

  const { state, send } = useContractFunction(contract, "deposit", {
    transactionName: "Wrap",
    gasLimitBufferPercentage: 10,
  });
  React.useEffect(() => {}, []);

  return (
    <Template
      activeWallet={activateBrowserWallet}
      account={account}
      chainId={chainId}
    />
  );
};

export default Home;
