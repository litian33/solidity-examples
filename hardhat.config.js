require("@nomicfoundation/hardhat-toolbox");
require("dotenv/config");
require("@nomiclabs/hardhat-etherscan");
const { ethers } = require("ethers");

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.9",
  defaultNetwork:"juSolo",
  networks: {
    juSolo: {
      url: "http://192.168.8.18:8545", 
      accounts: process.env.PRIVATE_KEYS ? process.env.PRIVATE_KEYS.split(',') : [], 
      gasPrice:2000000007
    },
    juLocal: {
      url: "http://192.168.8.14:8545", 
      accounts: process.env.PRIVATE_KEYS ? process.env.PRIVATE_KEYS.split(',') : []
    },
    juDev: {
        url: "http://47.236.98.58:8545", 
        accounts: process.env.PRIVATE_KEYS ? process.env.PRIVATE_KEYS.split(',') : []
    },
    juTest: {
      url: "https://testnet-rpc.juchain.org", 
      accounts: process.env.PRIVATE_KEYS ? process.env.PRIVATE_KEYS.split(',') : []
  },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
