var batchNo;
window.addEventListener('load', function() 
{	
  batchNo = $("#batchNo").val();

	if(batchNo!="" || batchNo!=null || batchNo!=undefined){
		
		getBatchData(globMainContract,batchNo,function(result)
		{
			var parentSection = $("#batchSection");
			var activityName =  "CreateVaccineBatch";
			var built = buildBatchBlock(result);

			populateSection(parentSection,built,activityName,batchNo)
		});

		getSupplierData(globMainContract,batchNo,function(result){
			
			var parentSection = $("#supplierSection"); 
			var activityName = "DoneSupplying";  
			var built = buildSupplierBlock(result);

			populateSection(parentSection,built,activityName,batchNo);
		});

		getManufacturerData(globMainContract,batchNo,function(result){
			
			var parentSection = $("#manufacturerSection");
			var activityName = "DoneManufacturing";
			var built = buildManufacturerBlock(result);

			populateSection(parentSection,built,activityName,batchNo);
		});

		getWholesalerData(globMainContract,batchNo,function(result){
			
			var parentSection = $("#wholesalerSection");
			var activityName = "DoneWholesaling";
			var built = buildWholesalerBlock(result);   

			populateSection(parentSection,built,activityName,batchNo);             
		});

		getDistributerData(globMainContract,batchNo,function(result){

			 var parentSection = $("#distributerSection");
			 var activityName = "DoneDistribution";
			 var built = buildDistributerBlock(result); 

			 populateSection(parentSection,built,activityName,batchNo);              
		});

		getPharmaData(globMainContract,batchNo,function(result){
			var parentSection = $("#pharmaSection");
			var activityName = "DonePharmaDelivery";
			var built = buildPharmaBlock(result); 

			populateSection(parentSection,built,activityName,batchNo);   

      $('.qr-code-magnify').magnificPopup({
          type:'image',
          mainClass: 'mfp-zoom-in'
      });

		});
	}

});

function populateSection(parentSection,built,activityName,batchNo)
{
  if(built.isDataAvail==true)
  {
  	getActivityTimestamp(activityName,batchNo, function(resultData)
  	{
     
      if(resultData.dataTime)
  		{
        var phoneNoSec = '';
        if(resultData.contactNo!='-'){
          phoneNoSec = `<i class="fa fa-phone"></i> `+resultData.contactNo+`<br/>`;  
        } 

        var userAddress = resultData.user;
        if($(window).width() <= 565){
          userAddress = userAddress.substring(0,15)+'...';
        }

        var html = `<span class="text-info"><i class='fa fa-user'> </i>
                        `+resultData.name+` (`+userAddress+`) <br/>
                        `+phoneNoSec+`
                    </span>
                    <i class='fa fa-clock-o'> </i> `+resultData.dataTime.toLocaleString()
                   // +`<a href='`+refLink+`' target='_blank'><i class='fa fa-external-link text-danger'></i></a>`
                   ;
        $(parentSection).find(".activityDateTime").html(html);
  			$(parentSection).find(".timeline-body .activityData").append('<img src="plugins/images/verified.jpg" alt="user-img" style="width:80px;height:80px" class="img-circle pull-right">');
  		}

      if(resultData.transactionHash){
       
      //  $(parentSection).find(".activityQrCode").html(qrCodeSec);
      }
  	});

	  var tmpTimelineBadge = $(parentSection).prev(".timeline-badge");

	
		$(tmpTimelineBadge).removeClass("danger").addClass("success");
		$(tmpTimelineBadge).find("i").removeClass().addClass("fa fa-check");
	}


	$(parentSection).find(".activityData").html(built.html); 
}

function getActivityTimestamp(activityName, batchNo, callback)
{
	globMainContract.getPastEvents(activityName,{
		fromBlock:0,
		filter:{batchNo: batchNo}
	},function(error,eventData)
	{
		try
		{
      web3.eth.getBlock(eventData[0].blockNumber,function(error,blockData)
			{
        var resultData = {};
				var date = blockData.timestamp;
				/* Convert Seconds to Miliseconds */
			 	date = new Date(date * 1000);

        resultData.dataTime = date;
        resultData.transactionHash = eventData[0].transactionHash;

        var userAddress = eventData[0].returnValues.user;
        getUserDetails(globUserContract,userAddress,function(result){
            if(userAddress == globAdminAddress){
                resultData.name      = 'Admin';
                resultData.contactNo = '-';
            }else{
                resultData.name      = result.name;
                resultData.contactNo = result.contactNo;
            }  
            
            resultData.user      = userAddress;

            callback(resultData);
        });
			})	
		}
		catch(e)
		{
			callback(false);
		}
	});
}

