const { ethers } = require("hardhat");
async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    const balance = await deployer.getBalance();
    console.log("Account balance:", balance.toString());
  
    const Token = await ethers.getContractFactory("customToken");
    const amount = ethers.utils.parseUnits("10000", 18);
    const token = await Token.deploy(amount); // Supply of 10,000 tokens
  
    console.log("Token address:", token.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  