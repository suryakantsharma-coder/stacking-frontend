import { useActiveAccount, useReadContract } from 'thirdweb/react';
import { ERC20_STAKING_CONTRACT } from '../../utils/contracts';
import { useEffect, useState } from 'react';
import { formatEther } from 'ethers';

function Erc20PricePool() {
  const account = useActiveAccount();

  const {
    data: totalStaked,
    isLoading,
    isError,
  } = useReadContract({
    contract: ERC20_STAKING_CONTRACT,
    method: 'totalStakedTokens',
    params: [],
  });
  const { data: staklimit } = useReadContract({
    contract: ERC20_STAKING_CONTRACT,
    method: 'stakeLimit',
    params: [],
  });

  const [totalStakedTokens, setTotalStakedTokens] = useState<string>();
  const [stakeLimit, setStakeLimit] = useState<string>();

  useEffect(() => {
    if (totalStaked && staklimit) {
      const etherLimit = formatEther(staklimit.toString() || `0`);
      const ether = formatEther(totalStaked.toString() || `0`);
      console.log({ totalStaked, ether, etherLimit });
      setTotalStakedTokens(ether);
      setStakeLimit(etherLimit);
    }
  }, [totalStaked, staklimit]);

  return (
    <div
      style={{
        margin: '20px 0',
        width: '100%',
        overflowX: 'hidden',
      }}
    >
      <h2 style={{ fontSize: 20, marginBottom: 10 }}>Price Pool</h2>

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
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
          }}
        >
          <p style={{ fontSize: 26, fontWeight: 'bold' }}>1,00,000</p>
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
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 10,
            }}
          >
            <p>Tokens Staked: </p>
            <p>
              {parseInt(`${totalStakedTokens}`)} / {parseInt(`${stakeLimit}`)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Erc20PricePool;
