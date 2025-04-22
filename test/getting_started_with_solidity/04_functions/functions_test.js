const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Getting Started with Solidity / Functions", function () {
  let contract;

  beforeEach(async () => {
    const Contract = await ethers.getContractFactory(
      "contracts/getting_started_with_solidity/04_functions/MyContract.sol:MyContract"
    );
    contract = await Contract.deploy();
    await contract.deployed();
  });

  it("Should be able to verify all variable values", async function () {
    const defaultVal = await contract.getName();
    expect(defaultVal).to.equal("");

    const tx = await contract.setName("Hello Functions");
    await tx.wait();
    expect(await contract.getName()).to.equal("Hello Functions");
  });
});
