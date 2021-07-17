var VaccineSupplyChainAbi = [
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
    "inputs": [
      {
        "name": "_supplyChainAddress",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "user",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "batchNo",
        "type": "address"
      }
    ],
    "name": "CreateVaccineBatch",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "user",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "batchNo",
        "type": "address"
      }
    ],
    "name": "DoneSupplying",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "user",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "batchNo",
        "type": "address"
      }
    ],
    "name": "DoneManufacturing",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "user",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "batchNo",
        "type": "address"
      }
    ],
    "name": "DoneWholesaling",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "user",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "batchNo",
        "type": "address"
      }
    ],
    "name": "DoneDistribution",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "user",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "batchNo",
        "type": "address"
      }
    ],
    "name": "DonePharmaDelivery",
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
        "name": "action",
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
    "name": "addBasicDetails",
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
    "constant": true,
    "inputs": [
      {
        "name": "_batchNo",
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
        "name": "_batchNo",
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
    "name": "updateSupplierData",
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
        "name": "_batchNo",
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
        "name": "_batchNo",
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
    "name": "updateManufacturerData",
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
        "name": "_batchNo",
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
        "name": "_batchNo",
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
    "name": "updateWholesalerData",
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
        "name": "_batchNo",
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
        "name": "_batchNo",
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
    "name": "updateDistributerData",
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
        "name": "_batchNo",
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
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_batchNo",
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
    "name": "updatePharmaData",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]