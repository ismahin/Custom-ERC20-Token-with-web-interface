const hre = require("hardhat");

async function main() {
  const [owner] = await hre.ethers.getSigners();

  // Deployed contract address
  const tokenAddress = "0xF28BC1337898ca40BdaFacE3f1322feFA811A90F";

  // Amount to mint (in smallest units, e.g., wei for ether)
  const mintAmount = hre.ethers.utils.parseUnits("5000", 18);

  const Token = await hre.ethers.getContractFactory("customToken");
  const token = Token.attach(tokenAddress);

  const tx = await token.mint(owner.address, mintAmount);
  await tx.wait();

  console.log(`Minted ${mintAmount.toString()} tokens to ${owner.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
