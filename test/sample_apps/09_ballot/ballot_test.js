const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Sample Apps / Ballot", function () {
  let contract, signers, chairperson, proposals;

  beforeEach(async () => {
    proposals = ["Apple", "Banana"];
    [chairperson, ...signers] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory(
      "contracts/sample_apps/09_ballot/Ballot.sol:Ballot",
      chairperson
    );
    contract = await Contract.deploy(proposals.map((n) => toBytes32(n)));
    await contract.deployed();
  });

  it("should be able to verify the chairperson", async function () {
    expect(await contract.chairperson()).to.equal(chairperson.address);
  });

  it("should be only chairperson to allow others to vote", async function () {
    const [account1, account2] = signers;

    let tx=await contract.giveRightToVote(account1.address);
    await tx.wait();
    await expect(contract.connect(account1).giveRightToVote(account2.address)).to.be.revertedWith(
      "Only chairperson can give right to vote."
    );
  });

  it("should only allow to vote by chairperson", async function () {
    const [publicAccount, allowedAccount] = signers;

    let tx=await contract.giveRightToVote(allowedAccount.address);
    await tx.wait();

    tx=await contract.connect(allowedAccount).vote(proposals.indexOf("Apple"));
    await tx.wait();
    // await expect(contract.connect(allowedAccount).vote(proposals.indexOf("Apple"))).to.be.not
    //   .reverted;

    await expect(
       contract.connect(publicAccount).vote(proposals.indexOf("Apple"))
    ).to.be.revertedWith("Has no right to vote.");
  });

  it("should only vote only once", async function () {
    const account = signers[0];

    let tx=await contract.giveRightToVote(account.address);
    await tx.wait();
    tx=await contract.connect(account).vote(proposals.indexOf("Apple"));
    await tx.wait();

    await expect(contract.connect(account).vote(proposals.indexOf("Apple"))).to.be.revertedWith(
      "Already voted."
    );
  });

  it("should be able to delegate vote", async function () {
    const [votedAccount, delegator, delegatee] = signers;

    let tx=await contract.giveRightToVote(votedAccount.address);
    await tx.wait();
    tx=await contract.giveRightToVote(delegator.address);
    await tx.wait();
    tx=await contract.giveRightToVote(delegatee.address);
    await tx.wait();

    tx=await contract.connect(votedAccount).vote(proposals.indexOf("Apple"));
    await tx.wait();
    await expect(contract.connect(votedAccount).delegate(delegatee.address)).to.be.revertedWith(
      "You already voted."
    );

    tx=await contract.connect(delegator).delegate(delegatee.address)
    await tx.wait();
    // await expect(contract.connect(delegator).delegate(delegatee.address)).to.be.not.reverted;
  });

  it("should be able to return winner name of proposals", async function () {
    for (const signer of signers) {
      let tx=await contract.giveRightToVote(signer.address);
      await tx.wait();
    }

    let tx=await contract.connect(signers[0]).delegate(signers[1].address);
    await tx.wait();
    tx=await contract.connect(signers[1]).vote(proposals.indexOf("Apple"));
    await tx.wait();
    tx=await contract.connect(signers[2]).vote(proposals.indexOf("Banana"));
    await tx.wait();

    expect(await contract.winnerName()).to.equal(toBytes32("Apple"));
  });

  function toBytes32(text) {
    return ethers.utils.formatBytes32String(text);
  }
});
