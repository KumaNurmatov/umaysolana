# Umay

A decentralized application (dApp) built with Scaffold-ETH 2 for facilitating crypto investments in agricultural projects in Kyrgyzstan.

## 🌾 Project Overview

This platform connects cryptocurrency investors with agricultural opportunities in Kyrgyzstan, providing:

- **Transparent Investment**: Smart contract-based funding for agricultural projects
- **Tokenized Assets**: Agricultural projects represented as blockchain tokens
- **Direct Funding**: Remove intermediaries between investors and farmers
- **Progress Tracking**: Real-time updates on project milestones and returns
- **Community Governance**: Decentralized decision-making for platform improvements

## 🏗 Built With

- **Scaffold-ETH 2**: Ethereum development stack
- **Hardhat**: Smart contract development and testing
- **Next.js**: React-based frontend framework
- **RainbowKit**: Wallet connection interface
- **Wagmi**: React hooks for Ethereum
- **TypeScript**: Type-safe development

## 📁 Project Structure

```
umay/
├── packages/
│   ├── hardhat/          # Smart contracts and deployment
│   │   ├── contracts/    # Solidity smart contracts
│   │   ├── deploy/       # Deployment scripts
│   │   └── test/         # Contract tests
│   └── nextjs/           # Frontend application
│       ├── app/          # Next.js app directory
│       ├── components/   # React components
│       └── hooks/        # Custom React hooks
├── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.17.0
- Yarn package manager
- MetaMask or compatible Web3 wallet

### Installation

1. Clone and install dependencies:
```bash
yarn install
```

2. Start a local Ethereum network:
```bash
yarn chain
```

3. Deploy contracts (in a new terminal):
```bash
yarn deploy
```

4. Start the frontend:
```bash
yarn start
```

Visit `(https://umay.vercel.app/)` to interact with the dApp.

## 💡 Key Features

### For Investors
- Browse agricultural investment opportunities
- Invest using stable coins
- Track investment performance
- Transparent progress tracking
- Receive returns in stable coins

### For Project Owners (Farmers/Cooperatives)
- Raise fundings faster and easier
- Receive investments directly
- Update project progress

### Smart Contract Features
- **AgriProject.sol**: Manage individual agricultural projects
- **InvestmentPool.sol**: Handle investment deposits and distributions
- **TokenizedAsset.sol**: Represent agricultural projects as ERC-721 tokens
- **GovernanceToken.sol**: Enable platform governance

## 🧪 Testing

Run smart contract tests:
```bash
yarn hardhat:test
```

## 🌐 Deployment

### Testnet Deployment
```bash
yarn deploy --network sepolia
```

### Mainnet Deployment
```bash
yarn deploy --network mainnet
```

## 📝 Development Roadmap

- [ ] Core smart contract development
- [ ] Frontend investment interface
- [ ] Project listing and management
- [ ] Integration with stablecoins (USDT, USDC)
- [ ] KYC/AML compliance features
- [ ] Oracle integration for real-world data
- [ ] Testnet deployment
- [ ] Security audits
- [ ] Mainnet launch

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## 📄 License

MIT License

## 🔗 Links

- [Scaffold-ETH 2 Documentation](https://docs.scaffoldeth.io)
- [Hardhat Documentation](https://hardhat.org/docs)
- [Next.js Documentation](https://nextjs.org/docs)

## 📧 Contact

For questions or collaboration opportunities, please open an issue on GitHub.

---

Built with ❤️ for Kyrgyzstan's agricultural future
