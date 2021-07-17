pragma solidity ^0.4.23;

import "./SupplyChainStorageOwnable.sol";

contract SupplyChainStorage is SupplyChainStorageOwnable 
{
    
    address public lastAccess;
    constructor() public {
        authorizedCaller[msg.sender] = 1;
        emit AuthorizedCaller(msg.sender);
    }
    
    /* Events */
    event AuthorizedCaller(address caller);
    event DeAuthorizedCaller(address caller);
    
    /* Modifiers */
    modifier onlyAuthCaller(){
        lastAccess = msg.sender;
        require(authorizedCaller[msg.sender] == 1);
        _;
    }
    
    /* User Related */
    struct user {
        string name;
        string contactNo;
        bool isActive;
        string profileHash;
    } 
    
    mapping(address => user) userDetails;
    mapping(address => string) userRole;
    
    /* Caller Mapping */
    mapping(address => uint8) authorizedCaller;
    
  
    function authorizeCaller(address _caller) public onlyOwner returns(bool) 
    {
        authorizedCaller[_caller] = 1;
        emit AuthorizedCaller(_caller);
        return true;
    }
    
  
    function deAuthorizeCaller(address _caller) public onlyOwner returns(bool) 
    {
        authorizedCaller[_caller] = 0;
        emit DeAuthorizedCaller(_caller);
        return true;
    }
    
  
    /* Process Related */
     struct basicDetails {
        string batchDescription;
        uint256 quantity;
        string supplierAddress;
        string manufacturerAddress;
        string wholesalerAddress;
        string distributerAddress;
    }
    
    struct supplier {
        string rawMaterials;
        string description;
        uint256 quantity;
        string shipperName;
        string recieverAddress;
        string receiverName;
        uint256 dispatchDateTime;
        uint256 cost;
    }
    
    struct manufacturer {
        string description;
        uint256 quantity;
        string shipperName;
        string recieverAddress;
        string receiverName;
        uint256 dispatchDateTime;
        uint256 cost;
    }    
    
    struct wholesaler {
        string description;
        uint256 quantity;
        uint256 receivedDateTime;
        string shipperName;
        string recieverAddress;
        string receiverName;
        uint256 dispatchDateTime;
        uint256 cost;

    }
    
    struct distributer {
        string description;
        uint256 quantity;
        uint256 receivedDateTime;
        string shipperName;
        string recieverAddress;
        string receiverName;
        uint256 dispatchDateTime;
        uint256 cost;
    }
    
    struct pharma {
        uint256 quantityRecieved;
        string description;
        uint256 arrivalDateTime;
        uint256 cost;
        string senderAddress;
    }
    
    mapping (address => basicDetails) batchBasicDetails;
    mapping (address => supplier) batchSupplier;
    mapping (address => manufacturer) batchManufacturer;
    mapping (address => wholesaler) batchWholesaler;
    mapping (address => distributer) batchDistributer;
    mapping (address => pharma) batchPharma;
    mapping (address => string) nextAction;
    
    /*Initialize struct pointer*/
    user userDetail;
    basicDetails basicDetailsData;
    supplier supplierData;
    manufacturer manufacturerData;
    wholesaler wholesalerData;
    distributer distributerData;
    pharma pharmaData; 
    
    
    
    /* Get User Role */
    function getUserRole(address _userAddress) public onlyAuthCaller view returns(string)
    {
        return userRole[_userAddress];
    }
    
     /* Get Next Action  */    
    function getNextAction(address _batchNo) public onlyAuthCaller view returns(string)
    {
        return nextAction[_batchNo];
    }  

    /*set user details*/
    function setUser(address _userAddress,
                     string _name, 
                     string _contactNo, 
                     string _role, 
                      bool _isActive,
                     string _profileHash) public onlyAuthCaller returns(bool){
        
        /*store data into struct*/
        userDetail.name = _name;
        userDetail.contactNo = _contactNo;
         userDetail.isActive = _isActive;
        userDetail.profileHash = _profileHash;
        
        /*store data into mapping*/
        userDetails[_userAddress] = userDetail;
        userRole[_userAddress] = _role;
        
        return true;
    }  
    
    /*get user details*/
    function getUser(address _userAddress) public onlyAuthCaller view returns(string name, 
                                                                    string contactNo, 
                                                                    string role,
                                                                    bool isActive, 
                                                                    string profileHash
                                                                ){

        /*Getting value from struct*/
        user memory tmpData = userDetails[_userAddress];
                                                                     
        return (tmpData.name, tmpData.contactNo, userRole[_userAddress], tmpData.isActive, tmpData.profileHash);
    }
    
    /*get batch basicDetails*/
    function getBasicDetails(address _batchNo) public onlyAuthCaller view returns(string batchDescription,
                            uint256 quantity,
                            string supplierAddress,
                            string manufacturerAddress,
                            string wholesalerAddress,
                            string distributerAddress) {
        
        basicDetails memory tmpData = batchBasicDetails[_batchNo];
        
        return (tmpData.batchDescription,tmpData.quantity,tmpData.supplierAddress,tmpData.manufacturerAddress,tmpData.wholesalerAddress,tmpData.distributerAddress);
    }

     /*set batch basicDetails*/
    function setBasicDetails(string _batchDescription,
                             uint256 _quantity,
                             string _supplierAddress,
                             string _manufacturerAddress,
                             string _wholesalerAddress,
                             string _distributerAddress
                            ) public onlyAuthCaller returns(address) {
        
        uint tmpData = uint(keccak256(msg.sender, now));
        address batchNo = address(tmpData);
        
        basicDetailsData.batchDescription = _batchDescription;
        basicDetailsData.quantity = _quantity;
        basicDetailsData.supplierAddress = _supplierAddress;
        basicDetailsData.manufacturerAddress = _manufacturerAddress;
        basicDetailsData.wholesalerAddress = _wholesalerAddress;
        basicDetailsData.distributerAddress = _distributerAddress;
        batchBasicDetails[batchNo] = basicDetailsData;
        
        nextAction[batchNo] = 'SUPPLIER';   
        return batchNo;
    }   

    /*set supplier data*/
    function setSupplierData(address batchNo,
                                    string _rawMaterials,
                                    string _description,
                                    uint256 _quantity,
                                    string _shipperName,
                                    string _recieverAddress,
                                    string _receiverName,
                                    uint256 _cost) public onlyAuthCaller returns(bool){
        supplierData.rawMaterials = _rawMaterials;
        supplierData.description = _description;
        supplierData.quantity = _quantity;
        supplierData.shipperName=_shipperName;
        supplierData.recieverAddress=_recieverAddress;
        supplierData.receiverName=_receiverName;
        supplierData.dispatchDateTime=now;
        supplierData.cost=_cost;
        
        batchSupplier[batchNo] = supplierData;
        
        nextAction[batchNo] = 'MANUFACTURER'; 
        
        return true;
    }

    /*get supplier data*/
    function getSupplierData(address batchNo) public onlyAuthCaller view returns (string rawMaterials,string description,uint256 quantity,string shipperName,string recieverAddress,
                                                                                        string receiverName,uint256 dispatchDateTime,uint256 cost){
        
        supplier memory tmpData = batchSupplier[batchNo];
        return (tmpData.rawMaterials, tmpData.description, tmpData.quantity, tmpData.shipperName, tmpData.recieverAddress, tmpData.receiverName, tmpData.dispatchDateTime, tmpData.cost);
    }

    /*set Manufacturer data*/
    function setManufacturerData(address batchNo,
                              string _description,
                              uint256 _quantity,
                              string _shipperName,
                              string _recieverAddress,
                              string _receiverName,
                              uint256 _cost) public onlyAuthCaller returns(bool){
        manufacturerData.description = _description;
        manufacturerData.quantity = _quantity;
        manufacturerData.shipperName = _shipperName;
        manufacturerData.recieverAddress=_recieverAddress;
        manufacturerData.receiverName=_receiverName;
        manufacturerData.dispatchDateTime= now;
        manufacturerData.cost= _cost;
        batchManufacturer[batchNo] = manufacturerData;
        
        nextAction[batchNo] = 'WHOLESALER'; 
        
        return true;
    } 
    /*get Manufacturer data*/
    function getManufacturerData(address batchNo) public onlyAuthCaller view returns(string description,uint256 quantity,
                                                                                    string shipperName,
                                                                                    string recieverAddress,
                                                                                    string receiverName,
                                                                                    uint256 dispatchDateTime,
                                                                                    uint256 cost){
        
        manufacturer memory tmpData = batchManufacturer[batchNo];
        return (tmpData.description, tmpData.quantity, tmpData.shipperName, tmpData.recieverAddress, tmpData.receiverName, tmpData.dispatchDateTime, tmpData.cost);
    }

    /*set Wholesaler data*/
    function setWholesalerData(address batchNo,
                            string _description,
                            uint256 _quantity,
                            uint256 _receivedDateTime,
                            string _shipperName,
                            string _recieverAddress,
                            string _receiverName,
                            uint256 _cost) public onlyAuthCaller returns(bool){
        
        wholesalerData.description = _description;
        wholesalerData.quantity = _quantity;
        wholesalerData.receivedDateTime = _receivedDateTime;
        wholesalerData.shipperName = _shipperName;
        wholesalerData.recieverAddress = _recieverAddress;
        wholesalerData.receiverName = _receiverName;
        wholesalerData.dispatchDateTime = now;
        wholesalerData.cost= _cost;
        batchWholesaler[batchNo] = wholesalerData;
        
        nextAction[batchNo] = 'DISTRIBUTER'; 
        
        return true;
    }
    /*get Wholesaler data*/
    function getWholesalerData(address batchNo) public onlyAuthCaller view returns(string description,
                                                                                uint256 quantity,
                                                                                uint256 receivedDateTime,
                                                                                string shipperName,
                                                                                string recieverAddress,
                                                                                string receiverName,
                                                                                uint256 dispatchDateTime,
                                                                                uint256 cost){
        
        
        wholesaler memory tmpData = batchWholesaler[batchNo];
        
        return (tmpData.description, 
                tmpData.quantity, 
                tmpData.receivedDateTime, 
                tmpData.shipperName, 
                tmpData.recieverAddress, 
                tmpData.receiverName, 
                tmpData.dispatchDateTime,
                tmpData.cost);
           
    }

    /*set Distributer data*/
    function setDistributerData(address batchNo,
                            string _description,
                            uint256 _quantity,
                            uint256 _receivedDateTime,
                            string _shipperName,
                            string _recieverAddress,
                            string _receiverName,
                            uint256 _cost) public onlyAuthCaller returns(bool){
        
        distributerData.description= _description;
        distributerData.quantity = _quantity;
        distributerData.receivedDateTime = _receivedDateTime;
        distributerData.shipperName = _shipperName;
        distributerData.recieverAddress = _recieverAddress;
        distributerData.receiverName = _receiverName;
        distributerData.dispatchDateTime = now;
        distributerData.cost = _cost;
        
        batchDistributer[batchNo] = distributerData;
        
        nextAction[batchNo] = 'PHARMA'; 
        
        return true;
    }
    /*get Distributer data*/
    function getDistributerData(address batchNo) public onlyAuthCaller view returns(string description,
                                                                                uint256 quantity,
                                                                                uint256 receivedDateTime,
                                                                                string shipperName,
                                                                                string recieverAddress,
                                                                                string receiverName,
                                                                                uint256 dispatchDateTime,
                                                                                uint256 cost){
        
        distributer memory tmpData = batchDistributer[batchNo];
        
        
        return (tmpData.description, 
                tmpData.quantity, 
                tmpData.receivedDateTime, 
                tmpData.shipperName, 
                tmpData.recieverAddress,
                tmpData.receiverName,
                tmpData.dispatchDateTime,
                tmpData.cost);  
    }

    /*set Pharma data*/
    function setPharmaData(address batchNo,
                            uint256 _quantityRecieved,
                            string _description,
                            uint256 _arrivalDateTime,
                            uint256 _cost,
                            string _senderAddress) public onlyAuthCaller returns(bool){
        
        
        pharmaData.quantityRecieved = _quantityRecieved;
        pharmaData.description = _description;
        pharmaData.arrivalDateTime = _arrivalDateTime;
        pharmaData.cost = _cost;
        pharmaData.senderAddress = _senderAddress;
        
        batchPharma[batchNo] = pharmaData;
        
        nextAction[batchNo] = 'DONE'; 
        
        return true;
    }
    /*get Pharma data*/
    function getPharmaData( address batchNo) public onlyAuthCaller view returns(uint256 quantityRecieved,
                                                                                string description,
                                                                                uint256 arrivalDateTime,
                                                                                uint256 cost,
                                                                                string senderAddress){

        pharma memory tmpData = batchPharma[batchNo];
        
        return (
                tmpData.quantityRecieved, 
                tmpData.description, 
                tmpData.arrivalDateTime, 
                tmpData.cost,
                tmpData.senderAddress
                );
          
    }
  
}    