function buildBatchBlock(result)
{
	var batchData = {};
	var batchDescription = result.batchDescription;
	var quantity     = result.quantity;
	var supplierAddress    = result.supplierAddress;
	var manufacturerAddress   = result.manufacturerAddress;
	var wholesalerAddress   = result.wholesalerAddress;
  var distributerAddress= result.distributerAddress;
	if(batchDescription!='' && quantity!='' && supplierAddress!='' && manufacturerAddress!='' && wholesalerAddress!='' && distributerAddress!=''){
		batchData.html =  `<tr>
                                <td><b>Vaccine Batch Description:</b></td>
                                <td>`+batchDescription+` <i class="fa fa-check-circle verified_info"></i></td>
                            </tr>
                            <tr>
                                <td><b>Quantity (in dose):</b></td>
                                <td>`+quantity+` <i class="fa fa-check-circle verified_info"></i></td>
                            </tr>
                            <tr>
                                <td><b>Raw Material Supplier Address:</b></td>
                                <td>`+supplierAddress+` <i class="fa fa-check-circle verified_info"></i></td>
                            </tr>
                            <tr>
                                <td><b>Manufacturer Address:</b></td>
                                <td>`+manufacturerAddress+` <i class="fa fa-check-circle verified_info"></i></td>
                            </tr>
                            <tr>
                                <td><b>Wholesaler Adddress:</b></td>
                                <td>`+wholesalerAddress+` <i class="fa fa-check-circle verified_info"></i></td>
                            </tr>
                            <tr>
                                <td><b>Distributer Address:</b></td>
                                <td>`+distributerAddress+` <i class="fa fa-check-circle verified_info"></i></td>
                            </tr>`;
                            batchData.isDataAvail = true;                    
    }else{
    	batchData.html = ` <tr>
                                    <td colspan="2"><p>Information Not Avilable</p></td>
                            </tr>`;

                            batchData.isDataAvail = false;                                        
    }

    return batchData;
}

function buildSupplierBlock(result){
	var supplierData = {};
	var rawMaterials      = result.rawMaterials;
	var description        = result.description;
	var quantity    = result.quantity;	
  var shipperName = result.shipperName;
  var recieverAddress= result.recieverAddress;
  var receiverName= result.receiverName;
  var dispatchDateTime= result.dispatchDateTime;
  var cost= result.cost;
	if(rawMaterials!='' && description!='' && quantity!='' && shipperName!='' && recieverAddress!='' && receiverName!='' && dispatchDateTime!='' && cost!=''){
    var dispatchDateTime = new Date(result.dispatchDateTime * 1000).toLocaleString();
		supplierData.html =  `<tr>
                                    <td><b>Raw Materials:</b></td>
                                    <td>`+rawMaterials+` <i class="fa fa-check-circle verified_info"></i></td>
                                  </tr>
                                  <tr>
                                    <td><b>Raw Material Description:</b></td>
                                    <td>`+description+` <i class="fa fa-check-circle verified_info"></i></td>
                                  </tr>
                                  <tr>
                                    <td><b>Quantity:</b></td>
                                    <td>`+quantity+` <i class="fa fa-check-circle verified_info"></i></td>
                                  </tr>
                                  <tr>
                                    <td><b>Shipper Name:</b></td>
                                    <td>`+shipperName+` <i class="fa fa-check-circle verified_info"></i></td>
                                  </tr>
                                  <tr>
                                    <td><b>Reciever Address:</b></td>
                                    <td>`+recieverAddress+` <i class="fa fa-check-circle verified_info"></i></td>
                                  </tr>
                                  <tr>
                                    <td><b>Receiver Name:</b></td>
                                    <td>`+receiverName+` <i class="fa fa-check-circle verified_info"></i></td>
                                  </tr>
                                  <tr>
                                    <td><b>Dispatch DateTime:</b></td>
                                    <td>`+dispatchDateTime+` <i class="fa fa-check-circle verified_info"></i></td>
                                  </tr>
                                  <tr>
                                    <td><b>Cost:</b></td>
                                    <td>`+cost+` <i class="fa fa-check-circle verified_info"></i></td>
                                  </tr>`;
                                  supplierData.isDataAvail = true;                          
    }else{
    	supplierData.html = `<tr>
	                                    <td colspan="2"><p>Information Not Avilable</p></td>
	                            </tr>`;
                              supplierData.isDataAvail = false;                        
    } 

    return supplierData;  
}

