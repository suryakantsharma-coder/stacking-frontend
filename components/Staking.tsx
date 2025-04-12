'use client';
import { client } from '@/app/client';
import { ConnectButton, useActiveAccount, useReadContract } from 'thirdweb/react';
import { StakeRewards } from './StakeRewards';
import { NFT_CONTRACT, STAKING_CONTRACT } from '../utils/contracts';
import { NFT } from 'thirdweb';
import { useEffect, useState } from 'react';
import { getNFTs, getOwnedNFTs, ownerOf, totalSupply } from 'thirdweb/extensions/erc721';
import { NFTCard } from './NFTCard';
import { StakedNFTCard } from './StakedNFTCard';
import { IoIosInformationCircle } from 'react-icons/io';
import { Tooltip } from 'react-tooltip';
import { linea } from 'thirdweb/chains';
import { getUserNfts, NftItem } from '../data/alchemy';
import { metadata } from '@/app/layout';

export const Staking = () => {
  const account = useActiveAccount();

  const [ownedNFTs, setOwnedNFTs] = useState<any>([]);

  // const getOwnedNFTs = async () => {
  //     let ownedNFTs: NFT[] = [];

  //     console.log({account, NFT_CONTRACT, STAKING_CONTRACT})

  //     const totalNFTSupply = await totalSupply({
  //         contract: NFT_CONTRACT,
  //     });
  //     const nfts = await getNFTs({
  //         contract: NFT_CONTRACT,
  //         start: 0,
  //         count: parseInt(totalNFTSupply.toString()),
  //     });
  //     console.log({nfts, ownedNFTs, totalNFTSupply})

  //     for (let nft of nfts) {
  //         console.log({id : nft.id})
  //         const owner = await ownerOf({
  //             contract: NFT_CONTRACT,
  //             tokenId: nft.id,
  //         }).catch((err) => console.log(err));

  //         if ((owner)?.toString()?.toLowerCase() === (account?.address)?.toString()?.toLowerCase()) {

  //             ownedNFTs.push(nft);
  //         }
  //     }
  //     setOwnedNFTs(ownedNFTs);
  // };

  const getOwnerNfts = async () => {
    console.log({ Text: 'THINGS WILL FIXED' });
    const { address } = account || { address: null };
    if (address) {
      const nfts = await getUserNfts(address);
      const getImporantData = nfts.map((item: NftItem) => {
        return {
          id: item.tokenId,
          metadata: {
            name: item.contract.name,
            secondImage: item.image.pngUrl || item.image.thumbnailUrl || item.image.originalUrl,
            image:
              item.raw.metadata.image ||
              item.image.originalUrl ||
              item.image.pngUrl ||
              item.image.thumbnailUrl ||
              item.image.originalUrl,
            tokenId: item.tokenId,
          },
        };
      });
      console.log({ getImporantData, nfts });
      setOwnedNFTs(getImporantData);
    }
  };

  useEffect(() => {
    if (account) {
      getOwnerNfts();
    }
  }, [account]);

  const { data: stakedInfo, refetch: refetchStakedInfo } = useReadContract({
    contract: STAKING_CONTRACT,
    method: 'getStakeInfo',
    params: [account?.address || '0x'],
  });

  if (account) {
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
        <ConnectButton client={client} chain={linea} />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '20px 0',
            width: '100%',
          }}
        >
          <p style={{ marginRight: '4px', fontSize: 20, fontWeight: 'bold', color: 'white' }}>
            T3 Play Visionaries Staking Vault
          </p>
          <IoIosInformationCircle
            data-tooltip-id="info-tooltip"
            style={{ fontSize: 20, cursor: 'pointer', color: '#FFFFFF' }}
          />
          <Tooltip
            id="info-tooltip"
            place="bottom"
            delayHide={200}
            style={{ backgroundColor: '#636363' }}
            clickable
          >
            <p style={{ fontSize: 12 }}>
              You need to own Visionaries NFTs to <br></br>lock in this reward vault.
            </p>
            <p>
              <a
                style={{ fontSize: 12, color: 'yellow', textDecoration: 'underline' }}
                href="https://element.market/collections/t3playvisionaries"
                target="_blank"
                rel="noopener noreferrer"
              >
                Purchase Visionaries here
              </a>
            </p>
          </Tooltip>
        </div>
        <hr
          style={{
            width: '100%',
            border: '1px solid #333',
          }}
        />
        <div
          style={{
            margin: '20px 0',
            width: '100%',
            overflowX: 'hidden',
          }}
        >
          <h2 style={{ fontSize: 22 }}>Unstaked NFTs</h2>
          <div
            style={{
              maxHeight: 450,
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              overflowY: 'scroll',
              width: '500px',
            }}
          >
            {ownedNFTs && ownedNFTs.length > 0 ? (
              ownedNFTs.map((nft: any) => (
                <NFTCard
                  key={nft.id}
                  nft={nft}
                  refetch={getOwnerNfts}
                  refecthStakedInfo={refetchStakedInfo}
                />
              ))
            ) : (
              <p style={{ margin: '20px' }}>You're unstaked NFTs 0</p>
            )}
          </div>
        </div>
        <hr
          style={{
            width: '100%',
            border: '1px solid #333',
          }}
        />
        <div style={{ width: '100%', margin: '20px 0' }}>
          <h2 style={{ fontSize: 22 }}>Staked NFTs</h2>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '500px' }}>
            {stakedInfo && stakedInfo[0].length > 0 ? (
              stakedInfo[0].map((nft: any, index: number) => (
                <StakedNFTCard
                  key={index}
                  tokenId={nft}
                  refetchStakedInfo={refetchStakedInfo}
                  refetchOwnedNFTs={getOwnerNfts}
                />
              ))
            ) : (
              <p style={{ margin: '20px' }}>No NFTs staked</p>
            )}
          </div>
        </div>
        <hr
          style={{
            width: '100%',
            border: '1px solid #333',
          }}
        />
        <StakeRewards ownedNFTs={ownedNFTs} stakedNFTs={stakedInfo?.[0] || []} />
      </div>
    );
  } else {
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
          <p style={{ textAlign: 'center', fontSize: 16 }}>
            Stake your NFTs and unlock exclusive rewards. 🚀
          </p>
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
          <ConnectButton client={client} chain={linea} />
        </div>
      </div>
    );
  }
};
