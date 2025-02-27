import { client } from '@/app/client';
import { sepolia } from 'thirdweb/chains';
import { TransactionButton, useActiveAccount, useWalletBalance } from 'thirdweb/react';
import {
  ERC20_CONTRACT,
  ERC20_STAKING_CONTRACT,
  TESTING_SEPOLIA_ERC20_CONTRACT,
  TESTING_SEPOLIA_ERC20_STAKING_CONTRACT,
} from '../../utils/contracts';
import React, { useEffect, useState } from 'react';
import { formatUnits, parseEther } from 'ethers';
import { prepareContractCall } from 'thirdweb';

function Erc20UnStakSection() {
  const { address } = useActiveAccount();
  const { data, isLoading, isError } = useWalletBalance({
    chain: sepolia,
    address: address,
    client: client,
    tokenAddress: TESTING_SEPOLIA_ERC20_CONTRACT,
  });

  const [value, setValue] = useState(0);
  const [isApporved, setIsApproved] = useState<boolean>(false);

  const handleInputValue = (e: any) => {
    const text = e.target.value;
    setValue(text);
  };

  useEffect(() => {
    console.log({ data });
  }, [data, isLoading, isError]);

  return (
    <div
      style={{
        margin: '20px 0',
        width: '100%',
        overflowX: 'hidden',
      }}
    >
      <h2 style={{ fontSize: 20, marginBottom: 10 }}>Unstaked Tokens</h2>

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
          }}
        >
          <p>Token Balance : </p>
          <p>
            {isLoading
              ? 'loading...'
              : parseFloat(formatUnits(data?.value || 0, data?.decimals))?.toFixed(2)}
          </p>
        </div>

        <div
          style={{
            width: '100%',
            height: '1px',
            border: '1px solid #333',
            borderTopWidth: 1,
            borderBottomWidth: 0,
            marginTop: 10,
            borderStyle: 'dotted',
          }}
        ></div>

        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
            marginTop: 5,
            marginBottom: 5,
          }}
        >
          <p>Amount :</p>
          <input
            style={{
              width: '200px',
              height: 30,
              paddingLeft: 5,
              paddingRight: 5,
            }}
            type="number"
            placeholder="0.01"
            value={value}
            onChange={handleInputValue}
          />
        </div>

        {!isApporved ? (
          <TransactionButton
            transaction={() =>
              prepareContractCall({
                contract: ERC20_CONTRACT,
                method: 'approve',
                params: [TESTING_SEPOLIA_ERC20_STAKING_CONTRACT, parseEther(`${value}`)],
              })
            }
            onTransactionSent={(result) => {
              console.log('Transaction submitted', result.transactionHash);
            }}
            onTransactionConfirmed={(receipt) => {
              setIsApproved(true);
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
            }}
          >
            Approve
          </TransactionButton>
        ) : (
          <TransactionButton
            transaction={() =>
              prepareContractCall({
                contract: ERC20_STAKING_CONTRACT,
                method: 'stake',
                params: [parseEther(value?.toString())],
              })
            }
            onTransactionSent={(result) => {
              console.log('Transaction submitted', result.transactionHash);
            }}
            onTransactionConfirmed={(receipt) => {
              setIsApproved(true);
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
            }}
          >
            Stake
          </TransactionButton>
        )}
      </div>
    </div>
  );
}

export default Erc20UnStakSection;
