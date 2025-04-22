const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Getting Started with Solidity / Error Handling", function () {
  let contract;

  beforeEach(async () => {
    const Contract = await ethers.getContractFactory(
      "contracts/getting_started_with_solidity/10_error_handling/MyContract.sol:MyContract"
    );
    contract = await Contract.deploy();
    await contract.deployed();
  });

  it("Should be able to verify all variable values", async function () {
    const tx = await contract.deposit(3);
    await tx.wait();

    expect(await contract.balance()).to.equal(3);
  });
});
