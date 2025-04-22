const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Getting Started with Solidity / Array", function () {
  let contract;

  beforeEach(async () => {
    const Contract = await ethers.getContractFactory(
      "contracts/getting_started_with_solidity/13_array/MyContract.sol:MyContract"
    );
    contract = await Contract.deploy();
    await contract.deployed();
  });

  it("Should be able to verify all variable values", async function () {
    var tx = await contract.pushIsToAdd(1);
    await tx.wait();
    tx = await contract.pushIsToAdd(2);
    await tx.wait();
    tx = await contract.pushIsToAdd(3);
    await tx.wait();
    tx = await contract.pushIsToAdd(4); // Array [1, 2, 3, 4]
    await tx.wait();

    expect(await contract.getItemInArray(1)).to.equal(2);

    tx = await contract.updateTheArray(1, 5); // Array [1, 5, 3, 4]
    await tx.wait();
    expect(await contract.getItemInArray(1)).to.equal(5);

    tx = await contract.remove(1); // Array [1, 0, 3, 4]
    await tx.wait();
    expect(await contract.getItemInArray(1)).to.equal(0);
    expect(await contract.getLength()).to.equal(4);

    tx = await contract.removeAndCompact(1); // Array [1, 4, 3]
    await tx.wait();
    expect(await contract.getItemInArray(1)).to.equal(4);
    expect(await contract.getItemInArray(2)).to.equal(3);
    expect(await contract.getLength()).to.equal(3);
  });
});
