import { Contract, formatEther } from 'ethers';
import { Provider } from 'ethers';
import { ERC20_ABI } from '../../utils/contracts';

export const getErc20TOkenBalance = async (
  contractAddress: string,
  address: string,
  provider: Provider,
) => {
  try {
    const balance = new Contract(contractAddress, ERC20_ABI, provider);
    const tokenBalance = await balance.balanceOf(address);
    const formattedBalance = formatEther(tokenBalance);
    return formattedBalance;
  } catch (error) {
    console.log(error);
  }
};
