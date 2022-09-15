import Head from "next/head";
import Image from "next/image";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styles from "../styles/Home.module.css";
import Navbar from "./components/Navbar";
import Register from "./Register";
import Landing from "./Landing";
import { useRouter } from "next/router";
import { useMoralis } from "react-moralis";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <Head>
          <title>Next</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>
    </>
  );
}
