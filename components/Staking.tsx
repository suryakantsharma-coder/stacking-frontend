'use client';

import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { ConnectButton, TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react";
import { StakeRewards } from "./StakeRewards";
import { NFT_CONTRACT, STAKING_CONTRACT } from "../utils/contracts";
import { NFT } from "thirdweb";
import { useEffect, useState } from "react";
import { claimTo, getNFTs, ownerOf, totalSupply } from "thirdweb/extensions/erc721";
import { NFTCard } from "./NFTCard";
import { StakedNFTCard } from "./StakedNFTCard";
import { IoIosInformationCircle } from "react-icons/io";
import { Tooltip } from "react-tooltip";
import { sepolia } from "thirdweb/chains";
import swal from 'sweetalert';


export const Staking = () => {
    const account = useActiveAccount();

    const [ownedNFTs, setOwnedNFTs] = useState<NFT[]>([]);
    
    const getOwnedNFTs = async () => {
        let ownedNFTs: NFT[] = [];

        const totalNFTSupply = await totalSupply({
            contract: NFT_CONTRACT,
        });
        const nfts = await getNFTs({
            contract: NFT_CONTRACT,
            start: 0,
            count: parseInt(totalNFTSupply.toString()),
        });
        
        for (let nft of nfts) {
            const owner = await ownerOf({
                contract: NFT_CONTRACT,
                tokenId: nft.id,
            });
            if ((owner)?.toString()?.toLowerCase() === (account?.address)?.toString()?.toLowerCase()) {

                ownedNFTs.push(nft);
            }
        }
        setOwnedNFTs(ownedNFTs);
    };
    
    useEffect(() => {
        if(account) {
            getOwnedNFTs();
        }
    }, [account]);


    const {
        data: stakedInfo,
        refetch: refetchStakedInfo,
    } = useReadContract({
        contract: STAKING_CONTRACT,
        method: "getStakeInfo",
        params: [account?.address || "0x"],
    });
    
    if(account) {
        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#151515",
                borderRadius: "8px",
                width: "auto",
                maxWidth: "400px",
                padding: "20px",
                color : 'white'
            }}>
                <ConnectButton
                    client={client}
                    chain={sepolia}
                />
                <div style={{
                    display: "flex",
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    margin: "20px 0",
                    width: "100%"
                }}>
                    <p style={{ marginRight: "4px", fontSize: 20, fontWeight: "bold", color: "white" }}>T3 Play Visionaries Staking Vault</p>
                    <IoIosInformationCircle data-tooltip-id="info-tooltip" style={{ fontSize: 20, cursor: 'pointer', color : "#FFFFFF" }}  />
                    <Tooltip id="info-tooltip" place="bottom" delayHide={200} style={{backgroundColor : '#636363'}} clickable>
                        <p style={{fontSize : 12}}>You need to own Visionaries NFTs to <br></br>lock in this reward vault.</p>
                        <p>
                            <a
                            style={{fontSize : 12, color: "yellow", textDecoration: "underline" }}
                            href="https://element.market/collections/t3playvisionaries"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Purchase Visionaries here
                          </a>
                        </p>
                    </Tooltip>
                </div>
                <hr style={{
                    width: "100%",
                    border: "1px solid #333"
                }}/>
                <div style={{ 
                    margin: "20px 0",
                    width: "100%"
                }}>
                    <h2 style={{ fontSize: 22 }}>Owned NFTs</h2>
                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", width: "500px"}}>
                        {ownedNFTs && ownedNFTs.length > 0 ? (
                            ownedNFTs.map((nft, index) => (
                                <NFTCard
                                    key={nft.id || index}
                                    nft={nft}
                                    refetch={getOwnedNFTs}
                                    refecthStakedInfo={refetchStakedInfo}
                                />
                            ))
                        ) : (
                            <p>You own 0 NFTs</p>
                        )}
                    </div>
                </div>
                <hr style={{
                    width: "100%",
                    border: "1px solid #333"
                }}/>
                <div style={{ width: "100%", margin: "20px 0" }}>
                    <h2 style={{ fontSize : 22}}>Staked NFTs</h2>
                    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", width: "500px"}}>
                        {stakedInfo && stakedInfo[0].length > 0 ? (
                            stakedInfo[0].map((nft: any, index: number) => (
                                <StakedNFTCard
                                    key={index}
                                    tokenId={nft}
                                    refetchStakedInfo={refetchStakedInfo}
                                    refetchOwnedNFTs={getOwnedNFTs}
                                />
                            ))
                        ) : (
                            <p style={{ margin: "20px" }}>No NFTs staked</p>
                        )}
                    </div>
                </div>
                <hr style={{
                    width: "100%",
                    border: "1px solid #333"
                }}/>
                <StakeRewards />  
            </div>
        );
    } else {
       return ( <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#151515",
                borderRadius: "8px",
                width: "auto",
                maxWidth: "400px",
                paddingTop: "20px",
                color : 'white'
       }}>
           
           <div style={{
               display: "flex",
               flexDirection: "column",
               alignItems: "center",
               backgroundColor: "#151515",
               borderRadius: "8px",
               width: "auto",
               maxWidth: "400px",
               paddingLeft: "10px",
               paddingRight: "10px",
               color : 'white'
           }}>
               <p style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Welcome to the T3 Play Visionaries Staking Vault ✨</p>
               <br/>
               <p style={{ textAlign: 'center', fontSize: 16 }}>Stake your NFTs and unlock exclusive rewards. 🚀</p>
               <br/>
            <p style={{ textAlign: 'center', fontSize: 16 }}>Please connect your wallet to start staking.</p>
           </div>
           
           <div style={{
               marginBottom : "20px",
               marginTop : "20px",
           }}>
                <ConnectButton
                  client={client}
                  chain={sepolia}
               />
           </div>
        </div>)
    }
};