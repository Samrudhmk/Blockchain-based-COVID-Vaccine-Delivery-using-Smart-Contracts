var SupplyChainStorage = artifacts.require("./SupplyChainStorage");
var VaccineSupplyChain = artifacts.require("./VaccineSupplyChain");
var SupplyChainUser = artifacts.require("./SupplyChainUser");


module.exports = function(deployer){
	deployer.deploy(SupplyChainStorage)
	.then(()=>{
		return deployer.deploy(VaccineSupplyChain,SupplyChainStorage.address);
	})
	.then(()=>{
		return deployer.deploy(SupplyChainUser,SupplyChainStorage.address);
	})
	.then(()=>{
   		return SupplyChainStorage.deployed();
    }).then(async function(instance){
		await instance.authorizeCaller(VaccineSupplyChain.address); 
		await instance.authorizeCaller(SupplyChainUser.address);
		return instance;
	})
	.catch(function(error)
	{
		console.log(error);
	});
};



