const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Getting Started with Solidity / Inheritance", function () {
  let contract;

  beforeEach(async () => {
    const Contract = await ethers.getContractFactory(
      "contracts/getting_started_with_solidity/21_inheritance/MyContract.sol:MyContract"
    );
    contract = await Contract.deploy();
    await contract.deployed();
  });

  it("Should be able to verify all variable values", async function () {
    var tx=await contract.setName("John Doe");
    await tx.wait();
    tx=await contract.setAge(40);
    await tx.wait();
    tx=await contract.deposit(100);
    await tx.wait();

    expect(await contract.getName()).to.equal("John Doe");
    expect(await contract.getAge()).to.equal(40);
    expect(await contract.balance()).to.equal(110);
    expect(await contract.loan()).to.equal(true);

    tx=await contract.withdraw(110);
    await tx.wait();
    expect(await contract.balance()).to.equal(0);
    expect(await contract.loan()).to.equal(false);
  });
});
