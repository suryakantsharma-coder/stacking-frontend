import { TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react";
import { REWARD_TOKEN_CONTRACT, STAKING_CONTRACT } from "../utils/contracts";
import { toEther } from "thirdweb";
import { useEffect } from "react";
import { balanceOf } from "thirdweb/extensions/erc721";

export const StakeRewards = () => {
    const account = useActiveAccount();

    const {
        data: tokenBalance,
        isLoading: isTokenBalanceLoading,
        refetch: refetchTokenBalance,
    } = useReadContract(
        balanceOf,
        {
            contract: REWARD_TOKEN_CONTRACT,
            owner: account?.address || "0x",
        }
    )
    
    const {
        data: stakedInfo,
        refetch: refetchStakedInfo,
    } = useReadContract({
        contract: STAKING_CONTRACT,
        method: "getStakeInfo",
        params: [account?.address || "0x"],
    });

    useEffect(() => {
        refetchStakedInfo();
        const interval = setInterval(() => {
            refetchStakedInfo();
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    let tokenSymbol = "VXP";

    return (
        <div style={{ width: "100%", margin: "20px 0", display: "flex", flexDirection: "column" }}>
            {!isTokenBalanceLoading && (
                <div style={{
                    display: "flex",
                    justifyContent : "space-between",
                    alignItems: "center",
                    width: "100%",
                    margin: "20px 0",
                }}>
                    <p>Wallet Balance: </p>
                    {/* @ts-ignore */}
                    <p>{parseFloat((toEther(BigInt(tokenBalance!?.toString()) || "0"))?.toString())?.toFixed(2)} {tokenSymbol}</p>
                </div>
            )}

            <div style={{
                display: "flex",
                justifyContent : "space-between",
                alignItems: "center",
                width: "100%",
                margin: "20px 0",
            }}>
            <h2 style={{ marginBottom: "20px", fontSize : 18}}>Stake Rewards:</h2>
                <h2 style={{ marginBottom: "20px", fontSize: 18 }}>{stakedInfo && parseFloat(toEther(BigInt(stakedInfo[1]?.toString())))?.toFixed(4)} {tokenSymbol}</h2>
            </div>
            {/* <TransactionButton
                transaction={() => (
                    alert("Claim Rewards Disabled.")
                    // prepareContractCall({
                    //     contract:STAKING_CONTRACT,
                    //     method: "claimRewards",
                    // })
                )}
                onTransactionConfirmed={() => {
                    alert("Rewards claimed!")
                    refetchStakedInfo();
                    refetchTokenBalance();
                }}
                style={{
                    border: "none",
                    backgroundColor: "#333",
                    color: "#fff",
                    padding: "10px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    width: "100%",
                    fontSize: "12px"
                }}
            >Claim Rewards</TransactionButton> */}


            <button
                style={{
                    border: "none",
                    backgroundColor: "#333",
                    color: "#fff",
                    padding: "10px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    width: "100%",
                        fontSize: "12px",
                    opacity: 0.5,
                    }}
                    disabled={true}
                    onClick={() => {
                        alert("Claim Rewards Disabled.")
                    }}
            >
                Claim Rewards
            </button>
        </div>
    )
};