# MySimpleContract – Truffle DApp

## 📌 Overview  
This is a **simple Ethereum smart contract project** built using **Truffle framework**. The smart contract allows users to:

✔ Set a message  
✔ Retrieve message  
✔ Increment a counter  
✔ Reset the contract state  

A **frontend (HTML + JavaScript)** is also included to interact with the smart contract using **Web3.js**.

---

## 📁 Project Structure

```
Assignment3/
│── contracts/
│   ├── Migrations.sol
│   └── MySimpleContract.sol
│
│── migrations/
│   ├── 1_initial_migration.js
│   └── 2_deploy_contract.js
│
│── src/ (Frontend)
│   ├── index.html
│   └── app.js
│
│── build/
│   └── contracts/ (auto generated after compile)
│
│── truffle-config.js
│── package.json
│── README.md  ← YOU ARE HERE
```

---

## ⚙ Installation & Setup

### 1️⃣ Install Node.js & Git
Make sure **Node.js (v18)** is installed:
```sh
node -v
# should show v18.xx.xx
```

### 2️⃣ Install Truffle
```sh
npm install -g truffle
```

### 3️⃣ Install & Start Ganache
Download Ganache GUI OR use CLI:
```sh
ganache
# or ganache-cli
```

### 4️⃣ Initialize Project (if not already done)
```sh
truffle init
```

---

## 📜 Compile & Deploy Smart Contract

### 🔹 Compile
```sh
truffle compile
```

### 🔹 Migrate (Deploy on Ganache)
```sh
truffle migrate --reset
```

### 🔹 Console (optional)
```sh
truffle console
const instance = await MySimpleContract.deployed();
await instance.getMessage();
```

---

## 🌐 Frontend Setup

### Open `src/index.html` in Browser

Make sure Ganache is running and MetaMask is connected to **localhost:7545**.

1. Start a local server:
```sh
npx live-server src
```

2. Open browser → interact with buttons  
3. Each button calls a smart contract function

---

## 🧠 Smart Contract – `MySimpleContract.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MySimpleContract {
    string public message;
    uint256 public counter;

    constructor() {
        message = "Hello from constructor!";
        counter = 0;
    }

    function setMessage(string memory _msg) public {
        message = _msg;
    }

    function getMessage() public view returns (string memory) {
        return message;
    }

    function incrementCounter() public {
        counter++;
    }

    function getCounter() public view returns (uint256) {
        return counter;
    }

    function reset() public {
        message = "";
        counter = 0;
    }
}
```

---

## 🖥 Frontend Demo (HTML + JS)

### `src/index.html`
```html
<!DOCTYPE html>
<html>
<head>
  <title>MySimpleContract Frontend</title>
  <script src="https://cdn.jsdelivr.net/npm/web3/dist/web3.min.js"></script>
  <script src="app.js"></script>
</head>
<body>
  <h1>Interact With Smart Contract</h1>
  <button onclick="getMessage()">Get Message</button>
  <button onclick="setMessage()">Set Message</button>
  <button onclick="increment()">Increment Counter</button>
  <button onclick="getCounter()">Get Counter</button>
  <button onclick="reset()">Reset Contract</button>

  <p id="output"></p>
</body>
</html>
```

---

## 🧠 Notes & Common Errors

| Error | Solution |
|------|-----------|
| Invalid opcode during deploy | Check constructor & migration file |
| Web3 not loading | Check Ganache & MetaMask network |
| Contract not found | Delete `build/` folder & recompile |
| MetaMask error | Enable “Test networks” in settings |

---

## 🚀 Final Deployment (Optional)

To deploy on **Sepolia Testnet**:
1. Get RPC from **Alchemy / Infura**
2. Add network in `truffle-config.js`
3. Use HDWalletProvider
4. Run:
```sh
truffle migrate --network sepolia
```

---

## 🤝 Author  
**Name:** Hammad Ahsan  
**Assignment 3 – Decentralized Application**  
If you improve this project, add your name too! 😄

---

Let me know if you want:

✔ Screenshots added  
✔ Video demo script  
✔ PowerPoint for assignment  
✔ LIVE deployment on testnet  

🚀 *Ready for submission!*