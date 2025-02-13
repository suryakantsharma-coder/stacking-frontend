"use client";
import { Staking } from "../../components/Staking";


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
