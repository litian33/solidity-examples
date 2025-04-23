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
  defaultNetwork:"juDev",
    // 配置 Mocha 测试框架参数
  // mocha: {
  //   timeout: 120000 // 设置全局测试超时为 120 秒
  // },
  networks: {
    juSolo: {
      url: "http://192.168.8.18:8545", 
      accounts: process.env.PRIVATE_KEYS ? process.env.PRIVATE_KEYS.split(',') : [], 
      gasPrice:1100000000
    },
    juLocal: {
      url: "http://192.168.8.14:8545", 
      accounts: process.env.PRIVATE_KEYS ? process.env.PRIVATE_KEYS.split(',') : [],
      gasPrice:1100000000,
      gas: "auto"
    },
    juDev: {
        url: "http://47.236.98.58:8545", 
        accounts: process.env.PRIVATE_KEYS ? process.env.PRIVATE_KEYS.split(',') : [],
        gasPrice:1100000000
    },
    juTest: {
      url: "https://testnet-rpc.juchain.org", 
      accounts: process.env.PRIVATE_KEYS ? process.env.PRIVATE_KEYS.split(',') : [],
      gasPrice:1100000000
  },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
