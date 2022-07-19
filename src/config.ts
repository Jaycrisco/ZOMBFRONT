// import { ChainId } from '@pancakeswap-libs/sdk';
import { ChainId } from '@spookyswap/sdk';
import { Configuration } from './tomb-finance/config';
import { BankInfo } from './tomb-finance';

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: ChainId.ZSPTESTNET,
    networkName: 'Fantom Opera Testnet',
    ftmscanUrl: 'https://testnet.ftmscan.com',
    defaultProvider: 'https://rpc.testnet.fantom.network/',
    deployments: require('./tomb-finance/deployments/deployments.testing.json'),
    externalTokens: {
      ZSP: ['0x2C26617034C840C9412CD67aE0Fc68A6755D00BF', 18],
      FUSDT: ['0x04068DA6C83AFCFA0e13ba15A6696662335D5B75', 6],
      BOO: ['0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE', 18],
      ZOO: ['0x09e145a1d53c0045f41aeef25d8ff982ae74dd56', 0],
      SHIBA: ['0x9ba3e4f84a34df4e08c112e1a0ff148b81655615', 9],
      'USDT-ZSP-LP': ['0x2b4C76d0dc16BE1C31D4C1DC53bF9B45987Fc75c', 18],
      'ZOMB-ZSP-LP': ['0xE9Fd98DEa3F4Bdab7A4b1F03117F3F44955aA8c5', 18],
      'ZSHARE-ZSP-LP': ['0x4733bc45eF91cF7CcEcaeeDb794727075fB209F2', 18],
    },
    baseLaunchDate: new Date('2021-06-02 13:00:00Z'),
    bondLaunchesAt: new Date('2020-12-03T15:00:00Z'),
    masonryLaunchesAt: new Date('2020-12-11T00:00:00Z'),
    refreshInterval: 10000,
  },
  production: {
    chainId: ChainId.MAINNET,
    networkName: 'Fantom Opera Mainnet',
    ftmscanUrl: 'https://ftmscan.com',
    defaultProvider: 'https://rpc.ftm.tools/',
    deployments: require('./tomb-finance/deployments/deployments.mainnet.json'),
    externalTokens: {
      ZSP: ['0x2C26617034C840C9412CD67aE0Fc68A6755D00BF', 18],
      FUSDT: ['0x04068DA6C83AFCFA0e13ba15A6696662335D5B75', 6], // This is actually usdc on mainnet not fusdt
      BOO: ['0x841FAD6EAe12c286d1Fd18d1d525DFfA75C7EFFE', 18],
      ZOO: ['0x09e145a1d53c0045f41aeef25d8ff982ae74dd56', 0],
      SHIBA: ['0x9ba3e4f84a34df4e08c112e1a0ff148b81655615', 9],
      'USDT-ZSP-LP': ['0x2b4C76d0dc16BE1C31D4C1DC53bF9B45987Fc75c', 18],
      'ZOMB-ZSP-LP': ['0xE9Fd98DEa3F4Bdab7A4b1F03117F3F44955aA8c5', 18],
      'ZSHARE-ZSP-LP': ['0x4733bc45eF91cF7CcEcaeeDb794727075fB209F2', 18],
    },
    baseLaunchDate: new Date('2021-06-02 13:00:00Z'),
    bondLaunchesAt: new Date('2020-12-03T15:00:00Z'),
    masonryLaunchesAt: new Date('2020-12-11T00:00:00Z'),
    refreshInterval: 10000,
  },
};

export const bankDefinitions: { [contractName: string]: BankInfo } = {
  /*
  Explanation:
  name: description of the card
  poolId: the poolId assigned in the contract
  sectionInUI: way to distinguish in which of the 3 pool groups it should be listed
        - 0 = Single asset stake pools
        - 1 = LP asset staking rewarding ZOMB
        - 2 = LP asset staking rewarding ZSHARE
  contract: the contract name which will be loaded from the deployment.environmnet.json
  depositTokenName : the name of the token to be deposited
  earnTokenName: the rewarded token
  finished: will disable the pool on the UI if set to true
  sort: the order of the pool
  */
  ZombFtmRewardPool: {
    name: 'Earn ZOMB by ZSP',
    poolId: 0,
    sectionInUI: 0,
    contract: 'ZombFtmRewardPool',
    depositTokenName: 'ZSP',
    earnTokenName: 'ZOMB',
    finished: false,
    sort: 1,
    closedForStaking: true,
  },
  ZombBooRewardPool: {
    name: 'Earn ZOMB by BOO',
    poolId: 1,
    sectionInUI: 0,
    contract: 'ZombBooGenesisRewardPool',
    depositTokenName: 'BOO',
    earnTokenName: 'ZOMB',
    finished: false,
    sort: 2,
    closedForStaking: true,
  },
  ZombShibaRewardPool: {
    name: 'Earn ZOMB by SHIBA',
    poolId: 2,
    sectionInUI: 0,
    contract: 'ZombShibaGenesisRewardPool',
    depositTokenName: 'SHIBA',
    earnTokenName: 'ZOMB',
    finished: false,
    sort: 3,
    closedForStaking: true,
  },
  ZombZooRewardPool: {
    name: 'Earn ZOMB by ZOO',
    poolId: 3,
    sectionInUI: 0,
    contract: 'ZombZooGenesisRewardPool',
    depositTokenName: 'ZOO',
    earnTokenName: 'ZOMB',
    finished: false,
    sort: 4,
    closedForStaking: true,
  },
  ZombFtmLPZombRewardPool: {
    name: 'Earn ZOMB by ZOMB-ZSP LP',
    poolId: 0,
    sectionInUI: 1,
    contract: 'ZombFtmLpZombRewardPool',
    depositTokenName: 'ZOMB-ZSP-LP',
    earnTokenName: 'ZOMB',
    finished: false,
    sort: 5,
    closedForStaking: true,
  },
  ZombFtmLPZombRewardPoolOld: {
    name: 'Earn ZOMB by ZOMB-ZSP LP',
    poolId: 0,
    sectionInUI: 1,
    contract: 'ZombFtmLpZombRewardPoolOld',
    depositTokenName: 'ZOMB-ZSP-LP',
    earnTokenName: 'ZOMB',
    finished: true,
    sort: 9,
    closedForStaking: true,
  },
  ZombFtmLPZShareRewardPool: {
    name: 'Earn ZSHARE by ZOMB-ZSP LP',
    poolId: 0,
    sectionInUI: 2,
    contract: 'ZombFtmLPZShareRewardPool',
    depositTokenName: 'ZOMB-ZSP-LP',
    earnTokenName: 'ZSHARE',
    finished: false,
    sort: 6,
    closedForStaking: false,
  },
  ZshareFtmLPZShareRewardPool: {
    name: 'Earn ZSHARE by ZSHARE-ZSP LP',
    poolId: 1,
    sectionInUI: 2,
    contract: 'ZshareFtmLPZShareRewardPool',
    depositTokenName: 'ZSHARE-ZSP-LP',
    earnTokenName: 'ZSHARE',
    finished: false,
    sort: 7,
    closedForStaking: false,
  },
};

export default configurations[process.env.NODE_ENV || 'development'];
