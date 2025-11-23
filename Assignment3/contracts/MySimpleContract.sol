// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MySimpleContract {
    string public message;       
    uint256 public counter;      

    // Write function - allows user to set a new message
    function setMessage(string memory _msg) public {
        message = _msg;
    }

    // Read function - returns the current message
    function getMessage() public view returns (string memory) {
        return message;
    }

    // Write function - increases the counter by 1
    function incrementCounter() public {
        counter++;
    }

    // Read function - returns the current counter value
    function getCounter() public view returns (uint256) {
        return counter;
    }

    // Write function - resets both message and counter
    function reset() public {
        message = "";
        counter = 0;
    }
}
