require("@nomicfoundation/hardhat-toolbox");
require("dotenv/config");
require("@nomiclabs/hardhat-etherscan");
const { ethers } = require("ethers");
const { networks } = require("./networks");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  compilers: [
    {
      version: "0.8.28",
      settings: { 
        evmVersion: "cancun",
        optimizer: { enabled: true, runs: 200 } 
      }
    },
    {
      version: "0.8.23",
      settings: { 
        evmVersion: "shanghai",
        optimizer: { enabled: true, runs: 200 } 
      }
    },
    {
      version: "0.8.19",
      settings: { 
        evmVersion: "london",
        optimizer: { enabled: true, runs: 200 } 
      }
    },
    {
      version: "0.8.17",
      settings: { 
        evmVersion: "london",
        optimizer: { enabled: true, runs: 200 } 
      }
    },
    {
      version: "0.8.6",
      settings: { 
        evmVersion: "berlin",
        optimizer: { enabled: true, runs: 200 } 
      }
    },
    {
      version: "0.7.6",
      settings: { 
        evmVersion: "istanbul",
        optimizer: { enabled: true, runs: 200 } 
      }
    }
  ],
  networks: {
    ...networks,
  },
};