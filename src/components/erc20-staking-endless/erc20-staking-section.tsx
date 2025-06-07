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
import { formatEther, formatUnits, isCallException } from 'ethers';
import { prepareContractCall } from 'thirdweb';
import Countdown from 'react-countdown';
import { toast } from 'react-toastify';
import WithdrawalTimer from '../erc20-staking/claimNewTimer';
import { sepolia } from 'thirdweb/chains';
import { client } from '@/app/client';
import { parse } from 'path';
import ClaimTimer from './claimTimer';

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
  const [isUserClaimed, setUserClaimed] = useState<boolean>(false);
  const [rewardpoints, setRewardPoints] = useState<any>('0');
  const [unstackDisabled, setUnstackDisabled] = useState<boolean>(false);
  const [tempTimeStamp, setTempTimeStamp] = useState<number>(0);
  const [isClaimable, setIsClaimable] = useState({
    claimable: false,
    time: 0,
  });

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

  useEffect(() => {
    const getClaimTime = parseInt(localStorage.getItem('claimTime') || '0') || 0;
    if (getClaimTime > 0) {
      const getCurrentTime = new Date().getTime();
      if (getCurrentTime < getClaimTime) {
        setIsClaimable({
          claimable: true,
          time: getClaimTime,
        });
      }
    }
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
        {isUserClaim && (
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
              {parseFloat(formatEther(`${isUserClaim?.[1]}` || 0))?.toFixed(4) || 0} 🚀
            </p>
          </div>
        )}

        {parseFloat(stakBalance) > 0 && isClaimable?.claimable && (
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
                <ClaimTimer
                  finalTimestamp={parseInt(`${isClaimable?.time}`) || 0}
                  // finalTimestamp={1743769242 * 1000}
                  updateFn={() => {
                    console.log('refresh the data claim btn');
                    // setUpdateState((state) => (state = !state));
                    setIsClaimable({
                      claimable: false,
                      time: 0,
                    });
                    setTimeout(() => {
                      updateUnstakeButton();
                    }, 2000);
                    refreshClaimBtn();
                  }}
                />
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

                // wait for the transaction to be claimed

                const getClaimTime = new Date().getTime();
                const intervalTime = 1 * 60 * 60 * 1000;
                const totalTime = getClaimTime + intervalTime;
                window.localStorage.setItem('claimTime', totalTime?.toString()); // Store the claim time
                setIsClaimable({
                  claimable: true,
                  time: totalTime,
                });

                refreshUserDetails();
                setUserClaimed(true);
              }}
              onError={(error) => {
                toast.error(error.message || 'Reward Failed to Claimed');
                console.error('Transaction error', error);

                // calcualte the next claim time
                // const getClaimTime = new Date().getTime();
                // const intervalTime = 60 * 1000;
                // const totalTime = getClaimTime + intervalTime;
                // window.localStorage.setItem('claimTime', totalTime?.toString()); // Store the claim time
                // setIsClaimable({
                //   claimable: true,
                //   time: totalTime,
                // });
              }}
              style={{
                width: '100%',
                height: 40,
                cursor: 'pointer',
                backgroundColor: '#FFFFFF',
                color: 'black',
                border: 'none',
                padding: 20,
                opacity: !isClaimable?.claimable ? 1 : 0.5,
              }}
              disabled={isClaimable?.claimable}
            >
              Claim Rewards
            </TransactionButton>
          </>
        )}

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

        {parseFloat(stakBalance) > 0 && (
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
        )}
      </div>
    </div>
  );
}

export default Erc20StakingSection;
