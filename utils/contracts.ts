import { chain } from '@/app/chain';
import { client } from '@/app/client';
import { getContract } from 'thirdweb';
import { stakingABI } from './stakingABI';
import { sepolia } from 'thirdweb/chains';
import { erc20Abi } from './erc20-abi';
import { erc20StakingAbi } from './staking-abi';

// sepoloia
const sepolia_nftContractAddress = '0x49A70E4DBF445901e7368B149fB050BE55a62446';
const sepolia_rewardTokenContractAddress = '0xdA7fdA7f9840b5aFfcA880d1acF9e443ba0dE1AE';
const sepolia_stakingContractAddress = '0x4CBE972aaCf5fD2A131211BFed9e518932991048';

// linea
const nftContractAddress = '0xea2be906ee93590bfa8f3c1245130cb786f8282b';
const rewardTokenContractAddress = '0x876816f39FACba62EeF512cCA401f3034aA3bD37';
const stakingContractAddress = '0x44BE8b07CcEe468A0D4a8f20F2c054D1A09Dd674';

export const NFT_CONTRACT = getContract({
  client: client,
  chain: chain,
  address: nftContractAddress,
});

export const REWARD_TOKEN_CONTRACT = getContract({
  client: client,
  chain: chain,
  address: rewardTokenContractAddress,
});

export const STAKING_CONTRACT = getContract({
  client: client,
  chain: chain,
  address: stakingContractAddress,
  abi: stakingABI,
});

// testnet sepolia
export const TESTING_SEPOLIA_ERC20_CONTRACT = '0xE4Ca052D55bD713F08BB6b99c2e00835302C70eC';
// export const TESTING_SEPOLIA_ERC20_STAKING_CONTRACT = '0x0075C2c0F9d34cBeF47F9D1a4F0190D96596c3AA';
// export const TESTING_SEPOLIA_ERC20_STAKING_CONTRACT = '0x130E33fdA2308F3166ca4c9546B790bB35923B29';
// export const TESTING_SEPOLIA_ERC20_STAKING_CONTRACT = '0x69F6FCA437157c1E19Bb16D1691c4DC8057c9cE0';
// export const TESTING_SEPOLIA_ERC20_STAKING_CONTRACT = '0x8193a0D7a4f2051701940f1bD7b4750E7F811e96';
// export const TESTING_SEPOLIA_ERC20_STAKING_CONTRACT = '0x418CEF8eAa4c4B3773bF881349d49cA610f0766c';
// export const TESTING_SEPOLIA_ERC20_STAKING_CONTRACT = '0xACff47Ae61c810b3b726BD8f297a47068Efb6771';
// export const TESTING_SEPOLIA_ERC20_STAKING_CONTRACT = '0x15B35207eDB34a4050572EF0eee021f7754b4E19';
// export const TESTING_SEPOLIA_ERC20_STAKING_CONTRACT = '0xCaF4dD6f705aCDD4ceB9a63DAe364C7Adf097D82';
// export const TESTING_SEPOLIA_ERC20_STAKING_CONTRACT = '0x70360cbCaefd895399099C1B64A3A320C19e2347';

// export const TESTING_SEPOLIA_ERC20_STAKING_CONTRACT = '0xFcC309cE6e7d0E2Af563278Ae290f16Bc1C46DB4';
export const TESTING_SEPOLIA_ERC20_STAKING_CONTRACT = '0xCe5DBcd62E11b44113A130024842902e8467AD4d';

export const ERC20_CONTRACT = getContract({
  client: client,
  chain: sepolia,
  address: TESTING_SEPOLIA_ERC20_CONTRACT,
  abi: erc20Abi,
});

export const ERC20_STAKING_CONTRACT = getContract({
  client: client,
  chain: sepolia,
  address: TESTING_SEPOLIA_ERC20_STAKING_CONTRACT,
  abi: erc20StakingAbi,
});
