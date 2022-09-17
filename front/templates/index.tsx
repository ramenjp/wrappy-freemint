import * as React from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { useEthers } from "@usedapp/core";

type Props = {
  activeWallet: () => void;
  mintColorful: () => void;
  mintBlack: () => void;
  account?: string;
  mintStatus: boolean;
};

export const Template: React.FC<Props> = (props) => {
  const { chainId } = useEthers();
  console.log("chainId :", chainId);

  return (
    <div className={styles.container}>
      <Head>
        <title>Wrappy Free Mint</title>
        <meta name="wrappy free mint" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!props.account ? (
        <div>
          <div className={styles.main}>
            <div className={styles.title}>Wrappy Free Mint NFT!</div>
            <button className={styles.connect} onClick={props.activeWallet}>
              CONNECT WALLET
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.title}>You can mint only 1 NFT</div>
          {chainId !== 137 || 80001 ? (
            <div className={styles.text}>Please connect Polygon Network</div>
          ) : null}
          <div className={styles.images}>
            <div className={styles.item}>
              <Image
                src="/VERYWRAPPY_1.png"
                alt="wrappy_1"
                width={160}
                height={160}
              />
              <button className={styles.mint} onClick={props.mintBlack}>
                Mint
              </button>
            </div>
            <div className={styles.item}>
              <Image
                src="/VERYWRAPPY_2.png"
                alt="wrappy_2"
                width={160}
                height={160}
              />
              <button className={styles.mint} onClick={props.mintColorful}>
                Mint
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
