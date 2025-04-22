const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Sample Apps / Timelock", function () {
  let contract;
  let owner, signer1, signer2;

  beforeEach(async () => {
    [owner, signer1, signer2] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory(
      "contracts/sample_apps/04_time_lock/Timelock.sol:Timelock",
      owner
    );
    contract = await Contract.deploy();
    await contract.deployed();
  });

  it("Should be able to verify all variable values", async function () {
    let tx=await contract.connect(signer1).deposit({ value: ethers.utils.parseEther("1") });
    await tx.wait();

    expect(await contract.balances(signer1.address)).to.equal(ethers.utils.parseEther("1"));
    expect(await contract.balances(signer2.address)).to.equal(0);

    await expect(contract.connect(signer1).withdraw()).to.be.revertedWith(
      "lock time has not expired"
    );

    if (ethers.name === "hardhat") {
      tx=await network.provider.send("evm_increaseTime", [604800]); // fast forward in 604800 seconds (a week)
      await tx.wait();
    } else {
      tx=await contract.connect(signer1).fastForward(604800);
      await tx.wait();
    }
    

    tx=await contract.connect(signer1).withdraw();
    await tx.wait();
    expect(await contract.balances(signer1.address)).to.equal(0);
  });
});
