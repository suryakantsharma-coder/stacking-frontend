import Erc20StakingVaultEndless from '@/screens/stacking-erc20-endless';
import { ToastContainer } from 'react-toastify';

function Page() {
  return (
    <>
      {/* <p
        style={{
          width: '100%',
          textAlign: 'center',
          marginTop: '10px',
        }}
      >
        Coming Soon
      </p> */}
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
          $T3P Staking Vault{' '}
        </h1>
        <Erc20StakingVaultEndless />
      </div>
    </>
  );
}

export default Page;
