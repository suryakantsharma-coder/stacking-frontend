import Erc20StakingVault from "@/screens/stacking-erc20";

function Page() {
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
            }}>Token Staking Vault </h1>
            <Erc20StakingVault />
    </div>
     );
}

export default Page;