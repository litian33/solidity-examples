const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Sample Apps / Sample Contract", function () {
  let contract;

  beforeEach(async () => {
    const Contract = await ethers.getContractFactory(
      "contracts/sample_apps/01_sample_contract/MyContract.sol:MyContract"
    );
    contract = await Contract.deploy();
    await contract.deployed();
  });

  it("Should be able to verify all variable values", async function () {
    let tx = await contract.setAge(40);
    await tx.wait();
    tx=await contract.setName("John Doe");
    await tx.wait();

    expect(await contract.getAge()).to.equal(40);
    expect(await contract.getName()).to.equal("John Doe");
  });
});
