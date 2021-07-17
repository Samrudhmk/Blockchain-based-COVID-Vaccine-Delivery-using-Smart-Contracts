<?php include('templates/_header.php'); ?>
        

            <div class="container-fluid">
                <div class="row bg-title">
                    <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
                        <h4 class="page-title">Dashboard</h4>
                    </div>
                    <div class="col-lg-9 col-sm-8 col-md-8 col-xs-12">
                    </div>
                    <!-- /.col-lg-12 -->
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <div class="alert alert-info" id="divOngoingTransaction" style="display: none">Ongoing Transaction: <span id="linkOngoingTransaction">None</span> </div>
                    </div>    
                </div>

                <!-- /.row -->
                <div class="row">
                    <div class="col-md-12 col-xs-12">
                        <div class="white-box">
                            <div class="user-bg"> <img width="100%" alt="user" src="plugins/images/heading-bg/vaccine.jpg">
                                <div class="overlay-box">
                                    <div class="user-content">
                                        <a href="javascript:void(0)"><img src="plugins/images/user.png" id="userImage" class="thumb-lg img-circle" alt="img"></a>
                                        <h4 class="text-white" id="userName">--</h4>
                                        <h5 class="text-white" id="currentUserAddress">--</h5>
                                    </div>
                                </div>
                            </div>
                            <div class="user-btm-box">
                                <div class="col-md-4 col-sm-4 text-center">
                                    <p class="text-purple"><i class="fa fa-mobile"></i> Contact No</p>
                                    <h1 id="userContact">--</h1>
                                </div>

                                <div class="col-md-4 col-sm-4 text-center">
                                    <p class="text-blue"><i class="fa fa-user"></i> Role</p>
                                    <h1 id="userRole">--</h1>
                                </div>
                                <div class="col-md-4 col-sm-4 text-center">
                                    <p class="text-danger"><i class="fa fa-gears"></i> Settings</p>
                                    <a class="btn btn-info m-l-20 btn-rounded btn-outline hidden-xs hidden-sm waves-effect waves-light" id="editUser" href="javascript:void(0);" >Edit</a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <!--row -->
                <!-- /.row -->
                

                               <!-- row -->
                <div class="row">
                    <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                        <div class="white-box">
                            <h3 class="box-title">Batches Overview</h3> 
                            <div class="table-responsive">
                                <table class="table product-overview" id="userBatchTable">
                                    <thead>
                                        <tr>
                                            <th>Batch ID</th>
                                            <th>Supplier</th>
                                            <th>Manufacturer</th>
                                            <th>Wholesaler</th>
                                            <th>Distributer</th>
                                            <th>Pharma</th>
                                            <th>View</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                         <tr>
                                             <td colspan="7" align="center">No Data Available</td>
                                         </tr>                                         
                                    </tbody>
                                </table>

                            <!-- Update User Form -->
                            <div id="userFormModel" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none; padding-top: 170px;">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                        <h2 class="modal-title" id="userModelTitle">Update Profile</h2>
                                    </div>

                                    <div class="modal-body">
                                        <form id="updateUserForm" onsubmit="return false;">
                                            <fieldset style="border:0;">
                                                <div class="form-group">
                                                    <label class="control-label" for="fullname">Full Name <i class="red">*</i></label>
                                                    <input type="text" class="form-control" id="fullname" name="fullname" placeholder="Name" data-parsley-required="true">
                                                </div>                              
                                                <div class="form-group">
                                                    <label class="control-label" for="contactNumber">Contact No<i class="red">*</i></label>
                                                    <input type="text" class="form-control" id="contactNumber" name="contactNumber" placeholder="Contact No." data-parsley-required="true" data-parsley-type="digits" data-parsley-length="[10, 15]" maxlength="15">
                                                </div>
                                                <div class="form-group">
                                                    <label class="control-label" for="role">Role </label>
                                                    <select class="form-control" id="role" disabled="true" name="role">
                                                        <option value="">Select Role</option>
                                                        <option value="SUPPLIER">Supplier</option>
                                                        <option value="MANUFACTURER">Manufacturer</option>
                                                        <option value="WHOLESALER">Wholesaler</option>
                                                        <option value="DISTRIBUTER">Distributer</option>
                                                        <option value="PHARMA">Pharmacy</option>
                                                    </select>    
                                                </div>
                                                <div class="form-group">
                                                    <label class="control-label" for="isActive">User Status</label>
                                                    <input type="checkbox" class="js-switch" data-color="#99d683" data-secondary-color="#f96262" id="isActive" name="isActive" data-size="small"/>
                                                </div>
                                                <div class="form-group">
                                                    <label class="control-label" for="userProfileHash">Profile Image <i class="red">*</i></label>
                                                    <input type="file" class="form-control" onchange="handleFileUpload(event);" />
                                                    <input type="hidden" class="form-control" id="userProfileHash" name="userProfileHash" placeholder="User Profile Hash" data-parsley-required="true" >
                                                    <span id="imageHash"></span>
                                                </div>
                                            </fieldset>
                                        
                                    </div>
                                    <div class="modal-footer">
                                        <i style="display: none;" class="fa fa-spinner fa-spin"></i>
                                         <button type="button" class="btn btn-primary" id="userFormBtn">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                            

                            <!-- Supplier Form -->
                            <form id="supplierForm" class="mfp-hide white-popup-block">
                                <h1>Vaccine Raw Material Details</h1><br>
                                <fieldset style="border:0;">
                                                           
                                    <div class="form-group">
                                        <label class="control-label" for="rawMaterials">Raw materials</label>
                                        <input type="text" class="form-control" id="rawMaterials" name="rawMaterials" placeholder="Raw material info" data-parsley-required="true">
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label" for="description">Description</label>
                                        <input type="text" class="form-control" id="description" name="description" placeholder="Raw material Description" data-parsley-required="true">
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label" for="quantity">Quantity</label>
                                        <input type="number" class="form-control" id="quantity" name="quantity" placeholder="Quantity supplied" data-parsley-required="true">
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label" for="shipperName">Package Shipper Name</label>
                                        <input type="text" class="form-control" id="shipperName" name="shipperName" placeholder="Shipper Name" data-parsley-required="true">
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label" for="recieverAddress">Package Reciever Address</label>
                                        <input type="text" class="form-control" id="recieverAddress" name="recieverAddress" placeholder="Reciever Address" data-parsley-required="true">
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label" for="receiverName">Package Reciever Name</label>
                                        <input type="text" class="form-control" id="receiverName" name="receiverName" placeholder="Reciever Name" data-parsley-required="true">
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label" for="cost">Overall Cost (in Rs.)</label>
                                        <input type="number" class="form-control" id="cost" name="cost" placeholder="Cost in Rs." data-parsley-required="true">
                                    </div>
                                     <div class="form-group float-right">
                                        <button type="reset" class="btn btn-default waves-effect" >Reset</button>
                                        <button type="button" id="updateSupplier" class="btn btn-primary">Submit</button>
                                    </div>
                                </fieldset>
                            </form>

                             <!-- Manufacturer Form -->
                            <form id="manufacturerForm" class="mfp-hide white-popup-block ">
                                <h1>Vaccine Manufacturing Details </h1><br>
                                <fieldset style="border:0;">
                                                            
                                    <div class="form-group">
                                        <label class="control-label" for="manudescription">Vaccine Description</label>
                                        <input type="text" class="form-control" id="manudescription" name="manudescription" placeholder="Description" data-parsley-required="true">
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label" for="manuquantity">Vaccine Quantity (in Dose)</label>
                                        <input type="number" class="form-control" id="manuquantity" name="manuquantity" placeholder="Quantity" data-parsley-required="true">
                                    </div>
                                     <div class="form-group">
                                        <label class="control-label" for="manushipperName">Package Shipper Name</label>
                                        <input type="text" class="form-control" id="manushipperName" name="manushipperName" placeholder="Shipper name" data-parsley-required="true">
                                    </div>
                                    <div class="form-group">
                                        <label class="control-label" for="manurecieverAddress">Package Reciever Address</label>
                                        <input type="text" class="form-control" id="manurecieverAddress" name="manurecieverAddress" placeholder="Reciever Address" data-parsley-required="true">
                                    </div>    
                                    <div class="form-group">
                                        <label class="control-label" for="manureceiverName">Package Reciever Name</label>
                                        <input type="text" class="form-control" id="manureceiverName" name="manureceiverName" placeholder="Reciever Name" data-parsley-required="true">
                                    </div>   
                                    <div class="form-group">
                                        <label class="control-label" for="manucost">Overall Package Cost</label>
                                        <input type="number" class="form-control" id="manucost" name="manucost" placeholder="Cost" data-parsley-required="true">
                                    </div>                          
                                    <div class="form-group float-right">
                                        <button type="reset" class="btn btn-default waves-effect">Reset</button>
                                        <button type="button" id="updateManufacturer"class="btn btn-primary">Submit</button>
                                    </div>
                                </fieldset>
                            </form>

                            <!-- Wholesaler Form -->
                            <form id="wholesalerForm" class="mfp-hide white-popup-block">
                                <h1>Vaccine Wholesaling Details</h1><br>
                                <fieldset style="border:0;">

                                    <div class="form-group">
                                        <label class="control-label" for="wholdescription">Package Description</label>
                                        <input type="text" class="form-control" id="wholdescription" name="wholdescription" placeholder="Description" data-parsley-required="true">
                                    </div> 

                                    <div class="form-group">
                                        <label class="control-label" for="wholquantity"> Quantity (in dose)</label>
                                        <input type="number" class="form-control" id="wholquantity" name="wholquantity" placeholder="Quantity" data-parsley-required="true">
                                    </div> 

                                    <div class="form-group">
                                        <label class="control-label" for="wholreceivedDateTime">Package Recieved Datetime</label>
                                        <input type="text" class="form-control datepicker-master" id="wholreceivedDateTime" name="wholreceivedDateTime" placeholder="Recieved Datetime" data-parsley-required="true">
                                    </div>

                                    <div class="form-group">
                                        <label class="control-label" for="wholshipperName">Shipper Name</label>
                                        <input type="text" class="form-control" id="wholshipperName" name="wholshipperName" placeholder="Shipper Name" data-parsley-required="true">
                                    </div> 

                                    <div class="form-group">
                                        <label class="control-label" for="wholrecieverAddress">Package Reciever Address</label>
                                        <input type="text" class="form-control" id="wholrecieverAddress" name="wholrecieverAddress" placeholder="reciever address" data-parsley-required="true">
                                    </div> 

                                    <div class="form-group">
                                        <label class="control-label" for="wholreceiverName">Package Reciever Name</label>
                                        <input type="text" class="form-control" id="wholreceiverName" name="wholreceiverName" placeholder="reciever name" data-parsley-required="true">
                                    </div> 

                                     <div class="form-group">
                                        <label class="control-label" for="wholcost">Vaccine Cost</label>
                                        <input type="number" class="form-control" id="wholcost" name="wholcost" placeholder="Cost" data-parsley-required="true">
                                    </div>


                                     <div class="form-group float-right">
                                        <button type="reset" class="btn btn-default waves-effect">Reset</button>
                                        <button type="button" id="updateWholsaler" class="btn btn-primary">Submit</button>
                                    </div>
                                </fieldset>
                            </form>

                            <!-- Distributer Form -->
                            <form id="distributerForm" class="mfp-hide white-popup-block">
                                <h1>Vaccine Distributer Details</h1><br>
                                <fieldset style="border:0;">

                                    <div class="form-group">
                                        <label class="control-label" for="disdescription">Package Description</label>
                                        <input type="text" class="form-control" id="disdescription" name="disdescription" placeholder="Description" data-parsley-required="true">
                                    </div> 

                                    <div class="form-group">
                                        <label class="control-label" for="disquantity"> Quantity (in dose)</label>
                                        <input type="number" class="form-control" id="disquantity" name="disquantity" placeholder="Quantity" data-parsley-required="true">
                                    </div> 

                                    <div class="form-group">
                                        <label class="control-label" for="disreceivedDateTime">Package Recieved Datetime</label>
                                        <input type="text" class="form-control datepicker-master" id="disreceivedDateTime" name="disreceivedDateTime" placeholder="Recieved Datetime" data-parsley-required="true">
                                    </div>

                                    <div class="form-group">
                                        <label class="control-label" for="disshipperName">Shipper Name</label>
                                        <input type="text" class="form-control" id="disshipperName" name="disshipperName" placeholder="Shipper Name" data-parsley-required="true">
                                    </div> 

                                    <div class="form-group">
                                        <label class="control-label" for="disrecieverAddress">Package Reciever Address</label>
                                        <input type="text" class="form-control" id="disrecieverAddress" name="disrecieverAddress" placeholder="reciever address" data-parsley-required="true">
                                    </div> 

                                    <div class="form-group">
                                        <label class="control-label" for="disreceiverName">Package Reciever Name</label>
                                        <input type="text" class="form-control" id="disreceiverName" name="disreceiverName" placeholder="reciever name" data-parsley-required="true">
                                    </div> 

                                     <div class="form-group">
                                        <label class="control-label" for="discost">Vaccine Cost</label>
                                        <input type="number" class="form-control" id="discost" name="discost" placeholder="Cost" data-parsley-required="true">
                                    </div>


                                     <div class="form-group float-right">
                                        <button type="reset" class="btn btn-default waves-effect">Reset</button>
                                        <button type="button" id="updateDistributer" class="btn btn-primary">Submit</button>
                                    </div>
                                </fieldset>
                            </form>


                            <!-- Pharma Form -->
                            <form id="pharmaForm" class="mfp-hide white-popup-block">
                                <h1>Pharmacy Details</h1><br>
                                <fieldset style="border:0;">
                                    <div class="form-group">
                                        <label class="control-label" for="pharquantityRecieved">Vaccine Quantity Received (in dose)</label>
                                        <input type="number" class="form-control" id="pharquantityRecieved" name="pharquantityRecieved" placeholder="Quantity" data-parsley-required="true">
                                    </div> 
                                    <div class="form-group">
                                        <label class="control-label" for="phardescription">Vaccine Package Description</label>
                                        <input type="text" class="form-control" id="phardescription" name="phardescription" placeholder="Description" data-parsley-required="true">
                                    </div>                               
                                    <div class="form-group">
                                        <label class="control-label" for="phararrivalDateTime">Vaccine Package Arrival Datetime</label>
                                        <input type="text" class="form-control datepicker-master" id="phararrivalDateTime" name="phararrivalDateTime" placeholder="Arrival Datetime" data-parsley-required="true">
                                    </div>
                               
                                    <div class="form-group">
                                        <label class="control-label" for="pharcost">Vaccine Cost (in Rs.)</label>
                                        <input type="number" class="form-control" id="pharcost" name="pharcost" placeholder="Cost" data-parsley-required="true">
                                    </div>
                                              
                                    <div class="form-group">
                                        <label class="control-label" for="pharsenderAddress">Package Sender Address</label>
                                        <input type="text" class="form-control" id="pharsenderAddress" name="pharsenderAddress" placeholder="Sender Address" data-parsley-required="true">
                                    </div>

                                     <div class="form-group float-right">
                                        <button type="reset" class="btn btn-default waves-effect">Reset</button>
                                        <button type="button" id="updatePharma"class="btn btn-primary">Submit</button>
                                    </div>
                                </fieldset>
                            </form>
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
            <!-- /.container-fluid -->

            <script type="text/javascript">
            var switchery;
            $(document).ready(function(){
                initSwitch();
                initDateTimePicker();
            });

            function initSwitch(){
                /*For User Form Pop Up*/
                switchery = new Switchery($("#isActive")[0], $("#isActive").data());    
            }

            function initDateTimePicker(){
                $('.datepicker-master').datetimepicker({
                    format: 'dd-mm-yyyy hh:ii:ss',
                    weekStart: 1,
                    todayBtn:  1,
                    autoclose: 1,
                    todayHighlight: 1,
                    startView: 2,
                    forceParse: 0,
                    showMeridian: 1,
                    minuteStep: 1
                });
            }
        </script>
        
<?php include('templates/_footer.php');?> 