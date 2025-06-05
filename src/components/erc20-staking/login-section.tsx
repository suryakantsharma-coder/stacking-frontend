import { client } from '@/app/client';
import { sepolia } from 'thirdweb/chains';
import { ConnectButton } from 'thirdweb/react';

function LoginSection({ message }: { message: string }) {
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
        paddingTop: '20px',
        color: 'white',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#151515',
          borderRadius: '8px',
          width: 'auto',
          maxWidth: '400px',
          paddingLeft: '10px',
          paddingRight: '10px',
          color: 'white',
        }}
      >
        <p style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>
          Welcome to the T3 Play Visionaries Staking Vault ✨
        </p>
        <br />
        <p style={{ textAlign: 'center', fontSize: 16 }}>{message}</p>
        <br />
        <p style={{ textAlign: 'center', fontSize: 16 }}>
          Please connect your wallet to start staking.
        </p>
      </div>

      <div
        style={{
          marginBottom: '20px',
          marginTop: '20px',
        }}
      >
        <ConnectButton client={client} chain={sepolia} />
      </div>
    </div>
  );
}

export default LoginSection;
