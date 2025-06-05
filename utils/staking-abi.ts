export const erc20StakingAbi = [
  // {
  //   inputs: [{ internalType: 'address', name: '_token', type: 'address' }],
  //   stateMutability: 'nonpayable',
  //   type: 'constructor',
  // },
  // {
  //   inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
  //   name: 'OwnableInvalidOwner',
  //   type: 'error',
  // },
  // {
  //   inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
  //   name: 'OwnableUnauthorizedAccount',
  //   type: 'error',
  // },
  // {
  //   anonymous: false,
  //   inputs: [
  //     { indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' },
  //     { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
  //   ],
  //   name: 'OwnershipTransferred',
  //   type: 'event',
  // },
  // {
  //   anonymous: false,
  //   inputs: [
  //     { indexed: false, internalType: 'uint256', name: 'newStakeLimit', type: 'uint256' },
  //     { indexed: false, internalType: 'uint256', name: 'newLockDuration', type: 'uint256' },
  //     { indexed: false, internalType: 'uint256', name: 'newWithdrawalWindow', type: 'uint256' },
  //     {
  //       indexed: false,
  //       internalType: 'uint256',
  //       name: 'newFixedRewardPercentage',
  //       type: 'uint256',
  //     },
  //   ],
  //   name: 'ParametersUpdated',
  //   type: 'event',
  // },
  // {
  //   anonymous: false,
  //   inputs: [
  //     { indexed: true, internalType: 'address', name: 'user', type: 'address' },
  //     { indexed: false, internalType: 'uint256', name: 'reward', type: 'uint256' },
  //   ],
  //   name: 'RewardClaimed',
  //   type: 'event',
  // },
  // {
  //   anonymous: false,
  //   inputs: [
  //     { indexed: true, internalType: 'address', name: 'user', type: 'address' },
  //     { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
  //   ],
  //   name: 'Staked',
  //   type: 'event',
  // },
  // {
  //   anonymous: false,
  //   inputs: [
  //     { indexed: true, internalType: 'address', name: 'user', type: 'address' },
  //     { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
  //   ],
  //   name: 'unStaked',
  //   type: 'event',
  // },
  // {
  //   inputs: [],
  //   name: 'UnstackAndRewardClaim',
  //   outputs: [],
  //   stateMutability: 'nonpayable',
  //   type: 'function',
  // },
  // {
  //   inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
  //   name: 'canClaimMonthlyReward',
  //   outputs: [
  //     { internalType: 'bool', name: 'canClaim', type: 'bool' },
  //     { internalType: 'uint256', name: 'rewardAmount', type: 'uint256' },
  //   ],
  //   stateMutability: 'view',
  //   type: 'function',
  // },
  // {
  //   inputs: [],
  //   name: 'claimMonthlyReward',
  //   outputs: [],
  //   stateMutability: 'nonpayable',
  //   type: 'function',
  // },
  // {
  //   inputs: [],
  //   name: 'fixedRewardPercentage',
  //   outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
  //   stateMutability: 'view',
  //   type: 'function',
  // },
  // {
  //   inputs: [],
  //   name: 'lockDuration',
  //   outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
  //   stateMutability: 'view',
  //   type: 'function',
  // },
  // {
  //   inputs: [],
  //   name: 'owner',
  //   outputs: [{ internalType: 'address', name: '', type: 'address' }],
  //   stateMutability: 'view',
  //   type: 'function',
  // },
  // {
  //   inputs: [],
  //   name: 'renounceOwnership',
  //   outputs: [],
  //   stateMutability: 'nonpayable',
  //   type: 'function',
  // },
  // {
  //   inputs: [],
  //   name: 'rewardInterval',
  //   outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
  //   stateMutability: 'view',
  //   type: 'function',
  // },
  // {
  //   inputs: [],
  //   name: 'rewardMonths',
  //   outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
  //   stateMutability: 'view',
  //   type: 'function',
  // },
  // {
  //   inputs: [
  //     { internalType: 'uint256', name: '_stakeLimit', type: 'uint256' },
  //     { internalType: 'uint256', name: '_lockDuration', type: 'uint256' },
  //     { internalType: 'uint256', name: '_withdrawalWindow', type: 'uint256' },
  //     { internalType: 'uint256', name: '_fixedRewardPercentage', type: 'uint256' },
  //   ],
  //   name: 'setParameters',
  //   outputs: [],
  //   stateMutability: 'nonpayable',
  //   type: 'function',
  // },
  // {
  //   inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
  //   name: 'stake',
  //   outputs: [],
  //   stateMutability: 'nonpayable',
  //   type: 'function',
  // },
  // {
  //   inputs: [],
  //   name: 'stakeLimit',
  //   outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
  //   stateMutability: 'view',
  //   type: 'function',
  // },
  // {
  //   inputs: [{ internalType: 'address', name: '', type: 'address' }],
  //   name: 'stakes',
  //   outputs: [
  //     { internalType: 'uint256', name: 'amount', type: 'uint256' },
  //     { internalType: 'uint256', name: 'startTime', type: 'uint256' },
  //     { internalType: 'uint256', name: 'unlockTime', type: 'uint256' },
  //     { internalType: 'uint256', name: 'rewardsClaimed', type: 'uint256' },
  //     { internalType: 'uint256', name: 'lastClaimTime', type: 'uint256' },
  //   ],
  //   stateMutability: 'view',
  //   type: 'function',
  // },
  // {
  //   inputs: [],
  //   name: 'stakingToken',
  //   outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
  //   stateMutability: 'view',
  //   type: 'function',
  // },
  // {
  //   inputs: [],
  //   name: 'totalStakedTokens',
  //   outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
  //   stateMutability: 'view',
  //   type: 'function',
  // },
  // {
  //   inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
  //   name: 'transferOwnership',
  //   outputs: [],
  //   stateMutability: 'nonpayable',
  //   type: 'function',
  // },
  // {
  //   inputs: [],
  //   name: 'withdrawFunds',
  //   outputs: [],
  //   stateMutability: 'nonpayable',
  //   type: 'function',
  // },
  // {
  //   inputs: [],
  //   name: 'withdrawalWindow',
  //   outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
  //   stateMutability: 'view',
  //   type: 'function',
  // },
  {
    inputs: [],
    name: 'claimMonthlyReward',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'OwnableInvalidOwner',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'OwnableUnauthorizedAccount',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newStakeLimit',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newLockDuration',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newWithdrawalWindow',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newFixedRewardPercentage',
        type: 'uint256',
      },
    ],
    name: 'ParametersUpdated',
    type: 'event',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'reward',
        type: 'uint256',
      },
    ],
    name: 'RewardClaimed',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_stakeLimit',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_lockDuration',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_withdrawalWindow',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_fixedRewardPercentage',
        type: 'uint256',
      },
    ],
    name: 'setParameters',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'stake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'Staked',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'UnstackAndRewardClaim',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'unStaked',
    type: 'event',
  },
  {
    inputs: [],
    name: 'withdrawFunds',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'canClaimMonthlyReward',
    outputs: [
      {
        internalType: 'bool',
        name: 'canClaim',
        type: 'bool',
      },
      {
        internalType: 'uint256',
        name: 'rewardAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'monthsClaim',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'fixedRewardPercentage',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'lockDuration',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rewardInterval',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rewardMonths',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'stakeLimit',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'stakes',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'startTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'unlockTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'rewardsClaimed',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'lastClaimTime',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'stakingToken',
    outputs: [
      {
        internalType: 'contract IERC20',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalStakedTokens',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'withdrawalWindow',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export const endlessStakingContractABI = [
  {
    inputs: [{ internalType: 'address', name: '_token', type: 'address' }],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'OwnableInvalidOwner',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'address', name: 'token', type: 'address' }],
    name: 'SafeERC20FailedOperation',
    type: 'error',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' },
      { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint256', name: 'newStakeLimit', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'newLockDuration', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'newaprRewardPercentage', type: 'uint256' },
    ],
    name: 'ParametersUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'reward', type: 'uint256' },
    ],
    name: 'RewardClaimed',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'Staked',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
    ],
    name: 'Unstaked',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'address', name: '_stackingAddress', type: 'address' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
    ],
    name: 'approveTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'aprRewardPercentage',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  { inputs: [], name: 'claimReward', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'getClaimableReward',
    outputs: [
      { internalType: 'bool', name: 'canClaim', type: 'bool' },
      { internalType: 'uint256', name: 'rewardAmount', type: 'uint256' },
      { internalType: 'uint256', name: 'timePassed', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'user', type: 'address' }],
    name: 'getPendingReward',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'lockDuration',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rewardInterval',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_stakeLimit', type: 'uint256' },
      { internalType: 'uint256', name: '_lockDuration', type: 'uint256' },
      { internalType: 'uint256', name: '_aprRewardPercentage', type: 'uint256' },
      { internalType: 'uint256', name: '_rewardInterval', type: 'uint256' },
    ],
    name: 'setParameters',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
    name: 'stake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'stakeLimit',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'stakes',
    outputs: [
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'uint256', name: 'startTime', type: 'uint256' },
      { internalType: 'uint256', name: 'unlockTime', type: 'uint256' },
      { internalType: 'uint256', name: 'lastClaimTime', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'stakingToken',
    outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'totalStakedTokens',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  { inputs: [], name: 'unstake', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    inputs: [],
    name: 'withdrawFunds',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
] as const;
