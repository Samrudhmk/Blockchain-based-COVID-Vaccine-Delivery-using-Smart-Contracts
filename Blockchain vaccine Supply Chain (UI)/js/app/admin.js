$(window).on('coinbaseReady',function(){
	getUserEvents(globUserContract);
	getBatchEvents(globMainContract);
});

function userFormSubmit(){
       //"form#userForm"
       if($("#userForm").parsley().isValid()){

		var userWalletAddress = $("#userWalletAddress").val();
		var userName          = $("#userName").val();
		var userContactNo     = $("#userContactNo").val();
		var userRoles         = $("#userRoles").val();
		var isActive          = $("#isActive").is(":checked");
		var userImageAddress  = $("#userProfileHash").val();

		globUserContract.methods.updateUserForAdmin(userWalletAddress,userName,userContactNo,userRoles,isActive,userImageAddress)
		.send({from:globCoinbase, to:globUserContract._address})
		.on('transactionHash',function(hash){
			 handleTransactionResponse(hash);
			 $("#userFormModel").modal('hide');
		})
		.on('receipt', function(receipt){
			receiptMessage = "User Created Successfully";
      		handleTransactionReceipt(receipt,receiptMessage);
      		$("#userFormModel").modal('hide');
      		getUserEvents(globUserContract);
		})
		.on('error',function(error)
		{
		    handleGenericError(error.message);
		    return;   
		});
	}
}

function addBatch()
{

    if (batchFormInstance.validate())
    {
        var batchDescription = $("#batchDescription").val().trim();
        var quantity = $("#quantity").val().trim();
        var supplierAddress = $("#supplierAddress").val().trim();
        var manufacturerAddress = $("#manufacturerAddress").val().trim();
        var wholesalerAddress = $("#wholesalerAddress").val().trim();
        var distributerAddress= $("#distributerAddress").val().trim();
        globMainContract.methods.addBasicDetails(batchDescription, quantity, supplierAddress, manufacturerAddress, wholesalerAddress, distributerAddress)
        .send({
            from: globCoinbase,
            to: globMainContract._address
        })
        .on('transactionHash', function (hash) {
            handleTransactionResponse(hash);
            $("#batchFormModel").modal('hide');
        })
        .on('receipt', function (receipt) {
            receiptMessage = "Token Transferred Successfully";
            handleTransactionReceipt(receipt, receiptMessage);
            $("#batchFormModel").modal('hide');
            getBatchEvents(globMainContract);
        })
        .on('error', function (error) {
            handleGenericError(error.message);
            return;
        });
    }
}


function getBatchEvents(contractRef) { //AddBatch
    contractRef.getPastEvents('CreateVaccineBatch', {
        fromBlock: 0
    }).then(function (events) 
    {
    	$("#totalBatch").html(events.length);
        
        var finalEvents = [];
        $.each(events,function(index,elem)
        {
            var tmpData = {};
            tmpData.batchNo = elem.returnValues.batchNo;
            tmpData.transactionHash = elem.transactionHash;
            getBatchStatus(contractRef, tmpData.batchNo).then(result => {
                tmpData.status = result;

                finalEvents.push(tmpData);
            });
        });

        setTimeout(function()
        {
        	if(finalEvents.length > 0){
	            var table = buildBatchTable(finalEvents);
	            $("#batchTable").find("tbody").html(table);
	            $('.qr-code-magnify').magnificPopup({
				    type:'image',
				    mainClass: 'mfp-zoom-in'
				});
	        }    

            counterInit();
        },1000); 

    }).catch(error => {
        console.log(error)
    });
}

function buildBatchTable(finalEvents)
{
    var table = "";
    
    for (var tmpDataIndex in finalEvents)
    {   
        var elem = finalEvents[tmpDataIndex];

        var batchNo = elem.batchNo;
        var transactionHash = elem.transactionHash;
        var tr = "";
			
        var commBatchTd = `<td>`+batchNo+`</td>`;
        
		var commActionTd = `<td><a href="view-batch.php?batchNo=`+batchNo+`&txn=`+transactionHash+`" target="_blank" class="text-inverse p-r-10" data-toggle="tooltip" title="View"><i class="ti-eye"></i></a> </td>`;		    
		
		if (elem.status == "SUPPLIER") {
            tr = `<tr>
            		`+commBatchTd+`
                    <td><span class="label label-warning font-weight-100">Processing</span></td>
                    <td><span class="label label-danger font-weight-100">Not Available</span> </td>
                    <td><span class="label label-danger font-weight-100">Not Available</span> </td>
                    <td><span class="label label-danger font-weight-100">Not Available</span> </td>
                    <td><span class="label label-danger font-weight-100">Not Available</span> </td>
                    `+commActionTd+`
                </tr>`;
        } else if (elem.status == "MANUFACTURER") {
            tr = `<tr>
                    `+commBatchTd+`
                    <td><span class="label label-success font-weight-100">Completed</span></td>
                    <td><span class="label label-warning font-weight-100">Processing</span> </td>
                    <td><span class="label label-danger font-weight-100">Not Available</span> </td>
                    <td><span class="label label-danger font-weight-100">Not Available</span> </td>
                    <td><span class="label label-danger font-weight-100">Not Available</span> </td>
                    `+commActionTd+`
                </tr>`;
        } else if (elem.status == "WHOLESALER") {
            tr = `<tr>
                    `+commBatchTd+`
                    <td><span class="label label-success font-weight-100">Completed</span></td>
                    <td><span class="label label-success font-weight-100">Completed</span> </td>
                    <td><span class="label label-warning font-weight-100">Processing</span> </td>
                    <td><span class="label label-danger font-weight-100">Not Available</span> </td>
                    <td><span class="label label-danger font-weight-100">Not Available</span> </td>
                    `+commActionTd+`
                </tr>`;
        } else if (elem.status == "DISTRIBUTER") {
            tr = `<tr>
                    `+commBatchTd+`
                    <td><span class="label label-success font-weight-100">Completed</span></td>
                    <td><span class="label label-success font-weight-100">Completed</span> </td>
                    <td><span class="label label-success font-weight-100">Completed</span> </td>
                    <td><span class="label label-warning font-weight-100">Processing</span> </td>
                    <td><span class="label label-danger font-weight-100">Not Available</span> </td>
                    `+commActionTd+`
                </tr>`;
        } else if (elem.status == "PHARMA") {
            tr = `<tr>
                    `+commBatchTd+`
                    <td><span class="label label-success font-weight-100">Completed</span></td>
                    <td><span class="label label-success font-weight-100">Completed</span> </td>
                    <td><span class="label label-success font-weight-100">Completed</span> </td>
                    <td><span class="label label-success font-weight-100">Completed</span> </td>
                    <td><span class="label label-warning font-weight-100">Processing</span> </td>
                    `+commActionTd+`
                </tr>`;
        } else if (elem.status == "DONE") {
            tr = `<tr>
                    `+commBatchTd+`
                    <td><span class="label label-success font-weight-100">Completed</span></td>
                    <td><span class="label label-success font-weight-100">Completed</span> </td>
                    <td><span class="label label-success font-weight-100">Completed</span> </td>
                    <td><span class="label label-success font-weight-100">Completed</span> </td>
                    <td><span class="label label-success font-weight-100">Completed</span> </td>
                    `+commActionTd+`
                </tr>`;
        }

        table+=tr;
    }

    return table;
    
}

function getBatchStatus(contractRef, batchNo)
{
    return contractRef.methods.getNextAction(batchNo)
        .call();
       
}


