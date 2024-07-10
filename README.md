
# ERC20 Token Deployment and Transfer Website

## Project Overview

This project involves deploying a custom ERC20 token on the Ethereum blockchain and creating a simple web interface to transfer these tokens between MetaMask wallets. The project is divided into two main parts:

1. **Deploying the Custom ERC20 Token**
2. **Creating a Web Interface for Token Transfer**

![image](https://github.com/ismahin/Custom-ERC20-Token-with-web-interface/assets/87686970/57cc4826-dae9-4770-9fc7-ffd77705c858)


## Part 1: Deploying the Custom ERC20 Token

To deploy your own ERC20 token, follow these steps:

### 1. Install Dependencies

Ensure you have Node.js and npm installed. Then, install the necessary dependencies:

```bash
npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers dotenv
```

### 2. Create Hardhat Project

Initialize a new Hardhat project:

```bash
npx hardhat init
```

### 3. Write the ERC20 Token Contract

Create a new Solidity file (e.g., `contracts/MyToken.sol`) and write your ERC20 token contract:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    constructor(uint256 initialSupply) ERC20("MyToken", "MTK") {
        _mint(msg.sender, initialSupply);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
```

### 4. Deploy the Contract

Create a deployment script (e.g., `scripts/deploy.js`):

```javascript
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const Token = await hre.ethers.getContractFactory("MyToken");
  const token = await Token.deploy(1000000); // Supply of 1,000,000 tokens
  await token.deployed();
  console.log("Token deployed to:", token.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Deploy your contract to the desired network (e.g., Sepolia testnet):

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

## Part 2: Creating a Web Interface for Token Transfer

Create a simple web interface to transfer tokens between MetaMask wallets.

### 1. HTML Structure

Create an HTML file (e.g., `index.html`) with the following structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ERC20 Token Transfer</title>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        /* Your CSS styling */
    </style>
    <script src="https://cdn.jsdelivr.net/npm/ethers@5.4.6/dist/ethers.umd.min.js"></script>
</head>
<body>
    <!-- Your HTML content -->
    <script>
        // Your JavaScript code
    </script>
</body>
</html>
```

### 2. Connect to MetaMask

Add JavaScript code to connect to MetaMask and fetch wallet details:

```javascript
document.getElementById('connectButton').onclick = async () => {
    if (typeof window.ethereum !== 'undefined') {
        try {
            await ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            // Fetch token balance and display wallet details
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
        }
    } else {
        alert('MetaMask is not installed');
    }
};
```

### 3. Transfer Tokens

Add JavaScript code to transfer tokens between wallets:

```javascript
document.getElementById('transferButton').onclick = async () => {
    const recipient = document.getElementById('recipient').value;
    const amount = document.getElementById('amount').value;
    if (recipient && amount) {
        const contract = new ethers.Contract(tokenAddress, abi, signer);
        try {
            const transferAmount = ethers.utils.parseUnits(amount, 18);
            const tx = await contract.transfer(recipient, transferAmount);
            await tx.wait();
            // Show modal with transaction hash
        } catch (error) {
            console.error('Transfer failed:', error);
        }
    } else {
        alert('Please enter recipient address and amount');
    }
};
```

### 4. Modal for Transaction Confirmation

Include a modal to show the transaction confirmation:

```html
<!-- The Modal -->
<div id="myModal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2>Transfer Successful</h2>
        <p id="txHash"></p>
    </div>
</div>
```

Add CSS for the modal and JavaScript to handle its display:

```css
.modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
    padding-top: 60px;
}
.modal-content {
    background-color: #fefefe;
    margin: 5% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 500px;
    border-radius: 8px;
    text-align: center;
}
.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}
.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
```

```javascript
// Show modal with transaction hash
document.getElementById('txHash').innerText = `Transaction Hash: ${tx.hash}`;
const modal = document.getElementById('myModal');
modal.style.display = 'block';

// Close the modal
document.querySelector('.close').onclick = function() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
};

// Close the modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('myModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};
```

## Significance of the Project

1. **Learning Opportunity**: This project helps in understanding how to deploy a smart contract on the Ethereum blockchain and interact with it using a web interface.
2. **Practical Application**: Provides a practical example of creating and transferring ERC20 tokens, which are widely used in various blockchain applications such as ICOs, token-based voting systems, and decentralized finance (DeFi) platforms.
3. **Integration with MetaMask**: Demonstrates how to integrate web applications with MetaMask, a popular Ethereum wallet, enabling secure and user-friendly interactions with the blockchain.
