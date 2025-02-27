import {
  TransactionButton,
  useActiveAccount,
  useReadContract,
  useWalletBalance,
} from 'thirdweb/react';
import { ERC20_STAKING_CONTRACT } from '../../utils/contracts';
import { useEffect, useState } from 'react';
import { formatEther, parseEther } from 'ethers';
import { format } from 'path';
import { prepareContractCall } from 'thirdweb';

function Erc20StakingSection() {
  const account = useActiveAccount();
  const { data, isLoading, isError } = useReadContract({
    contract: ERC20_STAKING_CONTRACT,
    method: 'stakes',
    params: [account?.address || '0x'],
  });
  const { data: isUserClaim } = useReadContract({
    contract: ERC20_STAKING_CONTRACT,
    method: 'canClaimMonthlyReward',
    params: [account?.address || '0x'],
  });

  const [stakBalance, setStakBalance] = useState<string>('0');
  const [unstakTime, setUnStackTime] = useState<number>(0);
  const [isUnstake, setIsUnstake] = useState<boolean>(false);

  useEffect(() => {
    console.log({
      data,
      isLoading,
      isError,
      isUserClaim,
    });
    if (data) {
      const etherValue = formatEther(`${data?.[0] || 0}` || '0');
      const time = parseInt(`${data?.[2]}` || '0');
      const currentTime = Date.now() / 1000;
      console.log({ etherValue, time });
      setStakBalance(etherValue);
      setUnStackTime(time);
      if (currentTime > time) {
        setIsUnstake(true);
      }
    }
  }, [data, isLoading, isError]);

  return (
    <div style={{ width: '100%', margin: '20px 0' }}>
      <h2 style={{ fontSize: 20, marginBottom: 10 }}>Staked NFTs</h2>

      <div
        style={{
          width: '100%',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <p>Staking Token Balance : </p>
          <p>{parseFloat(stakBalance)?.toFixed(2)}</p>
        </div>

        <TransactionButton
          transaction={() =>
            prepareContractCall({
              contract: ERC20_STAKING_CONTRACT,
              method: 'claimMonthlyReward',
              params: [],
            })
          }
          onTransactionSent={(result) => {
            console.log('Transaction submitted', result.transactionHash);
          }}
          onTransactionConfirmed={(receipt) => {
            console.log('Transaction confirmed', receipt.transactionHash);
          }}
          onError={(error) => {
            console.error('Transaction error', error);
          }}
          style={{
            width: '100%',
            height: 40,
            cursor: 'pointer',
            backgroundColor: '#FFFFFF',
            color: 'black',
            border: 'none',
            padding: 20,
            opacity: isUserClaim ? 1 : 0.5,
          }}
          disabled={!isUserClaim}
        >
          Claim Rewards
        </TransactionButton>

        {parseFloat(stakBalance) > 0 && isUnstake && (
          <TransactionButton
            transaction={() =>
              prepareContractCall({
                contract: ERC20_STAKING_CONTRACT,
                method: 'UnstackAndRewardClaim',
                params: [],
              })
            }
            onTransactionSent={(result) => {
              console.log('Transaction submitted', result.transactionHash);
            }}
            onTransactionConfirmed={(receipt) => {
              console.log('Transaction confirmed', receipt.transactionHash);
            }}
            onError={(error) => {
              console.error('Transaction error', error);
            }}
            style={{
              width: '100%',
              height: 40,
              cursor: 'pointer',
              backgroundColor: '#FFFFFF',
              color: 'black',
              border: 'none',
              padding: 20,
              marginTop: 20,
            }}
          >
            unstake
          </TransactionButton>
        )}
      </div>
    </div>
  );
}

export default Erc20StakingSection;
