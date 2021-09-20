const { ethers, deployments } = require("hardhat");
const { expect } = require("chai");

// we create a setup function that can be called by every test and setup variable for easy to read tests
async function setup() {
  // The deployment fixture is handled by deploy/01_access_controls.js
  await deployments.fixture(["HashtagAccessControls"]);

  // Get an instantiated contract in the form of a ethers.js Contract instance:
  const contracts = {
    contractAccessControls: await ethers.getContract("HashtagAccessControls"),
  };

  // See namedAccounts section of hardhat.config.js
  const namedAccounts = await ethers.getNamedSigners();
  const accounts = {
    accountHashtagAdmin: namedAccounts["accountHashtagAdmin"],
    accountHashtagPublisher: namedAccounts["accountHashtagPublisher"],
  };

  return {
    ...accounts,
    ...contracts,
  };
}

describe("HashtagAccessControl Tests", function () {

  describe("Validate setup", async function () {
    it("named account accountHashtagAdmin should be admin", async function () {
      // before the test, we call the fixture function.
      // while mocha have hooks to perform these automatically, they force you
      // to declare the variable in greater scope which can introduce subtle errors
      // as such we prefer to have the setup called right at the beginning of the test.
      const { contractAccessControls, accountHashtagAdmin } = await setup();
      expect(await contractAccessControls.isAdmin(accountHashtagAdmin.address)).to.be.equal(true);
    });
  });

  describe("Validate setup", async function () {
    it("named account accountHashtagAdmin should be admin", async function () {
      // before the test, we call the fixture function.
      // while mocha have hooks to perform these automatically, they force you
      // to declare the variable in greater scope which can introduce subtle errors
      // as such we prefer to have the setup called right at the beginning of the test.
      const { contractAccessControls, accountHashtagAdmin } = await setup();
      expect(await contractAccessControls.isAdmin(accountHashtagAdmin.address)).to.be.equal(true);
    });
  });

  describe("Publisher", async function () {
    it("should admin as contract creator", async function () {
      const { contractAccessControls, accountHashtagPublisher } = await setup();
      await contractAccessControls.grantRole(ethers.utils.id("PUBLISHER"), accountHashtagPublisher.address);
      expect(await contractAccessControls.isPublisher(accountHashtagPublisher.address)).to.be.equal(true);
    });
  });
});
