import { ConnectButton } from 'thirdweb/react';
import { sepolia } from 'thirdweb/chains';
import { client } from '@/app/client';
import InfoSection from '../erc20-staking/Info-section';

import Erc20StakingSection from '../erc20-staking-endless/erc20-staking-section';
import { useState } from 'react';
import Erc20UnStakSectionEndless from './erc20-unstack-section';

function Erc20StackingSectionEndless() {
  const [isStakeing, setIsStakeing] = useState<boolean>(true);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#151515',
        borderRadius: '8px',
        width: 'auto',
        maxWidth: '400px',
        padding: '20px',
        color: 'white',
      }}
    >
      <ConnectButton client={client} chain={sepolia} />
      <InfoSection
        heading="Purchase $T3P Here"
        html={() => {
          return (
            <p style={{ fontSize: 12 }}>
              You need to own $T3P tokens to <br></br>lock in this reward vault.
            </p>
          );
        }}
      />
      <hr
        style={{
          width: '100%',
          border: '1px solid #333',
        }}
      />

      <hr
        style={{
          width: '100%',
          border: '1px solid #333',
        }}
      />

      <Erc20UnStakSectionEndless />

      <hr
        style={{
          width: '100%',
          border: '1px solid #333',
        }}
      />

      <Erc20StakingSection setIsStakeing={setIsStakeing} />
      <hr
        style={{
          width: '100%',
          border: '1px solid #333',
        }}
      />
    </div>
  );
}

export default Erc20StackingSectionEndless;
