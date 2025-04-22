const { network } = require("hardhat");

async function moveTime(amount) {
  if (network.name === "hardhat") {
    await network.provider.send("evm_increaseTime", [amount]);
  } else {
    await new Promise(resolve => setTimeout(resolve, amount * 1000));
  }
}

async function moveBlocks(amount) {
  if (network.name === "hardhat") {
    for (let index = 0; index < amount; index++) {
      await network.provider.request({
        method: "evm_mine",
        params: [],
      });
    }
  }else{
    await new Promise(resolve => setTimeout(resolve, amount * 1000));
  }
}

async function getLatestBlockTs() {
  let latestBlock = await ethers.provider.getBlock("latest");
  return latestBlock.timestamp;
}

module.exports = {
  moveTime,
  moveBlocks,
  getLatestBlockTs,
};
