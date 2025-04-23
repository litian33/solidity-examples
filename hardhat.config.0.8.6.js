require("@nomicfoundation/hardhat-toolbox");
require("dotenv/config");
require("@nomiclabs/hardhat-etherscan");
const { ethers } = require("ethers");
const { networks } = require("./networks");


/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.6",
  compilers: [
    {
      version: "0.8.6",
      settings: { 
        evmVersion: "berlin",
        optimizer: { enabled: true, runs: 200 } 
      }
    },
  ],
  networks: {
    ...networks
  }
};