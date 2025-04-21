require("@nomicfoundation/hardhat-toolbox");
require("dotenv/config");
require("@nomiclabs/hardhat-etherscan");
const { ethers } = require("ethers");

const DEPLOYER_PRIVATE_KEY =
  process.env.DEPLOYER_PRIVATE_KEY || ethers.Wallet.createRandom().privateKey;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
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
module.exports = {
  solidity: "0.8.9",
  networks: {
    juSolo: {
      url: "http://192.168.8.18:8545", 
      accounts: [process.env.PRIVATE_KEY], 
      gasPrice:2000000007
    },
    juLocal: {
      url: "http://192.168.8.14:8545", 
      accounts: [process.env.PRIVATE_KEY], 
    },
    juDev: {
        url: "http://47.236.98.58:8545", 
        accounts: [process.env.PRIVATE_KEY], 
    },
    juTest: {
      url: "https://testnet-rpc.juchain.org", 
      accounts: [process.env.PRIVATE_KEY], 
  },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
