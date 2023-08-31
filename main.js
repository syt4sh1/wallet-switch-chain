// Import necessary libraries and dependencies
import Web3 from 'web3';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Fortmatic from 'fortmatic';
import { Network } from '@ethersproject/networks';

// Initialize the application
const app = async () => {
  const switchChainButton = document.getElementById('switchChainButton');
  const switchWalletButton = document.getElementById('switchWalletButton');
  const accountDisplay = document.getElementById('accountDisplay');
  const networkDisplay = document.getElementById('networkDisplay');

  let web3;
  let selectedChainId;
  let selectedAccount;

  // Function to connect to a wallet provider
  const connectWallet = async () => {
    try {
      // Check if WalletConnect is available
      if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
      } else {
        // Fallback to Fortmatic if WalletConnect is not available
        const fm = new Fortmatic('<YOUR_FORTMATIC_API_KEY>');
        await fm.user.login();
        web3 = new Web3(fm.getProvider());
      }

      // Get selected chain ID and account
      selectedChainId = await web3.eth.getChainId();
      selectedAccount = (await web3.eth.getAccounts())[0];

      // Display account and network information
      updateAccountInfo();
      await updateNetworkInfo();

      // Set up listeners for account and chain changes
      window.ethereum.on('accountsChanged', updateAccountInfo);
      window.ethereum.on('chainChanged', updateNetworkInfo);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  // Function to switch to a different chain
  const switchChain = async (chainId) => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
    } catch (error) {
      console.error('Error switching chain:', error);
    }
  };

  // Update account information
  const updateAccountInfo = async () => {
    selectedAccount = (await web3.eth.getAccounts())[0];
    accountDisplay.textContent = selectedAccount;
  };

  // Update network information
  const updateNetworkInfo = async () => {
    const chainId = await web3.eth.getChainId();
    const network = Network(chainId);
    networkDisplay.textContent = network.name;
  };

  // Set up event listeners
  switchWalletButton.addEventListener('click', connectWallet);
  switchChainButton.addEventListener('click', () => switchChain(42)); // Switch to the desired chain ID

  // Initial wallet connection
  if (window.ethereum) {
    await connectWallet();
  }
};

// Initialize the application
app();
