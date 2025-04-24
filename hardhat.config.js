require("@nomicfoundation/hardhat-toolbox");
require("dotenv/config");
require("@nomiclabs/hardhat-etherscan");
const { ethers } = require("ethers");
const { networks } = require("./networks");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.9",
  compilers: [
    {
      version: "0.8.9",
      settings: {
        evmVersion: "london",
        optimizer: { enabled: true, runs: 200 }
      }
    },
  ],
  defaultNetwork: "dev",
  networks: {
    dev: {
      url: "http://localhost:8545",
      accounts: process.env.PRIVATE_KEYS ? process.env.PRIVATE_KEYS.split(',') : [],
      gasPrice: 1200000000,
      hardfork: "london"
    },
    juSolo: {
      url: "http://192.168.8.18:8545",
      accounts: process.env.PRIVATE_KEYS ? process.env.PRIVATE_KEYS.split(',') : [],
      gasPrice: 1100000000
    },
    juLocal: {
      url: "http://192.168.8.14:8545",
      accounts: process.env.PRIVATE_KEYS ? process.env.PRIVATE_KEYS.split(',') : [],
      gasPrice: 1100000000,
      gas: "auto"
    },
    juDev: {
      url: "http://47.236.98.58:8545",
      accounts: process.env.PRIVATE_KEYS ? process.env.PRIVATE_KEYS.split(',') : [],
      gasPrice: 1100000000
    },
    juTest: {
      url: "https://testnet-rpc.juchain.org",
      accounts: process.env.PRIVATE_KEYS ? process.env.PRIVATE_KEYS.split(',') : [],
      gasPrice: 1100000000
    },
  },
};