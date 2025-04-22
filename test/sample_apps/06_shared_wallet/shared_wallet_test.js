const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Sample Apps / Shared Wallet", function () {
  let contract;
  let owner, signer1, signer2;

  beforeEach(async () => {
    [owner, signer1, signer2] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory(
      "contracts/sample_apps/06_shared_wallet/SharedWallet.sol:SharedWallet",
      owner
    );
    contract = await Contract.deploy();
    await contract.deployed();
  });

  it("Should be able to add or remove an owner of shared wallet ", async function () {
    let tx=await contract.addOwner(signer1.address);
    await tx.wait();
    tx=await contract.removeOwner(signer1.address);
    await tx.wait();
  });

  it("Should be able to deposit fund", async function () {
    let tx=await signer1.sendTransaction({
      to: contract.address,
      value: ethers.utils.parseEther("1"),
    });
    await tx.wait();

    expect(await contract.provider.getBalance(contract.address)).to.equal(
      ethers.utils.parseEther("1")
    );
  });

  it("Should be able to withdraw fund", async function () {
    let tx=await contract.addOwner(signer1.address);
    await tx.wait();
    tx=await signer1.sendTransaction({
      to: contract.address,
      value: ethers.utils.parseEther("1"),
    });
    await tx.wait();

    tx=await contract.withdraw(ethers.utils.parseEther("0.5"));
    await tx.wait();
    expect(await contract.provider.getBalance(contract.address)).to.equal(
      ethers.utils.parseEther("0.5")
    );

    await expect(
      contract.connect(signer2).withdraw(ethers.utils.parseEther("0.5"))
    ).to.be.revertedWith("Not contract owner or owners of shared wallet");
  });

  it("Should be able to transfer fund to another address", async function () {
    let tx=await contract.addOwner(signer1.address);
    await tx.wait();
    tx=await signer1.sendTransaction({
      to: contract.address,
      value: ethers.utils.parseEther("1"),
    });
    await tx.wait();

    const previousBalance = await signer2.getBalance();
    tx=await contract.connect(signer1).transferTo(signer2.address, ethers.utils.parseEther("0.5"));
    await tx.wait();
    expect(await signer2.getBalance()).to.equal(
      previousBalance.add(ethers.utils.parseEther("0.5"))
    );
  });
});
