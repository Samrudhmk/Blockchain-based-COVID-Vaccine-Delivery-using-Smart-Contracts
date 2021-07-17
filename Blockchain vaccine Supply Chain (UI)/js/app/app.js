	var globIcoAddress = {
		
		
		
		'VaccineMain': "0xb0679af418f21097ff84805b673c429027bfe6c0",
		'VaccineUser': "0x7d14f6ca5b6708682ed06f3a24a53ffd15750fc0",
		'Storage': "0xfc0db2e99fdd9702fd972c82c42e32227dde0fc6"
	};

	
	var globAdminAddress ="0xcaa370b9a665a5d85fff3e531819d93e8203c555";
	

	var globMainContract = false;
	var globUserContract = false;
	var globCoinbase = false;	
	var globUserData = [];


	window.addEventListener('load', function() 
	{  
		$("#storageContractAddress").html(globIcoAddress.Storage);
		$("#vaccineSupplychainContractAddress").html(globIcoAddress.VaccineMain);
		$("#userContractAddress").html(globIcoAddress.VaccineUser);


		if (typeof web3 !== 'undefined') 
		{
		  web3 = new Web3(web3.currentProvider);
		 
		} else {
		  // set the provider you want from Web3.providers
		  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
		}
		
		getCurrentAccountAddress((address)=>{
			/*  To Restrict User in Admin Section */
			var currentPath = window.location.pathname;
			var tmpStack = currentPath.split("/");
			var currentPanel = tmpStack.pop();

			if(currentPanel == "admin.php")
			{
				if(address != globAdminAddress){
					window.location = "index.php";
				}
			}
		});

		initContract();

		updateLoginAccountStatus();
		
		
	});

	function initContract()
	{
		globMainContract = new web3.eth.Contract(VaccineSupplyChainAbi,globIcoAddress.VaccineMain);	
		$(window).trigger("mainContractReady");

		globUserContract = new web3.eth.Contract(SupplyChainUserAbi,globIcoAddress.VaccineUser);	
		$(window).trigger("userContractReady");
	}

	function updateLoginAccountStatus(){

		web3.eth.getAccounts(function(err,accounts){

			if(err){
				console.log('An error occurred '+ err);
			}else if(accounts.length == 0){
				sweetAlert('Error', 'Please login to MetaMask..!', 'error');
				$("#currentUserAddress").html("0x0000000000000000000000000000000000000000");
			}else{
				initAccountDetails();
			}
		});
	}

	function initAccountDetails(){
		/*
		* Get Current wallet account address
		*/
		getCurrentAccountAddress((address)=>{
			globCoinbase = address;	
			$("#currentUserAddress").html(globCoinbase);	
			$(window).trigger("coinbaseReady");		
		});
	}


	function getCurrentAccountAddress(callback){
		callback = callback || false;

		web3.eth.getCoinbase()
		.then((_coinbase)=>{
			callback(_coinbase);
		})
		.catch((err)=>{
			if(callback){
				callback(0);
			}
		})
	}

	function getUserDetails(contractRef,userAddress,callback){
		callback = callback || false;

		contractRef.methods.getUser(userAddress).call()
		.then((result)=>{
			callback(result);
		})
		.catch((error)=>{
			sweetAlert("Error","Unable to get User Details","error");
			callback(0);
		});
	}

	function getBatchData(contractRef,batchNo,callback){

		if(batchNo == undefined)
		{
			callback(0);
			return;
		}

		callback = callback || false;

		contractRef.methods.getBasicDetails(batchNo).call()
		.then((result)=>{
			callback(result);
		})
		.catch((error)=>{
			sweetAlert("Error","Unable to get Vaccine Batch Details","error");
			callback(0);
		});
	}

	function getSupplierData(contractRef,batchNo,callback){

		if(batchNo == undefined)
		{
			callback(0);
			return;
		}


		callback = callback || false;

		contractRef.methods.getSupplierData(batchNo).call()
		.then((result)=>{
			callback(result);
		})
		.catch((error)=>{
			sweetAlert("Error","Unable to get Supplier Details","error");
			callback(0);
		});
	}

	function getManufacturerData(contractRef,batchNo,callback){

		if(batchNo == undefined)
		{
			callback(0);
			return;
		}


		callback = callback || false;

		contractRef.methods.getManufacturerData(batchNo).call()
		.then((result)=>{
			callback(result);
		})
		.catch((error)=>{
			sweetAlert("Error","Unable to get Manufacturer Details","error");
			callback(0);
		});
	}

	function getWholesalerData(contractRef,batchNo,callback){

		if(batchNo == undefined)
		{
			callback(0);
			return;
		}

		callback = callback || false;

		contractRef.methods.getWholesalerData(batchNo).call()
		.then((result)=>{
			callback(result);
		})
		.catch((error)=>{
			sweetAlert("Error","Unable to get Wholesaler Details","error");
			callback(0);
		});
	}

	function getDistributerData(contractRef,batchNo,callback){

		if(batchNo == undefined)
		{
			callback(0);
			return;
		}


		callback = callback || false;

		contractRef.methods.getDistributerData(batchNo).call()
		.then((result)=>{
			callback(result);
		})
		.catch((error)=>{
			sweetAlert("Error","Unable to get Distributer Details","error");
			callback(0);
		});
	}

	function getPharmaData(contractRef,batchNo,callback){

		if(batchNo == undefined)
		{
			callback(0);
			return;
		}

		callback = callback || false;

		contractRef.methods.getPharmaData(batchNo).call()
		.then((result)=>{
			callback(result);
		})
		.catch((error)=>{
			sweetAlert("Error","Unable to get Pharmacy Details","error");
			callback(0);
		});
	}

	function getUserEvents(contractRef)
	{
	    contractRef.getPastEvents('UserUpdate',{
	        fromBlock: 0 
	    }).then(function (events){

	        $("#tblUser").DataTable().destroy();
	        $("#tblUser tbody").html(buildUserDetails(events));
	        $("#tblUser").DataTable({
	        	"displayLength": 3,
	        	"order": [[ 1, "asc" ]]
	        });
	    }).catch((err)=>{
	    	console.log(err);
	    });
	}

	function buildUserDetails(events){
		
		var filteredUser = {};
		var isNewUser = false;

		/*filtering latest updated user record*/
		$(events).each(function(index,event){

			if(filteredUser[event.returnValues.user] == undefined)
			{
				filteredUser[event.returnValues.user] = {};
				filteredUser[event.returnValues.user].address = event.address;
				filteredUser[event.returnValues.user].role = event.returnValues.role;
				filteredUser[event.returnValues.user].user = event.returnValues.user;
				filteredUser[event.returnValues.user].name = event.returnValues.name;
				filteredUser[event.returnValues.user].contactNo = event.returnValues.contactNo;
				filteredUser[event.returnValues.user].blockNumber = event.blockNumber;
			}
			else if(filteredUser[event.returnValues.user].blockNumber < event.blockNumber)
			{
				filteredUser[event.returnValues.user].address = event.address;
				filteredUser[event.returnValues.user].role = event.returnValues.role;
				filteredUser[event.returnValues.user].user = event.returnValues.user;
				filteredUser[event.returnValues.user].name = event.returnValues.name;
				filteredUser[event.returnValues.user].contactNo = event.returnValues.contactNo;
				filteredUser[event.returnValues.user].blockNumber = event.blockNumber;
			}
		});

		var builtUser = [];
		for(tmpUser in filteredUser)
		{
			builtUser.push(filteredUser[tmpUser]);
		}

		/*build user Table*/
		$("#totalUsers").html(builtUser.length);
		return buildUserTable(builtUser);
	}

	function buildUserTable(globUserData){

		var tbody = "";
		var roleClass = "";

		$(globUserData).each(function(index,data){

			var role = data.role;	

			if(role == 'SUPPLIER'){
				roleClass = "info";
			}else if(role == 'MANUFACTURER'){
				roleClass = "success";	
			}else if(role == 'WHOLESALER'){
				roleClass = "warning";
			}else if(role == 'DISTRIBUTER'){
				roleClass = "danger";
			}else if(role == 'PHARMA'){
				roleClass = "primary";
			}

			tbody += `<tr>
	                        <td>`+data.user+`</td>
	                        <td>`+data.name+`</td>
	                        <td>`+data.contactNo+`</td>
	                        <td><span class="label label-`+roleClass+` font-weight-100">`+role+`</span></td>
	                        <td><a href="javascript:void(0);" class="text-inverse p-r-10" data-toggle="tooltip" data-userAddress="`+data.user+`" onclick="openEditUser(this);" title="Edit"><i class="ti-marker-alt"></i></a> </td>
	                  </tr>`;
		});	

		return tbody;
	}

	function handleTransactionResponse(txHash,finalMessage)
	{
		
	    sweetAlert("Success", "success");

	   
	    $("#divOngoingTransaction").fadeIn();
	    /*scroll to top*/
	    $('html, body').animate({ scrollTop: 0 }, 'slow', function () {});
	}

	function handleTransactionReceipt(receipt,finalMessage)
	{
	  
	    $("#divOngoingTransaction").fadeOut();

	    
	    sweetAlert("Success", finalMessage, "success");
	}

	function handleGenericError(error_message)
	{
	    if(error_message.includes("MetaMask Tx Signature"))
	    {
	        sweetAlert("Error", "Transaction Refused ", "error");
	    }
	    else
	    {
	        sweetAlert("Error", error_message, "error");
	    }

	}


	function changeSwitchery(element, checked) {
	  if ( ( element.is(':checked') && checked == false ) || ( !element.is(':checked') && checked == true ) ) {
	    element.parent().find('.switchery').trigger('click');
	  }
	}

	/*==================================Bootstrap Model Start=========================================*/

	function startLoader(){
		$(".preloader").fadeIn();
	}

	function stopLoader(){
		$(".preloader").fadeOut();
	}

	/*Set Default inactive*/
    $("#userFormClick").click(function(){
        $("#userForm").trigger('reset');
        changeSwitchery($("#isActive"),false);
        $("#userModelTitle").html("Add User");
        $("#imageHash").html('');
        $("#userFormModel").modal();    
    });

    /*Edit User Model Form*/
    function openEditUser(ref){
		var userAddress = $(ref).attr("data-userAddress");
		startLoader();
		getUserDetails(globUserContract,userAddress,function(result){
			$("#userWalletAddress").val(userAddress);
			$("#userName").val(result.name);
			$("#userContactNo").val(result.contactNo);
			$("#userProfileHash").val(result.profileHash);
			$('#userRoles').val(result.role).prop('selected', true);

			var profileImageLink = 'https://ipfs.io/ipfs/'+result.profileHash;
			var btnViewImage = '<a href="'+profileImageLink+'" target="_blank" class=" text-danger"><i class="fa fa-eye"></i> View Image</a>';
			$("#imageHash").html(btnViewImage);

			changeSwitchery($("#isActive"),result.isActive);
			$("#userModelTitle").html("Update User");
			stopLoader();
			$("#userFormModel").modal();
		});
	}

	// ipfs = window.IpfsApi('localhost', 5001);
	ipfs = window.IpfsApi('ipfs.infura.io', '5001', {protocol: 'https'})

	function handleFileUpload(event){
		const file = event.target.files[0];

	    let reader = new window.FileReader();
	    reader.onloadend = function () {
	       $("#userFormBtn").prop('disabled',true);
	       $("i.fa-spinner").show();
	        $("#imageHash").html('Processing......');	
	       saveToIpfs(reader)
	    }

	    reader.readAsArrayBuffer(file)
	}

	function saveToIpfs(reader){
		let ipfsId;

        const Buffer = window.IpfsApi().Buffer;
        const buffer = Buffer.from(reader.result);

        /*Upload Buffer to IPFS*/
        ipfs.files.add(buffer, (err, result) => { 
	        if (err) {
		          console.error(err)
		          return
			}
			
			var imageHash = result[0].hash;		

			var profileImageLink = 'https://ipfs.io/ipfs/'+imageHash;
			var btnViewImage = '<a href="'+profileImageLink+'" target="_blank" class=" text-danger"><i class="fa fa-eye"></i> View Image</a>';

	        $("#userProfileHash").val(imageHash);
	        $("#imageHash").html(btnViewImage);
	        
	        $("#userFormBtn").prop('disabled',false);
	        $("i.fa-spinner").hide();	
	    });
	}