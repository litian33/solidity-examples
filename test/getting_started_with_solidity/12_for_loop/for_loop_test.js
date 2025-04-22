const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Getting Started with Solidity / For Loop", function () {
  let contract;

  beforeEach(async () => {
    const Contract = await ethers.getContractFactory(
      "contracts/getting_started_with_solidity/12_for_loop/MyContract.sol:MyContract"
    );
    contract = await Contract.deploy();
    await contract.deployed();
  });

  it("Should be able to verify all variable values", async function () {
    var tx = await contract.doLoop(2);
    await tx.wait();
    expect(await contract.loopCount()).to.equal(2);

    tx = await contract.doLoop(3);
    await tx.wait();
    expect(await contract.loopCount()).to.equal(5);
  });
});
