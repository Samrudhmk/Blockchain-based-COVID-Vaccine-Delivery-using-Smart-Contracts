var globCurrentEditingBatchNo = false;
var globCurrentUser = false;

var userForm,
    supplierForm,
    manufacturerForm,
    wholesalerForm,
    distributerForm,
    pharmaForm;

$(document).ready(function(){
  
  userForm =  $("#updateUserForm").parsley();
  supplierForm =  $("#supplierForm").parsley();
  manufacturerForm =  $("#manufacturerForm").parsley(); 
  wholesalerForm =  $("#wholesalerForm").parsley(); 
  distributerForm =  $("#distributerForm").parsley();
  pharmaForm =  $("#pharmaForm").parsley();

  $('.datepicker-autoclose').datepicker({
        autoclose: true,
        todayHighlight: true,
        format:"dd-mm-yyyy"
    });
});

$(window).on("coinbaseReady", function ()
{
    getUser(globUserContract, function(data){      

      globCurrentUser = data ;

      if(data.isActive == true)
      {
        if(data.name.trim().length <=0 && 
           data.contactNo.trim().length <=0 && 
           data.role.trim().length <=0 )
        {
          swal("Oops","Your Account was not found","error");
          setTimeout(function()
          {
            window.location = "index.php";
          },1000);
          return ;
        }
      }
      else{
          swal({
              title: "Insufficient Access",
              text: "You have Insufficient Access to this page",
              type: "error",
              showCancelButton: false,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "Ok",
              closeOnConfirm: false
            },
            function(isConfirm)
            {
              if(isConfirm==true)
              {
               window.location = "index.php";
              }
            });
          return ;
      }  

      $("#userImage").attr('src','https://ipfs.io/ipfs/'+data.profileHash);
      $("#userName").html(data.name);
      $("#userContact").html(data.contactNo);
      $("#userRole").html(data.role);
      
    });

    getBatchEvents(globMainContract);
});

/* --------------- User Section -----------------------*/
$("#editUser").on('click',function(){
  startLoader();
  getUser(globUserContract, function(data){
       
       $("#fullname").val(data.name);
       $("#contactNumber").val(data.contactNo);
       $("#role").val(data.role);

       var profileImageLink = 'https://ipfs.io/ipfs/'+data.profileHash;
       var btnViewImage = '<a href="'+profileImageLink+'" target="_blank" class=" text-danger"><i class="fa fa-eye"></i> View Image</a>';
       $("#imageHash").html(btnViewImage);

       changeSwitchery($("#isActive"),data.isActive);
       switchery.disable();
       stopLoader();
       $("#userFormModel").modal();
    });
});

$("#userFormBtn").on('click',function(){

    if(userForm.validate())
    {
      var fullname      = $("#fullname").val();
      var contactNumber = $("#contactNumber").val();
      var role          = globCurrentUser.role;
      var userStatus    = $("#isActive").is(":checked");
      var profileHash   = $("#userProfileHash").val();

      var userDetails = {
          fullname : fullname,
          contact : contactNumber,
          role : role,
          status : userStatus,
          profile : profileHash
      };    

      updateUser(globUserContract, userDetails); 
    }
});

function getUser(contractRef,callback)
{
   contractRef.methods.getUser(globCoinbase).call(function (error, result) {
        if(error){
            alert("Unable to get User" + error);    
        }
        newUser = result;
        if (callback)
        {
            callback(newUser);
        }        
    });
}

function updateUser(contractRef,data)
{
  contractRef.methods.updateUser(data.fullname,data.contact,data.role,data.status,data.profile)
  .send({from:globCoinbase,to:contractRef.address})
  .on('transactionHash',function(hash)
        {
          $.magnificPopup.instance.close()
          handleTransactionResponse(hash);
          $("#userFormModel").modal('hide');
        })
        .on('receipt',function(receipt)
        {
            receiptMessage = "User Profile Updated Succussfully";
            handleTransactionReceipt(receipt,receiptMessage);
            $("#userFormModel").modal('hide');
        })
        .on('error',function(error)
        {
            handleGenericError(error.message);
            return;     
        });    
}

