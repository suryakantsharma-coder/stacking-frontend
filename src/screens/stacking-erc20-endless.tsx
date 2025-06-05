'use client';
import useErc20StakingVault from '@/hooks/useErc20StakingVault';
import LoginSection from '@/components/erc20-staking/login-section';
import Erc20StackingSectionEndless from '@/components/erc20-staking-endless/erc20-stacking-section-endless';

function Erc20StakingVaultEndless() {
  const { address } = useErc20StakingVault();
  if (address) return <Erc20StackingSectionEndless />;
  else return <LoginSection message="Stake your Erc20 tokens and unlock exclusive rewards. 🚀" />;
}

export default Erc20StakingVaultEndless;
