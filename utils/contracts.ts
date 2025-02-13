import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { getContract } from "thirdweb";
import { stakingABI } from "./stakingABI";

// sepoloia
const sepolia_nftContractAddress = "0x49A70E4DBF445901e7368B149fB050BE55a62446";
const sepolia_rewardTokenContractAddress = "0xdA7fdA7f9840b5aFfcA880d1acF9e443ba0dE1AE";
const sepolia_stakingContractAddress = "0x4CBE972aaCf5fD2A131211BFed9e518932991048";

// linea
const nftContractAddress = "0xea2be906ee93590bfa8f3c1245130cb786f8282b";
const rewardTokenContractAddress = "0x876816f39FACba62EeF512cCA401f3034aA3bD37";
const stakingContractAddress = "0x44BE8b07CcEe468A0D4a8f20F2c054D1A09Dd674";

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