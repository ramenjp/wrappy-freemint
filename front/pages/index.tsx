import * as React from "react";
import type { NextPage } from "next";
import { useEthers, Mainnet, Goerli } from "@usedapp/core";
import { getDefaultProvider } from "ethers";
import { Template } from "../templates";

const Home: NextPage = () => {
  const config = {
    readOnlyUrls: {
      [Mainnet.chainId]: getDefaultProvider("mainnet"),
      [Goerli.chainId]: getDefaultProvider("goerli"),
    },
  };

  const { activateBrowserWallet, chainId, account } = useEthers();

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