/* --------------- Activity Section -----------------------*/

function editActivity(batchNo)
{
  startLoader();
  globCurrentEditingBatchNo = batchNo;
}

/* --------------- Supplier Section -----------------------*/

$("#updateSupplier").on('click',function(){

    if(supplierForm.validate())
    {
      var data = {
        batchNo : globCurrentEditingBatchNo,
        description : $("#description").val().trim(),
        rawMaterials : $("#rawMaterials").val().trim(),
        quantity : parseInt($("#quantity").val().trim()),
        shipperName : $("#shipperName").val().trim(),
        recieverAddress: $("#recieverAddress").val().trim(),
        receiverName: $("#receiverName").val().trim(),
        cost: parseInt($("#cost").val().trim()),
      };    

      updateSupplier(globMainContract, data); 
    }
});

function updateSupplier(contractRef,data)
{
  
  contractRef.methods.updateSupplierData(data.batchNo, data.rawMaterials, data.description, data.quantity, data.shipperName, data.recieverAddress, data.receiverName, data.cost)
  .send({from:globCoinbase,to:contractRef.address})
  .on('transactionHash',function(hash)
        {
          $.magnificPopup.instance.close()
          handleTransactionResponse(hash);
        })
        .on('receipt',function(receipt)
        {
            receiptMessage = "Supplier Data Updated Succussfully";
            handleTransactionReceipt(receipt,receiptMessage)
        })
        .on('error',function(error)
        {
            handleGenericError(error.message);
            return;     
        });    
}

/* --------------- Manufacturer Section -----------------------*/
$("#updateManufacturer").on('click',function(){

    if(manufacturerForm.validate())
    {
      var data = {
        batchNo : globCurrentEditingBatchNo,
        manudescription : $("#manudescription").val().trim(),
        manuquantity : parseInt($("#manuquantity").val().trim()),
        manushipperName : $("#manushipperName").val().trim(),
        manurecieverAddress: $("#manurecieverAddress").val().trim(),
        manureceiverName: $("#manureceiverName").val().trim(),
        manucost: parseInt($("#manucost").val().trim()),
      };    

      updateManufacturer(globMainContract, data); 
    }
});

function updateManufacturer(contractRef,data)
{
  
  contractRef.methods.updateManufacturerData(data.batchNo, data.manudescription, data.manuquantity, data.manushipperName, data.manurecieverAddress, data.manureceiverName, data.manucost)
  .send({from:globCoinbase,to:contractRef.address})
  .on('transactionHash',function(hash)
        {
          $.magnificPopup.instance.close()
          handleTransactionResponse(hash);
        })
        .on('receipt',function(receipt)
        {
            receiptMessage = "ManuFacturer Data Updated Succussfully";
            handleTransactionReceipt(receipt,receiptMessage)
        })
        .on('error',function(error)
        {
            handleGenericError(error.message);
            return;     
        });    
}


/* --------------- Wholesaler Section -----------------------*/
$("#updateWholsaler").on('click',function(){

    if(wholesalerForm.validate())
    {
      var tmpDate = $("#wholreceivedDateTime").val().trim().split("-");
      tmpDate = tmpDate[1]+"/"+tmpDate[0]+"/"+tmpDate[2];     

      var data = {
        batchNo : globCurrentEditingBatchNo,
        wholdescription : $("#wholdescription").val().trim(),
        wholquantity : parseInt($("#wholquantity").val().trim()),
        wholshipperName : $("#wholshipperName").val().trim(),
        wholrecieverAddress : $("#wholrecieverAddress").val().trim(),
        wholreceiverName: $("#wholreceiverName").val().trim(),
        wholreceivedDateTime : new Date(tmpDate).getTime() / 1000,
        wholcost : parseInt($("#wholcost").val().trim()),
      };    

      updateWholsaler(globMainContract, data); 
    }
});

