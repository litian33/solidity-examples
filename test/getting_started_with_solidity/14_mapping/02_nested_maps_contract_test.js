const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Getting Started with Solidity / Mapping / NestedMapsContract", function () {
  let contract;

  beforeEach(async () => {
    const Contract = await ethers.getContractFactory(
      "contracts/getting_started_with_solidity/14_mapping/02_NestedMapsContract.sol:NestedMapsContract"
    );
    contract = await Contract.deploy();
    await contract.deployed();
  });

  it("Should be able to verify all variable values", async function () {
    let [owner, spender1, spender2] = await ethers.getSigners();
    var tx=await contract.set(owner.address, spender1.address, 5);
    await tx.wait();
    tx=await contract.set(owner.address, spender2.address, 10);
    await tx.wait();

    expect(await contract.get(owner.address, spender1.address)).to.equal(5);
    expect(await contract.get(owner.address, spender2.address)).to.equal(10);

    tx=await contract.remove(owner.address, spender2.address);
    await tx.wait();
    expect(await contract.get(owner.address, spender1.address)).to.equal(5);
    expect(await contract.get(owner.address, spender2.address)).to.equal(0);
  });
});
