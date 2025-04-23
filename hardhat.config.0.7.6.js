require("@nomicfoundation/hardhat-toolbox");
require("dotenv/config");
require("@nomiclabs/hardhat-etherscan");
const { ethers } = require("ethers");
const { networks } = require("./networks");


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.7.6",
  compilers: [
    {
      version: "0.7.6",
      settings: { 
        evmVersion: "istanbul",
        optimizer: { enabled: true, runs: 200 } 
      }
    },
  ],
  networks: {
    ...networks
  }
};