function buildManufacturerBlock(result){
	var manufacturerData = {};
	var description   = result.description;
	var quantity = result.quantity;
	var shipperName      = result.shipperName;
 var recieverAddress = result.recieverAddress;
  var receiverName= result.receiverName;
  var dispatchDateTime= result.dispatchDateTime;
   var cost= result.cost;
	if(description!='' && quantity!='' && shipperName!='' && recieverAddress!='' && receiverName!='' && dispatchDateTime!='' && cost!=''){
    var dispatchDateTime = new Date(result.dispatchDateTime * 1000).toLocaleString();
		manufacturerData.html =  `<tr>
                                <td><b>Vaccine Description:</b></td>
                                <td>`+description+` <i class="fa fa-check-circle verified_info"></i></td>
                              </tr>
                              <tr>
                                <td><b>Vaccine Quantity Produced (in dose):</b></td>
                                <td>`+quantity+`<i class="fa fa-check-circle verified_info"></i></td>
                              </tr>
                              <tr>
                                <td><b>Shipper Name:</b></td>
                                <td>`+shipperName+`<i class="fa fa-check-circle verified_info"></i></td>
                              </tr>
                              <tr>
                                <td><b>Reciever Address:</b></td>
                                <td>`+recieverAddress+`<i class="fa fa-check-circle verified_info"></i></td>
                              </tr>
                              <tr>
                                <td><b>Receiver Name:</b></td>
                                <td>`+receiverName+`<i class="fa fa-check-circle verified_info"></i></td>
                              </tr>
                              <tr>
                                <td><b>Dispatch DateTime:</b></td>
                                <td>`+dispatchDateTime+`<i class="fa fa-check-circle verified_info"></i></td>
                              </tr>
                              <tr>
                                <td><b>vaccine package Cost:</b></td>
                                <td>`+cost+` Rs.<i class="fa fa-check-circle verified_info"></i></td>
                              </tr>`;
                              manufacturerData.isDataAvail = true;                      
    }else{
    	manufacturerData.html = `<tr>
                                    <td colspan="2"><p>Information Not Avilable</p></td>
                        </tr>`;
                        manufacturerData.isDataAvail = false;                
    }    

    return manufacturerData;
}	

function buildWholesalerBlock(result){
	var wholesalerData = {};
	var description           = result.description;
	var quantity = result.quantity;
	var receivedDateTime           = result.receivedDateTime;
	var shipperName             = result.shipperName;
	var recieverAddress  = result.recieverAddress;
	var receiverName   = result.receiverName;
	var dispatchDateTime         = result.dispatchDateTime;
  var cost= result.cost;
	if(description!='' && quantity!='' && receivedDateTime!='' && shipperName!='' && recieverAddress!='' && receiverName!='' && dispatchDateTime!='' && cost!=''){
		
    var receivedDateTime = new Date(result.receivedDateTime * 1000).toLocaleString();
    var dispatchDateTime = new Date(result.dispatchDateTime * 1000).toLocaleString();
    wholesalerData.html =  `<tr>
                            <td><b>Package Description:</b></td>
                            <td>`+description+` <i class="fa fa-check-circle verified_info"></i></td>
                          </tr>
                          <tr>
                            <td><b>Quantity Recieved (in dose):</b></td>
                            <td>`+quantity+` dose <i class="fa fa-check-circle verified_info"></i></td>
                          </tr>
                          <tr>
                            <td><b>Package Received DateTime:</b></td>
                            <td>`+receivedDateTime+` <i class="fa fa-check-circle verified_info"></i></td>
                          </tr>
                          <tr>
                            <td><b>Shipper Name:</b></td>
                            <td>`+shipperName+` <i class="fa fa-check-circle verified_info"></i></td>
                          </tr>
                          <tr>
                            <td><b>Reciever Address:</b></td>
                            <td>`+recieverAddress+` <i class="fa fa-check-circle verified_info"></i></td>
                          </tr>
                          <tr>
                            <td><b>Receiver Name:</b></td>
                            <td>`+receiverName+` <i class="fa fa-check-circle verified_info"></i></td>
                          </tr>
                          <tr>
                            <td><b>Dispatch DateTime:</b></td>
                            <td>`+dispatchDateTime+` <i class="fa fa-check-circle verified_info"></i></td>
                          </tr>
                          <tr>
                            <td><b>Cost:</b></td>
                            <td>`+cost+` Rs<i class="fa fa-check-circle verified_info"></i></td>
                          </tr>`;
                          wholesalerData.isDataAvail = true;                  
	}else{
    wholesalerData.html = ` <tr>
                                    <td colspan="2"><p>Information Not Avilable</p></td>
                        </tr>`;
                        wholesalerData.isDataAvail = false;                
    }   

    return wholesalerData;
}

