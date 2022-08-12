import { HardhatUserConfig, task } from 'hardhat/config';
import { config } from 'dotenv';

import '@typechain/hardhat';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-web3';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan';
import '@openzeppelin/hardhat-upgrades';

// using community plugins
import 'solidity-coverage';
import 'hardhat-gas-reporter';
import 'hardhat-contract-sizer';
import 'hardhat-deploy';

import { getFeeWalletAddress, getMasterWallet, getTrustForwarder } from './config';

config();

const accounts = [process.env.PRIVATE_KEY] as string[];

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const hardhatConfig: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      accounts: {
        count: 150,
      },
    },
    localhost: {
      url: 'http://localhost:8545',
      saveDeployments: true,
      loggingEnabled: true,
      live: true,
      tags: ['testnet', 'staging'],
    },
    // polygon: {
    //   url: process.env.POLYGON_RPC_URL,
    //   accounts,
    //   saveDeployments: true,
    //   loggingEnabled: true,
    //   live: true,
    //   tags: ['polygon', 'mainnet'],
    //   verify: {
    //     etherscan: {
    //       apiKey: 'FSYHBPSIYA743ZKG6ECWM9753AN5KG8P8U',
    //     },
    //   },
    // },
  },
  solidity: {
    version: '0.8.3',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  namedAccounts: {
    deployer: { default: 0},
    // feeWallet: {
    //   1: getFeeWalletAddress(),
    //   4: getFeeWalletAddress(),
    //   56: getFeeWalletAddress(),
    //   97: getFeeWalletAddress(),
    //   137: getFeeWalletAddress(),
    //   80001: getFeeWalletAddress(),
    // },
    // masterWallet: {
    //   1: getMasterWallet(),
    //   4: getMasterWallet(),
    //   56: getMasterWallet(),
    //   97: getMasterWallet(),
    //   137: getFeeWalletAddress(),
    //   80001: getFeeWalletAddress(),
    // },
    // trustForwarder: {
    //   1: getTrustForwarder(),
    //   4: getTrustForwarder(),
    //   56: getTrustForwarder(),
    //   97: getTrustForwarder(),
    //   137: getFeeWalletAddress(),
    //   80001: getFeeWalletAddress(),
    // },
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
  mocha: {
    timeout: 20000,
    color: true,
  },
  etherscan: {
    apiKey: process.env.ETH_API_KEY,
  },
  gasReporter: {
    currency: 'USD',
    enabled: Boolean(process.env.REPORT_GAS),
    coinmarketcap: process.env.CMC_API_KEY,
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
  },
};

export default hardhatConfig;