function updateWholsaler(contractRef,data)
{
  
  contractRef.methods.updateWholesalerData(data.batchNo, data.wholdescription, data.wholquantity, data.wholreceivedDateTime, data.wholshipperName, data.wholrecieverAddress, data.wholreceiverName, data.wholcost)
  .send({from:globCoinbase,to:contractRef.address})
  .on('transactionHash',function(hash)
        {
          $.magnificPopup.instance.close()
          handleTransactionResponse(hash);
        })
        .on('receipt',function(receipt)
        {
            receiptMessage = "Wholesaler Data Updated Succussfully";
            handleTransactionReceipt(receipt,receiptMessage)
        })
        .on('error',function(error)
        {
            handleGenericError(error.message);
            return;     
        });    
}

/* --------------- Distributer Section -----------------------*/
$("#updateDistributer").on('click',function(){

    if(distributerForm.validate())
    {
      var tmpDate = $("#disreceivedDateTime").val().trim().split("-");
      tmpDate = tmpDate[1]+"/"+tmpDate[0]+"/"+tmpDate[2];  

      var data = {
        batchNo : globCurrentEditingBatchNo,
        disdescription : $("#disdescription").val().trim(),
        disquantity : parseInt($("#disquantity").val().trim()),
        disshipperName : $("#disshipperName").val().trim(),
        disrecieverAddress : $("#disrecieverAddress").val().trim(),
        disreceiverName: $("#disreceiverName").val().trim(),
        disreceivedDateTime : new Date(tmpDate).getTime() / 1000,
        discost : parseInt($("#discost").val().trim()),
      };    

      updateDistributer(globMainContract, data); 
    }
});

function updateDistributer(contractRef,data)
{
  contractRef.methods.updateDistributerData(data.batchNo, data.disdescription, data.disquantity, data.disreceivedDateTime, data.disshipperName, data.disrecieverAddress, data.disreceiverName, data.discost)
  .send({from:globCoinbase,to:contractRef.address})
  .on('transactionHash',function(hash)
        {
          $.magnificPopup.instance.close()
          handleTransactionResponse(hash);
        })
        .on('receipt',function(receipt)
        {
            receiptMessage = "Distributer Data Updated Succussfully";
            handleTransactionReceipt(receipt,receiptMessage)
        })
        .on('error',function(error)
        {
            handleGenericError(error.message);
            return;     
        });    
}

/* --------------- Pharma Section -----------------------*/
$("#updatePharma").on('click',function(){

    if(pharmaForm.validate())
    {
      var tmpDate = $("#phararrivalDateTime").val().trim().split("-");
      tmpDate = tmpDate[1]+"/"+tmpDate[0]+"/"+tmpDate[2];

      var data = {
        batchNo : globCurrentEditingBatchNo,
        pharquantityRecieved : parseInt($("#pharquantityRecieved").val().trim()),
        phardescription : $("#phardescription").val().trim(),
        phararrivalDateTime : new Date(tmpDate).getTime() / 1000 ,
        pharcost : parseInt($("#pharcost").val().trim()),
        pharsenderAddress : $("#pharsenderAddress").val().trim(),
      };    

      updatePharma(globMainContract, data); 
    }
});

function updatePharma(contractRef,data)
{
 
  contractRef.methods.updatePharmaData(data.batchNo, data.pharquantityRecieved, data.phardescription, data.phararrivalDateTime, data.pharcost, data.pharsenderAddress)
  .send({from:globCoinbase,to:contractRef.address})
  .on('transactionHash',function(hash)
        {
          $.magnificPopup.instance.close()
          handleTransactionResponse(hash);
        })
        .on('receipt',function(receipt)
        {
            receiptMessage = "Pharmacy Data Updated Succussfully";
            handleTransactionReceipt(receipt,receiptMessage)
        })
        .on('error',function(error)
        {
            handleGenericError(error.message);
            return;     
        });    
}