function buildDistributerBlock(result){
	var distributerData = {};
	var description         = result.description;
	var quantity         = result.quantity;
	var receivedDateTime           = result.receivedDateTime;
	var shipperName  = result.shipperName;
	var recieverAddress    = result.recieverAddress;
	var receiverName    = result.receiverName;
	var dispatchDateTime = result.dispatchDateTime;
	var cost       = result.cost;

	if(description!='' && quantity!='' && receivedDateTime!='' && shipperName!='' && recieverAddress!='' && receiverName!='' && dispatchDateTime!='' && cost!=''){
		
    var receivedDateTime= new Date(result.receivedDateTime * 1000).toLocaleString();
    var dispatchDateTime = new Date(result.dispatchDateTime * 1000).toLocaleString();
    distributerData.html =  `<tr>
                            <td><b>Package Description:</b></td>
                            <td>`+description+`<i class="fa fa-check-circle verified_info"></i></td>
                          </tr>
                          <tr>
                            <td><b>Quantity (in dose):</b></td>
                            <td>`+quantity+` dose<i class="fa fa-check-circle verified_info"></i></td>
                          </tr>
                          <tr>
                            <td><b>Received DateTime:</b></td>
                            <td>`+receivedDateTime+` <i class="fa fa-check-circle verified_info"></i></td>
                          </tr>
                          <tr>
                            <td><b>Shipper Name:</b></td>
                            <td>`+shipperName+` <i class="fa fa-check-circle verified_info"></i></td>
                          </tr>
                          <tr>
                            <td><b>Reciever Address:</b></td>
                            <td>`+recieverAddress+` <i class="fa fa-check-circle verified_info"></i></td>
                          </tr>
                          <tr>
                            <td><b>Receiver Name:</b></td>
                            <td>`+receiverName+` <i class="fa fa-check-circle verified_info"></i></td>
                          </tr>
                          <tr>
                            <td><b>Dispatch DateTime:</b></td>
                            <td>`+dispatchDateTime+` <i class="fa fa-check-circle verified_info"></i></td>
                          </tr>
                          <tr>
                            <td><b>Cost:</b></td>
                            <td>`+cost+` Rs.<i class="fa fa-check-circle verified_info"></i></td>
                          </tr>`;
                          distributerData.isDataAvail = true;                  
    }else{
    	distributerData.html = ` <tr>
                                    <td colspan="2"><p>Information Not Avilable</p></td>
                        </tr>`;
                        distributerData.isDataAvail = false;                
    }

    return distributerData;    
}

function buildPharmaBlock(result){
	var pharmaData = {};
	var quantityRecieved  = result.quantityRecieved;
	var description  = result.description;
	var arrivalDateTime  = result.arrivalDateTime;
	var cost  = result.cost;
	var senderAddress  = result.senderAddress;


	if(quantityRecieved!='' && description!='' && arrivalDateTime!='' && cost!='' && senderAddress!=''){
		
    var arrivalDateTime = new Date(result.arrivalDateTime * 1000).toLocaleString();

    pharmaData.html =  `<tr>
                            <td><b>Quantity Recieved (in dose):</b></td>
                            <td>`+result.quantityRecieved+` dose<i class="fa fa-check-circle verified_info"></i></td>
                          </tr>
                          <tr>
                            <td><b>Vaccine Description:</b></td>
                            <td>`+result.description+` <i class="fa fa-check-circle verified_info"></i></td>
                          </tr>
                          <tr>
                            <td><b>Arrival DateTime:</b></td>
                            <td>`+result.arrivalDateTime+`<i class="fa fa-check-circle verified_info"></i></td>
                          </tr>
                          <tr>
                            <td><b>Cost:</b></td>
                            <td>`+result.cost+` Rs.<i class="fa fa-check-circle verified_info"></i></td>
                          </tr>
                          <tr>
                            <td><b>Sender Address:</b></td>
                            <td>`+result.senderAddress+` <i class="fa fa-check-circle verified_info"></i></td>
                          </tr> `;
                         
                          pharmaData.isDataAvail = true;                  
    }else{
    	pharmaData.html = ` <tr>
                                    <td colspan="2"><p>Information Not Avilable</p></td>
                        </tr>`;
                        pharmaData.isDataAvail = false;                
    }    
    
    return pharmaData; 
}