# Blockchain-based-COVID-Vaccine-Delivery-using-Smart-Contracts
A blockchain is a growing list of records called blocks, that are linked using cryptography. Each block contains a timestamp, transaction data, cryptographic hash of the previous block, which makes it immutable. A Smart contract is a computer program which is automatically executed according to an agreement. In Traditional vaccine delivery systems, vaccine delivery information is not visible to all the entities in the supply chain, Thereby are prone to data tampering. Therefore, transparency is the biggest concern in this systems. This project is a blockchain based transparent vaccine delivery system using smart contracts which stores the data on the Blockchain Network and simplifies the Vaccine Data updating process using  Smart Contracts.

Architecture Diagram:
![Architecture diagram](https://user-images.githubusercontent.com/47571640/126041711-c832e50e-7d6c-4fc4-b347-8cd08e07a1ad.png)

In this Application, There are 6 Entities namely,

1. Admin - Creates the User and assigns them the role.
2. Vaccine Raw Material Supplier- Updates the vaccine raw material data into the Blockchain network.
3. Vaccine Manufacturer - Updates the Vaccine Manufacturing data.
4. Wholesaler - Updates the vaccine data once wholesaling is done.
5. Distributer - Updates the data after the distributing the vaccine packages to respective Pharmacy.
6. Pharma - Upon recieving the package, updates the Delivered Vaccine data into the Network which is visible to all the Entities.

The Vaccine data that is updated, is visible to all the entities in the Vaccine SupplyChain, therby provides Transparency. The updated data is immutable.

Smart Contracts are Written using Solidity v0.4.23

Software's Used:

1. Ethereum
2. Blockchain visualization (GUI) – Ganache v2.5.4
3. Blockchain Framework – Truffle IDE v5.0.0
4. Metamask (Ethereum wallet ) – Browser Extension
5. Smart Contract – Solidity
6. UI- JavaScript, HTML,CSS,PHP, Web3.js
7. XAMPP

Deployment Steps:
1. First Deploy the Smart Contracts which are located under the directory "Blockchain Vaccine supply chain (SMART CONTRACTS)/Contracts" using Truffle on Ganache.
2. Once the Smart contracts are deployed, copy the addresses of VaccineSupplyChain, SupplyChainUser, SupplyChainStorage Smart contracts.
3. Open "Blockchain vaccine Supply Chain (UI)/js/app/app.js" and copy paste the above copied smart contract addresses on the line 5,6,7 respectively.
4. Change the Admin wallet adress in Line no. 11 with the account address which was used to deploy the smart contracts.
5. Paste the Blockchain vaccine Supply Chain (UI) folder under "XAMPP/htdocs" where you have installed the XAMPP software and run Apache local server using XAMPP.
6. Navigate to "Blockchain vaccine Supply Chain (UI)" folder from the browser and import the Admin account into Metamask.
7. Login as Admin and Create Users, Assign roles accordingly, Create batch.
8. Once users are created, login as users (Entities on the Vaccine supplyChain).
