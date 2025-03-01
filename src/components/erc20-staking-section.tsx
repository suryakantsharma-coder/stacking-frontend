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
import CountdownTimer from './time-counter';
import Countdown from 'react-countdown';
import { toast } from 'react-toastify';

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

  const { data: unStakWindow } = useReadContract({
    contract: ERC20_STAKING_CONTRACT,
    method: 'withdrawalWindow',
    params: [],
  });

  const [stakBalance, setStakBalance] = useState<string>('0');
  const [unstakeWindow, setUnStakeWindow] = useState<number>(0);
  const [isUnstake, setIsUnstake] = useState<boolean>(false);
  const [isUnstakable, setIsUnstakable] = useState<boolean>(false);

  useEffect(() => {
    console.log({
      data,
      isLoading,
      isError,
      isUserClaim,
    });
    if (data && unStakWindow) {
      const etherValue = formatEther(`${data?.[0] || 0}` || '0');
      const time = parseInt(`${data?.[2]}` || '0');
      const unstakWindow = parseInt(`${unStakWindow}` || '0');
      const currentTime = Date.now() / 1000;
      const isUnstakReady = currentTime < unstakWindow ? true : false;
      console.log({ etherValue, time, unstakWindow });
      setStakBalance(etherValue);
      setUnStakeWindow(unstakWindow);
      setIsUnstakable(isUnstakReady);
      if (currentTime > time) {
        setIsUnstake(true);
      }
    }
  }, [data, unStakWindow]);

  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
  }) => {
    if (completed) {
      // Render a completed state
      // return (
      //   <TransactionButton
      //     transaction={() =>
      //       prepareContractCall({
      //         contract: ERC20_STAKING_CONTRACT,
      //         method: 'UnstackAndRewardClaim',
      //         params: [],
      //       })
      //     }
      //     onTransactionSent={(result) => {
      //       console.log('Transaction submitted', result.transactionHash);
      //     }}
      //     onTransactionConfirmed={(receipt) => {
      //       console.log('Transaction confirmed', receipt.transactionHash);
      //     }}
      //     onError={(error) => {
      //       console.error('Transaction error', error);
      //     }}
      //     style={{
      //       width: '100%',
      //       height: 40,
      //       cursor: 'pointer',
      //       backgroundColor: '#FFFFFF',
      //       color: 'black',
      //       border: 'none',
      //       padding: 20,
      //       marginTop: 20,
      //     }}
      //   >
      //     unstake
      //   </TransactionButton>
      // );

      return null;
    } else {
      // Render a countdown
      return (
        <span>
          {days}D : {hours}h :{minutes}m : {seconds}s
        </span>
      );
    }
  };

  return (
    <div style={{ width: '100%', margin: '20px 0' }}>
      {/* <h2 style={{ fontSize: 20, marginBottom: 10 }}>Wallet's total tokens (Staked)</h2> */}
      <h2 style={{ fontSize: 20, marginBottom: 10 }}>Your wallet’s tokens (Staked)</h2>

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
          }}
        >
          <p>Staked Token Balance : </p>
          <p>{parseFloat(stakBalance)?.toFixed(2)}</p>
        </div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
            marginBottom: 20,
          }}
        >
          <p>Monthly Reward (APR) : </p>
          <p
            style={{
              color: '#32CD32',
              fontWeight: 'bold',
            }}
          >
            11% 🚀
          </p>
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
            toast.success('Reward Claimed');
            console.log('Transaction confirmed', receipt.transactionHash);
          }}
          onError={(error) => {
            toast.error(error.message || 'Reward Failed to Claimed');
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

        {unstakeWindow > 0 && (
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}
          >
            {' '}
            {/* <Countdown date={unstakeWindow * 1000} renderer={renderer} />{' '} */}
            <Countdown date={unstakeWindow * 1000} renderer={renderer} />{' '}
          </div>
        )}

        {parseFloat(stakBalance) > 0 && (
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
              toast.success('Tokens Unstaked');
              console.log('Transaction confirmed', receipt.transactionHash);
            }}
            onError={(error) => {
              toast.error(error.message || 'Transaction Failed');
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
              opacity: isUnstakable ? 1 : 0.5,
            }}
            disabled={!isUnstakable}
          >
            unstake
          </TransactionButton>
        )}
      </div>
    </div>
  );
}

export default Erc20StakingSection;
