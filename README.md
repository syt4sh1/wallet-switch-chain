# wallet-switch-chain

This is an example JavaScript application that demonstrates wallet switching and chain switching functionality using blockchain libraries and providers. It's designed to work with Ethereum-based networks.

## Getting Started

### Prerequisites

- Node.js and npm (Node Package Manager)
- An Ethereum wallet (such as MetaMask) or Fortmatic account

### Installation

1. Clone this repository:

```
git clone https://github.com/syt4sh1/wallet-switch-chain.git
cd wallet-switch-chain
```
2. Install dependencies:
```
npm install
```
3. Configure your Fortmatic API key:

Replace `<YOUR_FORTMATIC_API_KEY>` in the main.js file with your actual Fortmatic API key.

## Usage
Open the `index.html` file in your browser.

Click the `Connect Wallet` button to connect your wallet. The application will attempt to connect using WalletConnectProvider, and if not available, it will fall back to Fortmatic.

Once connected, your account address and the current network will be displayed.

Click the `Switch Chain` button to switch to a different Ethereum-based chain. The default chain ID is set to 42 in the example. You can modify the switchChain function call in the `main.js` to switch to your desired chain.