function getBatchEvents(contractRef) {
    contractRef.getPastEvents('CreateVaccineBatch', {
        fromBlock: 0
    }).then(function (events) 
    {
      $("#totalBatch").html(events.length);
      counterInit();

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
              $("#userBatchTable").find("tbody").html(table);

              reInitPopupForm();
          }    
        },1000); 

        

      
    }).catch(error => {
        console.log(error)
    });
}

function buildBatchTable(finalEvents)
{
    $.magnificPopup.instance.popupsCache = {};

    var table = "";
    
    for (var tmpDataIndex in finalEvents)
    {   
        var elem = finalEvents[tmpDataIndex];
        var batchNo = elem.batchNo;
        var transactionHash = elem.transactionHash;
        var tr = "";
        
        if (elem.status == "SUPPLIER") {
            tr = `<tr>
                    <td>`+batchNo+`</td>
                  `;
                  
              if(globCurrentUser.role == "SUPPLIER")
              {
                tr+=`<td>
                          <span class="label label-inverse font-weight-100">
                          <a class="popup-with-form" href="#supplierForm" onclick="editActivity('`+batchNo+`')">
                            <span class="label label-inverse font-weight-100">Update</span>
                          </a>
                      </td>`;
              }
              else
              {
                 tr+=`<td><span class="label label-warning font-weight-100">Processing</span> </td>`;
              }

                
          tr+=`<td><span class="label label-danger font-weight-100">Not Available</span> </td>
              <td><span class="label label-danger font-weight-100">Not Available</span> </td>
              <td><span class="label label-danger font-weight-100">Not Available</span> </td>
              <td><span class="label label-danger font-weight-100">Not Available</span> </td>
              <td><a href="view-batch.php?batchNo=`+batchNo+`&txn=`+transactionHash+`" target="_blank" class="text-inverse p-r-10" data-toggle="tooltip" title="View"><i class="ti-eye"></i></a> </td>
          </tr>`;

        } else if (elem.status == "MANUFACTURER") {
          tr = `<tr>
                    <td>`+batchNo+`</td>
                    <td><span class="label label-success font-weight-100">Completed</span></td>
                    `;
                  if(globCurrentUser.role == "MANUFACTURER")
                  {
                    tr+=`<td>
                              <span class="label label-inverse font-weight-100">
                              <a class="popup-with-form" href="#manufacturerForm" onclick="editActivity('`+batchNo+`')">
                                <span class="label label-inverse font-weight-100">Update</span>
                              </a>
                          </td>`;
                  }
                  else
                  {
                     tr+=`<td><span class="label label-warning font-weight-100">Processing</span> </td>`;
                  }        

            tr+=`
                <td><span class="label label-danger font-weight-100">Not Available</span> </td>
                <td><span class="label label-danger font-weight-100">Not Available</span> </td>
                <td><span class="label label-danger font-weight-100">Not Available</span> </td>
                <td><a href="view-batch.php?batchNo=`+batchNo+`&txn=`+transactionHash+`" target="_blank" class="text-inverse p-r-10" data-toggle="tooltip" title="View"><i class="ti-eye"></i></a> </td>
            </tr>`;

        } else if (elem.status == "WHOLESALER") {
            tr = `<tr>
                    <td>`+batchNo+`</td>
                    <td><span class="label label-success font-weight-100">Completed</span></td>
                    <td><span class="label label-success font-weight-100">Completed</span> </td>
                  `;
                  
                  if(globCurrentUser.role == "WHOLESALER")
                  {
                    tr+=`<td>
                              <span class="label label-inverse font-weight-100">
                              <a class="popup-with-form" href="#wholesalerForm" onclick="editActivity('`+batchNo+`')">
                                <span class="label label-inverse font-weight-100">Update</span>
                              </a>
                          </td>`;
                  }
                  else
                  {
                     tr+=`<td><span class="label label-warning font-weight-100">Processing</span> </td>`;
                  } 

              tr+=`  
                    <td><span class="label label-danger font-weight-100">Not Available</span> </td>
                    <td><span class="label label-danger font-weight-100">Not Available</span> </td>
                    <td><a href="view-batch.php?batchNo=`+batchNo+`&txn=`+transactionHash+`" target="_blank" class="text-inverse p-r-10" data-toggle="tooltip" title="View"><i class="ti-eye"></i></a> </td>
                </tr>`;
        } else if (elem.status == "DISTRIBUTER") {
            tr = `<tr>
                    <td>`+batchNo+`</td>
                    <td><span class="label label-success font-weight-100">Completed</span></td>
                    <td><span class="label label-success font-weight-100">Completed</span> </td>
                    <td><span class="label label-success font-weight-100">Completed</span> </td>
                  `;  

                  if(globCurrentUser.role == "DISTRIBUTER")
                  {
                    tr+=`<td>
                              <span class="label label-inverse font-weight-100">
                              <a class="popup-with-form" href="#distributerForm" onclick="editActivity('`+batchNo+`')">
                                <span class="label label-inverse font-weight-100">Update</span>
                              </a>
                          </td>`;
                  }
                  else
                  {
                     tr+=`<td><span class="label label-warning font-weight-100">Processing</span> </td>`;
                  } 

              tr+=` <td><span class="label label-danger font-weight-100">Not Available</span> </td>
                    <td><a href="view-batch.php?batchNo=`+batchNo+`&txn=`+transactionHash+`" target="_blank" class="text-inverse p-r-10" data-toggle="tooltip" title="View"><i class="ti-eye"></i></a> </td>
                </tr>`;
        } else if (elem.status == "PHARMA") {
            tr = `<tr>
                    <td>`+batchNo+`</td>
                    <td><span class="label label-success font-weight-100">Completed</span></td>
                    <td><span class="label label-success font-weight-100">Completed</span> </td>
                    <td><span class="label label-success font-weight-100">Completed</span> </td>
                    <td><span class="label label-success font-weight-100">Completed</span> </td>
                  `;
                  
                  if(globCurrentUser.role == "PHARMA")
                  {
                    tr+=`<td>
                              <span class="label label-inverse font-weight-100">
                              <a class="popup-with-form" href="#pharmaForm" onclick="editActivity('`+batchNo+`')">
                                <span class="label label-inverse font-weight-150">Update</span>
                              </a>
                          </td>`;
                  }
                  else
                  {
                     tr+=`<td><span class="label label-warning font-weight-100">Processing</span> </td>`;
                  }  
                tr+=`    
                    <td><a href="view-batch.php?batchNo=`+batchNo+`&txn=`+transactionHash+`" target="_blank" class="text-inverse p-r-10" data-toggle="tooltip" title="View"><i class="ti-eye"></i></a> </td>
                </tr>`;
        } else if (elem.status == "DONE") {
            tr = `<tr>
                    <td>`+batchNo+`</td>
                    <td><span class="label label-success font-weight-100">Completed</span></td>
                    <td><span class="label label-success font-weight-100">Completed</span> </td>
                    <td><span class="label label-success font-weight-100">Completed</span> </td>
                    <td><span class="label label-success font-weight-100">Completed</span> </td>
                    <td><span class="label label-success font-weight-100">Completed</span> </td>
                  `;  
                tr+=`    
                    <td><a href="view-batch.php?batchNo=`+batchNo+`&txn=`+transactionHash+`" target="_blank" class="text-inverse p-r-10" data-toggle="tooltip" title="View"><i class="ti-eye"></i></a> </td>
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

function reInitPopupForm()
{
  $('.popup-with-form').magnificPopup({
    type: 'inline',
    preloader: true,
    key: 'popup-with-form',
    // When elemened is focused, some mobile browsers in some cases zoom in
    // It looks not nice, so we disable it:
    callbacks: {
      open: function() {
        stopLoader();
      }
    }
  });
}