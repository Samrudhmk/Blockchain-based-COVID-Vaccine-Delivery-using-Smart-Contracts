var SupplyChainStorageAbi = [
  {
    "constant": true,
    "inputs": [],
    "name": "lastAccess",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "caller",
        "type": "address"
      }
    ],
    "name": "AuthorizedCaller",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "caller",
        "type": "address"
      }
    ],
    "name": "DeAuthorizedCaller",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "previousOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipRenounced",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_caller",
        "type": "address"
      }
    ],
    "name": "authorizeCaller",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_caller",
        "type": "address"
      }
    ],
    "name": "deAuthorizeCaller",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_userAddress",
        "type": "address"
      }
    ],
    "name": "getUserRole",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_batchNo",
        "type": "address"
      }
    ],
    "name": "getNextAction",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_userAddress",
        "type": "address"
      },
      {
        "name": "_name",
        "type": "string"
      },
      {
        "name": "_contactNo",
        "type": "string"
      },
      {
        "name": "_role",
        "type": "string"
      },
      {
        "name": "_isActive",
        "type": "bool"
      },
      {
        "name": "_profileHash",
        "type": "string"
      }
    ],
    "name": "setUser",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_userAddress",
        "type": "address"
      }
    ],
    "name": "getUser",
    "outputs": [
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "contactNo",
        "type": "string"
      },
      {
        "name": "role",
        "type": "string"
      },
      {
        "name": "isActive",
        "type": "bool"
      },
      {
        "name": "profileHash",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_batchNo",
        "type": "address"
      }
    ],
    "name": "getBasicDetails",
    "outputs": [
      {
        "name": "batchDescription",
        "type": "string"
      },
      {
        "name": "quantity",
        "type": "uint256"
      },
      {
        "name": "supplierAddress",
        "type": "string"
      },
      {
        "name": "manufacturerAddress",
        "type": "string"
      },
      {
        "name": "wholesalerAddress",
        "type": "string"
      },
      {
        "name": "distributerAddress",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_batchDescription",
        "type": "string"
      },
      {
        "name": "_quantity",
        "type": "uint256"
      },
      {
        "name": "_supplierAddress",
        "type": "string"
      },
      {
        "name": "_manufacturerAddress",
        "type": "string"
      },
      {
        "name": "_wholesalerAddress",
        "type": "string"
      },
      {
        "name": "_distributerAddress",
        "type": "string"
      }
    ],
    "name": "setBasicDetails",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "batchNo",
        "type": "address"
      },
      {
        "name": "_rawMaterials",
        "type": "string"
      },
      {
        "name": "_description",
        "type": "string"
      },
      {
        "name": "_quantity",
        "type": "uint256"
      },
      {
        "name": "_shipperName",
        "type": "string"
      },
      {
        "name": "_recieverAddress",
        "type": "string"
      },
      {
        "name": "_receiverName",
        "type": "string"
      },
      {
        "name": "_cost",
        "type": "uint256"
      }
    ],
    "name": "setSupplierData",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "batchNo",
        "type": "address"
      }
    ],
    "name": "getSupplierData",
    "outputs": [
      {
        "name": "rawMaterials",
        "type": "string"
      },
      {
        "name": "description",
        "type": "string"
      },
      {
        "name": "quantity",
        "type": "uint256"
      },
      {
        "name": "shipperName",
        "type": "string"
      },
      {
        "name": "recieverAddress",
        "type": "string"
      },
      {
        "name": "receiverName",
        "type": "string"
      },
      {
        "name": "dispatchDateTime",
        "type": "uint256"
      },
      {
        "name": "cost",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "batchNo",
        "type": "address"
      },
      {
        "name": "_description",
        "type": "string"
      },
      {
        "name": "_quantity",
        "type": "uint256"
      },
      {
        "name": "_shipperName",
        "type": "string"
      },
      {
        "name": "_recieverAddress",
        "type": "string"
      },
      {
        "name": "_receiverName",
        "type": "string"
      },
      {
        "name": "_cost",
        "type": "uint256"
      }
    ],
    "name": "setManufacturerData",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "batchNo",
        "type": "address"
      }
    ],
    "name": "getManufacturerData",
    "outputs": [
      {
        "name": "description",
        "type": "string"
      },
      {
        "name": "quantity",
        "type": "uint256"
      },
      {
        "name": "shipperName",
        "type": "string"
      },
      {
        "name": "recieverAddress",
        "type": "string"
      },
      {
        "name": "receiverName",
        "type": "string"
      },
      {
        "name": "dispatchDateTime",
        "type": "uint256"
      },
      {
        "name": "cost",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "batchNo",
        "type": "address"
      },
      {
        "name": "_description",
        "type": "string"
      },
      {
        "name": "_quantity",
        "type": "uint256"
      },
      {
        "name": "_receivedDateTime",
        "type": "uint256"
      },
      {
        "name": "_shipperName",
        "type": "string"
      },
      {
        "name": "_recieverAddress",
        "type": "string"
      },
      {
        "name": "_receiverName",
        "type": "string"
      },
      {
        "name": "_cost",
        "type": "uint256"
      }
    ],
    "name": "setWholesalerData",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "batchNo",
        "type": "address"
      }
    ],
    "name": "getWholesalerData",
    "outputs": [
      {
        "name": "description",
        "type": "string"
      },
      {
        "name": "quantity",
        "type": "uint256"
      },
      {
        "name": "receivedDateTime",
        "type": "uint256"
      },
      {
        "name": "shipperName",
        "type": "string"
      },
      {
        "name": "recieverAddress",
        "type": "string"
      },
      {
        "name": "receiverName",
        "type": "string"
      },
      {
        "name": "dispatchDateTime",
        "type": "uint256"
      },
      {
        "name": "cost",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "batchNo",
        "type": "address"
      },
      {
        "name": "_description",
        "type": "string"
      },
      {
        "name": "_quantity",
        "type": "uint256"
      },
      {
        "name": "_receivedDateTime",
        "type": "uint256"
      },
      {
        "name": "_shipperName",
        "type": "string"
      },
      {
        "name": "_recieverAddress",
        "type": "string"
      },
      {
        "name": "_receiverName",
        "type": "string"
      },
      {
        "name": "_cost",
        "type": "uint256"
      }
    ],
    "name": "setDistributerData",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "batchNo",
        "type": "address"
      }
    ],
    "name": "getDistributerData",
    "outputs": [
      {
        "name": "description",
        "type": "string"
      },
      {
        "name": "quantity",
        "type": "uint256"
      },
      {
        "name": "receivedDateTime",
        "type": "uint256"
      },
      {
        "name": "shipperName",
        "type": "string"
      },
      {
        "name": "recieverAddress",
        "type": "string"
      },
      {
        "name": "receiverName",
        "type": "string"
      },
      {
        "name": "dispatchDateTime",
        "type": "uint256"
      },
      {
        "name": "cost",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "batchNo",
        "type": "address"
      },
      {
        "name": "_quantityRecieved",
        "type": "uint256"
      },
      {
        "name": "_description",
        "type": "string"
      },
      {
        "name": "_arrivalDateTime",
        "type": "uint256"
      },
      {
        "name": "_cost",
        "type": "uint256"
      },
      {
        "name": "_senderAddress",
        "type": "string"
      }
    ],
    "name": "setPharmaData",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "batchNo",
        "type": "address"
      }
    ],
    "name": "getPharmaData",
    "outputs": [
      {
        "name": "quantityRecieved",
        "type": "uint256"
      },
      {
        "name": "description",
        "type": "string"
      },
      {
        "name": "arrivalDateTime",
        "type": "uint256"
      },
      {
        "name": "cost",
        "type": "uint256"
      },
      {
        "name": "senderAddress",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]