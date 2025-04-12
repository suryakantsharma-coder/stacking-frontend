import { TransactionButton, useActiveAccount, useReadContract } from 'thirdweb/react';
import { REWARD_TOKEN_CONTRACT, STAKING_CONTRACT } from '../utils/contracts';
import { toEther } from 'thirdweb';
import { useEffect } from 'react';
import { balanceOf } from 'thirdweb/extensions/erc721';

export const StakeRewards = ({
  ownedNFTs,
  stakedNFTs,
}: {
  ownedNFTs: Array<any>;
  stakedNFTs: any;
}) => {
  const account = useActiveAccount();

  const {
    data: tokenBalance,
    isLoading: isTokenBalanceLoading,
    refetch: refetchTokenBalance,
  } = useReadContract(balanceOf, {
    contract: REWARD_TOKEN_CONTRACT,
    owner: account?.address || '0x',
  });

  const { data: stakedInfo, refetch: refetchStakedInfo } = useReadContract({
    contract: STAKING_CONTRACT,
    method: 'getStakeInfo',
    params: [account?.address || '0x'],
  });

  useEffect(() => {
    refetchStakedInfo();
    const interval = setInterval(() => {
      refetchStakedInfo();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  let tokenSymbol = 'VXP';

  const getReadableValue = (num: number) => (num > 0 ? num : 0);

  return (
    <div style={{ width: '100%', margin: '20px 0', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          margin: '20px 0',
        }}
      >
        <p>Staked NFTs: </p>
        {/* @ts-ignore */}
        <p>{parseInt(stakedNFTs?.length || 0)}</p>
      </div>

      {!isTokenBalanceLoading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            margin: '20px 0',
          }}
        >
          <p>Wallet Balance: </p>
          <p>
            {getReadableValue(
              parseFloat(toEther(BigInt(tokenBalance?.toString() || '0'))) || parseFloat('0'),
            )}{' '}
            {tokenSymbol}
          </p>
        </div>
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          margin: '20px 0',
        }}
      >
        <h2 style={{ marginBottom: '20px', fontSize: 18 }}>VXP Rewards:</h2>
        <h2 style={{ marginBottom: '20px', fontSize: 18 }}>
          {(stakedInfo && parseFloat(toEther(BigInt(stakedInfo[1]?.toString())))?.toFixed(2)) || 0}{' '}
          {tokenSymbol}
        </h2>
      </div>
      {/* <TransactionButton
                transaction={() => (
                    alert("Claim Rewards Disabled.")
                    // prepareContractCall({
                    //     contract:STAKING_CONTRACT,
                    //     method: "claimRewards",
                    // })
                )}
                onTransactionConfirmed={() => {
                    alert("Rewards claimed!")
                    refetchStakedInfo();
                    refetchTokenBalance();
                }}
                style={{
                    border: "none",
                    backgroundColor: "#333",
                    color: "#fff",
                    padding: "10px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    width: "100%",
                    fontSize: "12px"
                }}
            >Claim Rewards</TransactionButton> */}

      <button
        style={{
          border: 'none',
          backgroundColor: '#333',
          color: '#fff',
          padding: '10px',
          borderRadius: '10px',
          cursor: 'pointer',
          width: '100%',
          fontSize: '12px',
          opacity: 0.5,
        }}
        disabled={true}
        onClick={() => {
          alert('Claim Rewards Disabled.');
        }}
      >
        Claim Rewards
      </button>
    </div>
  );
};
