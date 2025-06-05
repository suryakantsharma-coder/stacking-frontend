'use client';
import {
  TransactionButton,
  useActiveAccount,
  useReadContract,
  useWalletBalance,
} from 'thirdweb/react';
import {
  ERC20_STAKING_CONTRACT,
  TESTING_SEPOLIA_ERC20_CONTRACT,
  ERC20_ENDLESS_STAKING_CONTRACT,
} from '../../../utils/contracts';
import { useEffect, useState } from 'react';
import { formatEther, formatUnits } from 'ethers';
import { prepareContractCall } from 'thirdweb';
import Countdown from 'react-countdown';
import { toast } from 'react-toastify';
import WithdrawalTimer from '../erc20-staking/claimNewTimer';
import { sepolia } from 'thirdweb/chains';
import { client } from '@/app/client';

function Erc20StakingSection({ setIsStakeing }: { setIsStakeing: any }) {
  const account = useActiveAccount();

  const { data: isUserClaim, refetch: refreshClaimBtn } = useReadContract({
    contract: ERC20_ENDLESS_STAKING_CONTRACT,
    method: 'getClaimableReward',
    params: [account?.address || '0x'],
  });

  const {
    data: userDetails,
    isLoading,
    isError,
    refetch: refreshUserDetails,
  } = useReadContract({
    contract: ERC20_ENDLESS_STAKING_CONTRACT,
    method: 'stakes',
    params: [account?.address || '0x'],
  });

  // const { data: unStakWindow } = useReadContract({
  //   contract: ERC20_ENDLESS_STAKING_CONTRACT,
  //   method: 'withdrawalWindow',
  //   params: [],
  // });

  const {
    data: walletTokenBalance,
    isLoading: isBalanceChecking,
    isError: BalanceError,
  } = useWalletBalance({
    chain: sepolia,
    address: account?.address,
    client: client,
    tokenAddress: TESTING_SEPOLIA_ERC20_CONTRACT,
  });

  const [stakBalance, setStakBalance] = useState<string>('0');
  const [unstakeWindow, setUnStakeWindow] = useState<number>(0);
  const [isUnstake, setIsUnstake] = useState<boolean>(false);
  const [isUnstakable, setIsUnstakable] = useState<boolean>(false);
  const [claimTime, setClaimTime] = useState<number>(0);
  const [isUserClaimed, setUserClaimed] = useState<boolean>(false);
  const [rewardpoints, setRewardPoints] = useState<any>('0');
  const [unstackDisabled, setUnstackDisabled] = useState<boolean>(false);
  const [updatedState, setUpdateState] = useState<boolean>(false);
  const [tempTimeStamp, setTempTimeStamp] = useState<number>(0);

  // store claims

  const storeUserClaims = (claim: number) => {
    localStorage.setItem('userClaims', ' ' + claim);
  };

  const getUserClaims = () => {
    const claims = localStorage.getItem('userClaims');
    return claims ? parseInt(claims) : 0;
  };

  useEffect(() => {
    if (userDetails) {
      const etherValue = formatEther(`${userDetails?.[0]}` || '0');
      const time = parseInt(`${userDetails?.[2]}` || '0');
      const currentTime = Date.now() / 1000;
      const stackTime = parseInt(`${userDetails?.[2]}` || '0');
      setStakBalance(etherValue);

      if (currentTime > time) {
        setIsUnstake(true);
      }
    }
  }, [userDetails]);

  useEffect(() => {
    if (userDetails) {
      console.log({ userDetails });
      const time = parseInt(`${userDetails?.[2]}` || '0');
      const lastClaim = parseInt(`${userDetails?.[4]}` || '0');
      const currentTime = Date.now() / 1000;
      if (lastClaim) {
        setClaimTime(lastClaim + 60);
      }
    }
  }, [userDetails]);

  useEffect(() => {
    const time = localStorage.getItem('userRewardUpcomingTime') || null;
    if (time) {
      console.log({ time });
      // setClaimTime(parseInt(time));
    } else {
      const lastTimeStack = localStorage.getItem('userRewardClaimTime') || 0;
      console.log({ lastTimeStack });
      if (lastTimeStack) {
        const upcomingClaim = parseInt(`${lastTimeStack}`) + 60;
        console.log({ upcomingClaim });
        localStorage.setItem('userRewardUpcomingTime', `${upcomingClaim}`);
        // setClaimTime(parseInt(`${upcomingClaim}`));
      } else {
        // setClaimTime(0);
      }
    }
  }, [isUserClaimed, stakBalance]);

  useEffect(() => {
    console.log({ isUserClaim });
  }, [isUserClaim]);

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
      setTimeout(() => {
        setUnstackDisabled(true);
      }, 1000);
      // if (isClaim) {
      //   setUserClaimed(false);
      // } else {
      //   setIsUnstakable(false);
      // }
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
        <span
          style={{
            width: '100%',
            textAlign: 'center',
          }}
        >
          {days}D : {hours}h :{minutes}m : {seconds}s
        </span>
      );
    }
  };

  useEffect(() => {
    if (unstakeWindow) {
      const currentTime = new Date().getTime() / 1000;
      if (currentTime > unstakeWindow) {
        setUnstackDisabled(true);
        setIsStakeing(false);
      }
    }
  }, [unstakeWindow]);

  const updateUnstakeButton = () => {
    if (userDetails) {
      const currentTime = parseInt(`${new Date().getTime() / 1000}`);
      const unstakeTime = parseInt(`${userDetails?.[2]}`) || currentTime + 1 * 60 * 60;
      console.log({ unstakeTime, currentTime });
      setTempTimeStamp(currentTime + 1 * 60 * 60);
      if (currentTime > unstakeTime) {
        setUnstackDisabled(false);
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      updateUnstakeButton();
    }, 2000);
  }, [userDetails]);

  return (
    <div style={{ width: '100%', margin: '20px 0' }}>
      <h2 style={{ fontSize: 20, marginBottom: 10 }}>Your Staking Info</h2>

      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 10,
          // paddingBottom: 10,
        }}
      >
        <p>Wallet Balance: </p>
        <p>
          {isLoading
            ? 'loading...'
            : parseFloat(
                formatUnits(walletTokenBalance?.value || 0, walletTokenBalance?.decimals),
              )?.toFixed(2) + ' '}
          $T3P
        </p>
      </div>

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
            // paddingTop: 10,
            paddingBottom: 10,
            marginTop: 20,
          }}
        >
          <p>Staked Token Balance : </p>
          <p>{parseFloat(stakBalance)?.toFixed(2)} $T3P</p>
        </div>
        {/* <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <p>Monthly Reward (APR) : </p>
          <p
            style={{
              color: '#32CD32',
              fontWeight: 'bold',
            }}
          >
            11.1% 🚀
          </p>
        </div> */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 10,
            paddingBottom: 10,
            marginBottom: 20,
          }}
        >
          <p>$T3P Rewards to Claim : </p>
          <p
            style={{
              color: '#32CD32',
              fontWeight: 'bold',
            }}
          >
            {parseFloat(rewardpoints)?.toFixed(2) || 0} 🚀
          </p>
        </div>

        {parseInt(`${userDetails?.[2]}` || '0') > parseInt(`${new Date().getTime() / 1000}`) && (
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 40,
              marginBottom: 10,
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            {
              <>
                {unstackDisabled && (
                  <WithdrawalTimer
                    finalTimestamp={(parseInt(`${userDetails?.[2]}`) || 0) * 1000}
                    // finalTimestamp={1743769242 * 1000}
                    updateFn={() => {
                      console.log('refresh the data claim btn');
                      // setUpdateState((state) => (state = !state));
                      setTimeout(() => {
                        updateUnstakeButton();
                      }, 2000);
                      refreshClaimBtn();
                    }}
                  />
                )}
              </>
            }
          </div>
        )}

        {parseFloat(stakBalance) > 0 && (
          <>
            <TransactionButton
              transaction={() =>
                prepareContractCall({
                  contract: ERC20_ENDLESS_STAKING_CONTRACT,
                  method: 'claimReward',
                  params: [],
                })
              }
              onTransactionSent={(result) => {
                console.log('Transaction submitted', result.transactionHash);
              }}
              onTransactionConfirmed={(receipt) => {
                toast.success('Reward Claimed');
                console.log('Transaction confirmed', receipt.transactionHash);
                refreshUserDetails();
                setUserClaimed(true);
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
                opacity: isUserClaim?.[0] ? 1 : 0.5,
              }}
              disabled={!isUserClaim?.[0]}
            >
              Claim Rewards
            </TransactionButton>
          </>
        )}

        {unstakeWindow > new Date().getTime() / 1000 && !unstackDisabled && (
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 30,
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            {' '}
            <Countdown date={claimTime * 1000} renderer={renderer} />{' '}
          </div>
        )}

        {unstakeWindow > new Date().getTime() / 1000 && unstackDisabled && (
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 30,
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            {' '}
            <Countdown date={parseInt(`${userDetails?.[2]}`) * 1000} renderer={renderer} />{' '}
          </div>
        )}

        {/* temperaroy timer */}

        {!userDetails && (
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 30,
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            {' '}
            <Countdown
              date={parseInt(`${new Date().getTime() / 1000 + 1 * 60 * 60}`) * 1000}
              renderer={renderer}
            />{' '}
          </div>
        )}

        {parseFloat(stakBalance) > 0 ? (
          <TransactionButton
            transaction={() =>
              prepareContractCall({
                contract: ERC20_ENDLESS_STAKING_CONTRACT,
                method: 'unstake',
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
              marginTop: 10,
              opacity: !unstackDisabled ? 1 : 0.5,
            }}
            disabled={unstackDisabled}
          >
            Unstake
          </TransactionButton>
        ) : (
          <TransactionButton
            transaction={() =>
              prepareContractCall({
                contract: ERC20_ENDLESS_STAKING_CONTRACT,
                method: 'unstake',
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
              marginTop: 10,
              opacity: 0.5,
            }}
            disabled={true}
          >
            Unstake
          </TransactionButton>
        )}
      </div>
    </div>
  );
}

export default Erc20StakingSection;
