import { ConnectButton } from 'thirdweb/react';
import { IoIosInformationCircle } from 'react-icons/io';
import { Tooltip } from 'react-tooltip';
import { linea, sepolia } from 'thirdweb/chains';
import { client } from '@/app/client';
import InfoSection from './Info-section';
import Erc20UnStakSection from './erc20-unstack-section';
import Erc20StakingSection from './erc20-staking-section';
import Erc20PricePool from './erc20-price-pool';

function Erc20StackingSection() {
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
        heading="T3 Play Visionaries Staking Vault"
        html={() => {
          return (
            <p style={{ fontSize: 12 }}>
              You need to own Visionaries NFTs to <br></br>lock in this reward vault.
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

      <Erc20PricePool />

      <hr
        style={{
          width: '100%',
          border: '1px solid #333',
        }}
      />

      <Erc20UnStakSection />

      <hr
        style={{
          width: '100%',
          border: '1px solid #333',
        }}
      />

      <Erc20StakingSection />
      <hr
        style={{
          width: '100%',
          border: '1px solid #333',
        }}
      />
    </div>
  );
}

export default Erc20StackingSection;
