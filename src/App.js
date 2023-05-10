import React, { useState } from 'react';
import Web3 from 'web3';

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const handleConnectMetamask = async () => {
    if (!window.ethereum) {
      alert('Please install Metamask to connect to Ethereum network. Download Metamask at https://metamask.io/download/');
      return;
    }
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(window.ethereum);
      setWeb3(web3);
      const accounts = await web3.eth.getAccounts();
      setAccounts(accounts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisconnectMetamask = () => {
    setWeb3(null);
    setAccounts([]);
    console.log('Disconnected from Metamask!');
  };

  const handleSendTransaction = async () => {
    if (web3) {
      try {
        const tx = {
          from: accounts[0],
          to: recipient,
          value: web3.utils.toWei(amount.toString(), 'ether'),
        };
        const result = await web3.eth.sendTransaction(tx);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      {web3 ? (
        <div>
          <p>Connected to Metamask</p>
          <p>Accounts: {accounts.join(', ')}</p>
          <button onClick={handleDisconnectMetamask}>Disconnect Metamask</button>
          <br />
          <br />
          <input
            type="text"
            placeholder="Recipient Address"
            value={recipient}
            onChange={(event) => setRecipient(event.target.value)}
          />
          <br />
          <br />
          <input
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
          <br />
          <br />
          <button onClick={handleSendTransaction}>Send Transaction</button>
        </div>
      ) : (
        <div>
          <p>Not connected to Metamask</p>
          <button onClick={handleConnectMetamask}>Connect Metamask</button>
        </div>
      )}
    </div>
  );
}

export default App;
