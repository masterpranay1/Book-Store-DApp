const hre = require("hardhat");

async function main() {
  const BookStore = await hre.ethers.getContractFactory("BookStore");
  const bookStore = await BookStore.deploy();
  await bookStore.deployed();

  console.log("BookStore deployed to:", bookStore.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});