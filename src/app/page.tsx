"use client";
import { ConnectButton } from "thirdweb/react";
import { client } from "./client";
import { Staking } from "../../components/Staking";
import { ethereum, sepolia } from "thirdweb/chains";

export default function Home() {


  return (
    <div style={{
      minHeight : "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "black",
      overflowX : "hidden",
      overflowY: "scroll",
      // width: "500px",
    }}>
      <h1 style={{
        marginTop: 20,
        marginBottom: 20,
        color: "white",
      } }>Staking App</h1>
        <Staking />
    </div>
  );
}
