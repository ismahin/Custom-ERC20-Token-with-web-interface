// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract customToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Taka", "TK") {
        _mint(msg.sender, initialSupply);
    }

    // Mint function to create new tokens
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
