require("@nomiclabs/hardhat-ethers");
require('dotenv').config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/wri27wyda_WcDDO1B26KVDAIUVDZ2XcW",
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
