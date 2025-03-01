import Erc20StakingVault from '@/screens/stacking-erc20';
import { ToastContainer } from 'react-toastify';

function Page() {
  return (
    <>
      <ToastContainer />
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'black',
          overflowX: 'hidden',
          overflowY: 'scroll',
        }}
      >
        <h1
          style={{
            marginTop: 20,
            marginBottom: 20,
            color: 'white',
          }}
        >
          Token Staking Vault{' '}
        </h1>
        <Erc20StakingVault />
      </div>
    </>
  );
}

export default Page;
