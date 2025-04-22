const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Getting Started with Solidity / Payable Modifier", function () {
  let contract;
  let owner, signer;

  beforeEach(async () => {
    [owner, signer] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory(
      "contracts/getting_started_with_solidity/17_payable_modifier/MyContract.sol:MyContract",
      owner
    );
    contract = await Contract.deploy({ value: 100 });
    await contract.deployed();
  });

  it("Should be able to verify all variable values", async function () {
    expect(await contract.provider.getBalance(contract.address)).to.equal(100);

    var tx=await contract.withdraw(5);
    await tx.wait();
    expect(await contract.provider.getBalance(contract.address)).to.equal(95);

    const balanceBeforeTransfer = await signer.getBalance();
    tx=await contract.transfer(signer.address, 10);
    await tx.wait();
    expect(await contract.provider.getBalance(contract.address)).to.equal(85);
    expect(await signer.getBalance()).to.equal(balanceBeforeTransfer.add(10));
  });
});
