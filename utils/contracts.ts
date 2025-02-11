import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { getContract } from "thirdweb";
import { stakingABI } from "./stakingABI";

const nftContractAddress = "0x49A70E4DBF445901e7368B149fB050BE55a62446";
const rewardTokenContractAddress = "0xdA7fdA7f9840b5aFfcA880d1acF9e443ba0dE1AE";
const stakingContractAddress = "0x4CBE972aaCf5fD2A131211BFed9e518932991048";

export const NFT_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: nftContractAddress
});

export const REWARD_TOKEN_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: rewardTokenContractAddress
});

export const STAKING_CONTRACT = getContract({
    client: client,
    chain: chain,
    address: stakingContractAddress,
    abi: stakingABI
});