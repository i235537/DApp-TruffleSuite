const CONTRACT_ADDRESS = ""; 
const ABI_JSON_PATH = "../build/contracts/MySimpleContract.json";

let provider, signer, contract;
const statusEl = document.getElementById("status");
const accountEl = document.getElementById("account");
const connectBtn = document.getElementById("connectBtn");
const currentMessageEl = document.getElementById("currentMessage");
const counterValueEl = document.getElementById("counterValue");
const messageInput = document.getElementById("messageInput");
const setMessageBtn = document.getElementById("setMessageBtn");
const incrementBtn = document.getElementById("incrementBtn");
const resetBtn = document.getElementById("resetBtn");

// Helper to show status
function setStatus(s) {
  statusEl.innerText = s || "";
}

// Load ABI then initialize (but only after user connects wallet)
async function loadAbiAndCreateContract() {
  try {
    const res = await fetch(ABI_JSON_PATH);
    if (!res.ok) throw new Error("Unable to fetch ABI from " + ABI_JSON_PATH);
    const json = await res.json();
    const abi = json.abi;

    if (!CONTRACT_ADDRESS) {
      setStatus("Please paste your deployed contract address into script.js (CONTRACT_ADDRESS).");
      return;
    }

    contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
    setStatus("Contract loaded.");
    await refreshUI();
  } catch (err) {
    console.error(err);
    setStatus("Error loading ABI: " + (err.message || err));
  }
}

async function connectMetaMask() {
  if (!window.ethereum) {
    alert("MetaMask not found. Install MetaMask and try again.");
    return;
  }
  try {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    const account = await signer.getAddress();
    accountEl.innerText = account;
    setStatus("Connected to MetaMask: " + account);
    connectBtn.disabled = true;
    await loadAbiAndCreateContract();
  } catch (err) {
    console.error(err);
    setStatus("Connection failed: " + (err.message || err));
  }
}

async function refreshUI() {
  if (!contract) return;
  try {
    const msg = await contract.getMessage();
    currentMessageEl.innerText = msg || "(empty)";
  } catch (err) {
    currentMessageEl.innerText = "Error";
    console.error(err);
  }

  try {
    const cnt = await contract.getCounter();
    counterValueEl.innerText = cnt.toString();
  } catch (err) {
    counterValueEl.innerText = "Error";
    console.error(err);
  }
}

async function handleSetMessage() {
  if (!contract) return alert("Contract not loaded.");
  const newMsg = messageInput.value.trim();
  if (!newMsg) return alert("Type a message first.");
  try {
    setStatus("Sending transaction to set message...");
    setMessageBtn.disabled = true;
    const tx = await contract.setMessage(newMsg);
    setStatus("Transaction sent (waiting confirmation) — hash: " + tx.hash);
    await tx.wait();
    setStatus("Transaction confirmed.");
    messageInput.value = "";
    await refreshUI();
  } catch (err) {
    console.error(err);
    setStatus("Transaction failed: " + (err.message || err));
  } finally {
    setMessageBtn.disabled = false;
  }
}

async function handleIncrement() {
  if (!contract) return alert("Contract not loaded.");
  try {
    setStatus("Sending increment transaction...");
    incrementBtn.disabled = true;
    const tx = await contract.incrementCounter();
    setStatus("Transaction sent — hash: " + tx.hash);
    await tx.wait();
    setStatus("Increment confirmed.");
    await refreshUI();
  } catch (err) {
    console.error(err);
    setStatus("Transaction failed: " + (err.message || err));
  } finally {
    incrementBtn.disabled = false;
  }
}

async function handleReset() {
  if (!contract) return alert("Contract not loaded.");
  if (!confirm("Reset message and counter to empty/0?")) return;
  try {
    setStatus("Sending reset transaction...");
    resetBtn.disabled = true;
    const tx = await contract.reset();
    setStatus("Transaction sent — hash: " + tx.hash);
    await tx.wait();
    setStatus("Reset confirmed.");
    await refreshUI();
  } catch (err) {
    console.error(err);
    setStatus("Transaction failed: " + (err.message || err));
  } finally {
    resetBtn.disabled = false;
  }
}

// wire events
connectBtn.onclick = connectMetaMask;
setMessageBtn.onclick = handleSetMessage;
incrementBtn.onclick = handleIncrement;
resetBtn.onclick = handleReset;
