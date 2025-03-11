import { ethers } from "hardhat";

async function main() {
  const Lock = await ethers.getContractFactory("Lock");
  const lock = await Lock.deploy();

  await lock.deployed();
  console.log("Contract deployed to address:", lock.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
