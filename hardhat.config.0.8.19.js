require("@nomicfoundation/hardhat-toolbox");
require("dotenv/config");
require("@nomiclabs/hardhat-etherscan");
const { ethers } = require("ethers");
const { networks } = require("./networks");


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.19",
  compilers: [
    {
      version: "0.8.19",
      settings: { 
        evmVersion: "london",
        optimizer: { enabled: true, runs: 200 } 
      }
    },
  ],
  networks: {
    ...networks
  }
};