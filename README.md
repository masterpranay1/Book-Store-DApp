# Decentralized Book Store Management System

![Ethereum Smart Contract](https://img.shields.io/badge/Ethereum%20Smart%20Contract-Yes-success.svg)
![MetaMask](https://img.shields.io/badge/MetaMask-Ready-blue.svg)
![Hardhat](https://img.shields.io/badge/Hardhat-Ready-yellow.svg)
![Next.js](https://img.shields.io/badge/Next.js-13.0.0-blueviolet.svg)


This project is a Book Store Management System built using Next.js, Daisy UI, Hardhat, and MetaMask. It allows users to interact with the Ethereum blockchain and the BookStore smart contract to add books to the catalog and purchase books using Ether.

## Description

This Book Store Management System is a decentralized application (DApp) that utilizes Next.js as the frontend framework, Daisy UI for user interface components, Hardhat for smart contract development and testing, and MetaMask as the Ethereum wallet provider. The DApp enables users to perform two main functions:

1. Add Books: The owner of the smart contract (the bookstore owner) can add new books to the catalog by providing the book title, author, price, and initial stock.

2. Purchase Books: Users can purchase books from the catalog by specifying the book ID and the desired quantity. The purchase is made using Ether, and the corresponding amount is transferred to the smart contract. If the transaction is successful, the user receives the purchased books.

## Getting Started

### Prerequisites

To run this Book Store Management System locally, you need the following installed:

1. Node.js (https://nodejs.org) - Make sure to install Node.js LTS version or later.
2. MetaMask extension (https://metamask.io) - Set up an Ethereum wallet with MetaMask.
3. Hardhat (https://hardhat.org) - Install Hardhat to compile and deploy the smart contract.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/masterpranay1/Book-Store-DApp.git
cd Book-Store-DApp
```

2. Install dependencies:

```bash
npm install
```


### Smart Contract Deployment

To deploy the BookStore smart contract, you can use the following command:

```bash
npx hardhat run --network localhost scripts/deploy.ts
```

Explanation:
- `npx`: This is a package runner tool that comes with npm and is used to run packages from the command line.
- `hardhat`: This is the command to execute Hardhat tasks, such as compiling and deploying smart contracts.
- `run`: This sub-command is used to execute a custom script.
- `--network localhost`: This flag specifies the network you want to deploy the smart contract to. In this case, you are deploying to the local development network (localhost).
- `scripts/deploy.ts`: This is the path to the TypeScript script responsible for deploying the smart contract.

Ensure that you have set up your Hardhat environment and configured the local development network correctly in your `hardhat.config.ts` file before running the deployment command.

### Running the Next.js Application

1. Start the Next.js development server:

```bash
npm run dev
```

2. Open your browser and navigate to `http://localhost:3000` to access the Book Store Management System.

### Usage

1. Adding a Book:

   - Connect your MetaMask wallet to the application.
   - Ensure you are logged in as the owner of the smart contract (you can specify the owner during smart contract deployment).
   - Fill in the book details (title, author, price, stock) in the provided form fields.
   - Click the "Add Book" button to add the book to the catalog.

2. Purchasing a Book:

   - Connect your MetaMask wallet to the application.
   - Provide the book ID and the quantity you wish to purchase in the appropriate form fields.
   - Click the "Purchase" button to initiate the transaction and send Ether to the smart contract.
   - Confirm the transaction in MetaMask to complete the purchase.

3. Get a Book

    - Connect your MetaMask wallet to the   application.
    - Provide the book ID
    - Click the "Get Book" button to initiate the transaction and get the book details.


## Authors

Pranay Raj  
[Linkedin](https://www.linkedin.com/in/masterpranay/)
