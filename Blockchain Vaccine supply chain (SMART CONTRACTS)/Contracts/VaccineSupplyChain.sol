pragma solidity ^0.4.23;
import "./SupplyChainStorage.sol";
import "./Ownable.sol";

contract VaccineSupplyChain is Ownable
{
  
    event CreateVaccineBatch(address indexed user, address indexed batchNo);
    event DoneSupplying(address indexed user, address indexed batchNo);
    event DoneManufacturing(address indexed user, address indexed batchNo);
    event DoneWholesaling(address indexed user, address indexed batchNo);
    event DoneDistribution(address indexed user, address indexed batchNo);
    event DonePharmaDelivery(address indexed user, address indexed batchNo);

    
    /*Modifier*/
    modifier isValidPerformer(address batchNo, string role) {
    
        require(keccak256(supplyChainStorage.getUserRole(msg.sender)) == keccak256(role));
        require(keccak256(supplyChainStorage.getNextAction(batchNo)) == keccak256(role));
        _;
    }
    
    /* Storage Variables */    
    SupplyChainStorage supplyChainStorage;
    
    constructor(address _supplyChainAddress) public {
        supplyChainStorage = SupplyChainStorage(_supplyChainAddress);
    }
    
    
    /* Get Next Action  */    
    function getNextAction(address _batchNo) public view returns(string action)
    {
       (action) = supplyChainStorage.getNextAction(_batchNo);
       return (action);
    }
    

    /* get Batch Details */
    function getBasicDetails(address _batchNo) public view returns (string batchDescription,
                                                                    uint256 quantity,
                                                                    string supplierAddress,
                                                                    string manufacturerAddress,
                                                                    string wholesalerAddress,
                                                                    string distributerAddress) {
        /* Call Storage Contract */
        (batchDescription, quantity, supplierAddress, manufacturerAddress, wholesalerAddress, distributerAddress) = supplyChainStorage.getBasicDetails(_batchNo);  
        return (batchDescription, quantity, supplierAddress, manufacturerAddress, wholesalerAddress, distributerAddress);
    }

    /* Add Batch details */
    function addBasicDetails(string _batchDescription,
                             uint256 _quantity,
                             string _supplierAddress,
                             string _manufacturerAddress,
                             string _wholesalerAddress,
                             string _distributerAddress
                            ) public onlyOwner returns(address) {
    
        address batchNo = supplyChainStorage.setBasicDetails(_batchDescription,
                                                            _quantity,
                                                            _supplierAddress,
                                                            _manufacturerAddress,
                                                            _wholesalerAddress,
                                                            _distributerAddress);
        
        emit CreateVaccineBatch(msg.sender, batchNo); 
        
        return (batchNo);
    }                            
    
    /* get Supplier Deatails */
    function getSupplierData(address _batchNo) public view returns (string rawMaterials,string description,uint256 quantity,string shipperName,string recieverAddress,
                                                                    string receiverName,uint256 dispatchDateTime,uint256 cost) {
        /* Call Storage Contract */
        (rawMaterials, description, quantity, shipperName, recieverAddress, receiverName, dispatchDateTime, cost) = supplyChainStorage.getSupplierData(_batchNo);  
        return (rawMaterials, description, quantity, shipperName, recieverAddress, receiverName, dispatchDateTime, cost);
    }
    
    /* add Supplier data */
    function updateSupplierData(address _batchNo,
                                    string _rawMaterials,
                                    string _description,
                                    uint256 _quantity,
                                    string _shipperName,
                                    string _recieverAddress,
                                    string _receiverName,
                                    uint256 _cost) 
                                public isValidPerformer(_batchNo,'SUPPLIER') returns(bool) {
        /* Call Storage Contract */
        bool status = supplyChainStorage.setSupplierData(_batchNo, _rawMaterials, _description, _quantity, _shipperName, _recieverAddress, _receiverName, _cost);  
        emit DoneSupplying(msg.sender, _batchNo);
        return (status);
    }

    /* get manufacturer data */
    function getManufacturerData(address _batchNo) public view returns (string description,uint256 quantity,
                                                                                    string shipperName,
                                                                                    string recieverAddress,
                                                                                    string receiverName,
                                                                                    uint256 dispatchDateTime,
                                                                                    uint256 cost) {
        /* Call Storage Contract */
        (description, quantity, shipperName, recieverAddress, receiverName, dispatchDateTime, cost) =  supplyChainStorage.getManufacturerData(_batchNo);  
        return (description, quantity, shipperName, recieverAddress, receiverName, dispatchDateTime, cost);
    }
    
    /* Update Manufacturer Data */
    function updateManufacturerData(address _batchNo,
                                string _description,
                              uint256 _quantity,
                              string _shipperName,
                              string _recieverAddress,
                              string _receiverName,
                              uint256 _cost) 
                                public isValidPerformer(_batchNo,'MANUFACTURER') returns(bool) {
                                    
        /* Call Storage Contract */
        bool status = supplyChainStorage.setManufacturerData(_batchNo, _description, _quantity, _shipperName, _recieverAddress, _receiverName, _cost);  
        
        emit DoneManufacturing(msg.sender, _batchNo);
        return (status);
    }
    
    /* get Wholesaler Data */
    function getWholesalerData(address _batchNo) public view returns (string description,
                                                                                uint256 quantity,
                                                                                uint256 receivedDateTime,
                                                                                string shipperName,
                                                                                string recieverAddress,
                                                                                string receiverName,
                                                                                uint256 dispatchDateTime,
                                                                                uint256 cost) {
        /* Call Storage Contract */
       (description,
        quantity,
        receivedDateTime,
        shipperName,
        recieverAddress,
        receiverName,
        dispatchDateTime,
        cost) =  supplyChainStorage.getWholesalerData(_batchNo);  
        
        return (description,
        quantity,
        receivedDateTime,
        shipperName,
        recieverAddress,
        receiverName,
        dispatchDateTime,
        cost);
    }
    
    /* update Wholesaler Data */
    function updateWholesalerData(address _batchNo,
                                string _description,
                            uint256 _quantity,
                            uint256 _receivedDateTime,
                            string _shipperName,
                            string _recieverAddress,
                            string _receiverName,
                            uint256 _cost) 
                            public isValidPerformer(_batchNo,'WHOLESALER') returns(bool) {
                                    
        /* Call Storage Contract */
        bool status = supplyChainStorage.setWholesalerData(_batchNo, _description, _quantity, _receivedDateTime,_shipperName, _recieverAddress,_receiverName, _cost);  
        
        emit DoneWholesaling(msg.sender, _batchNo);
        return (status);
    }
    
    /* get Distributor data */
    function getDistributerData(address _batchNo) public view returns (string description,
                                                                                uint256 quantity,
                                                                                uint256 receivedDateTime,
                                                                                string shipperName,
                                                                                string recieverAddress,
                                                                                string receiverName,
                                                                                uint256 dispatchDateTime,
                                                                                uint256 cost) {
        /* Call Storage Contract */
        (description,
         quantity,
         receivedDateTime,
         shipperName,
         recieverAddress,
         receiverName,
         dispatchDateTime,
         cost) =  supplyChainStorage.getDistributerData(_batchNo);  
         
         return (description,
         quantity,
         receivedDateTime,
         shipperName,
         recieverAddress,
         receiverName,
         dispatchDateTime,
         cost);
        
    }
    
    /* Update Distributer Data */
    function updateDistributerData(address _batchNo,
                                string _description,
                            uint256 _quantity,
                            uint256 _receivedDateTime,
                            string _shipperName,
                            string _recieverAddress,
                            string _receiverName,
                            uint256 _cost) 
                                public isValidPerformer(_batchNo,'DISTRIBUTER') returns(bool) {
                                    
        /* Call Storage Contract */
        bool status = supplyChainStorage.setDistributerData(_batchNo, _description, _quantity, _receivedDateTime, _shipperName,_recieverAddress,_receiverName,_cost);  
        
        emit DoneDistribution(msg.sender, _batchNo);
        return (status);
    }
    
    
    /* Get Pharma Data */
    function getPharmaData(address _batchNo) public view returns (uint256 quantityRecieved,
                                                                                string description,
                                                                                uint256 arrivalDateTime,
                                                                                uint256 cost,
                                                                                string senderAddress) {
        /* Call Storage Contract */
        (quantityRecieved,
         description,
         arrivalDateTime,
         cost,
         senderAddress
         ) =  supplyChainStorage.getPharmaData(_batchNo);  
         
         return (quantityRecieved,
         description,
         arrivalDateTime,
         cost,
         senderAddress);
 
    }
    
    /* Update Pharma Info*/
    function updatePharmaData(address _batchNo,
                              uint256 _quantityRecieved,
                            string _description,
                            uint256 _arrivalDateTime,
                            uint256 _cost,
                            string _senderAddress) public isValidPerformer(_batchNo,'PHARMA') returns(bool) {
                                    
        /* Call Storage Contract */
        bool status = supplyChainStorage.setPharmaData(_batchNo, 
                                                        _quantityRecieved, 
                                                        _description, 
                                                        _arrivalDateTime, 
                                                        _cost,
                                                        _senderAddress
                                                        );  
        
        emit DonePharmaDelivery(msg.sender, _batchNo);
        return (status);
    }
}
