<?php include('templates/_header.php');?>
<?php 
     if(!isset($_GET['batchNo']) || (isset($_GET['batchNo']) && $_GET['batchNo']=='') &&
        !isset($_GET['txn']) || (isset($_GET['txn']) && $_GET['txn']=='')){
        echo "<script>window.location = 'index.php';</script>";
     }   
?>
<style type="text/css">
    .verified_info{
        color: green;
    }
</style>
<div class="container-fluid">
        <div class="row bg-title">
            <div class="col-lg-6 col-md-4 col-sm-4 col-xs-12">
                <h3 class="page-title">Batch Progress <a href="javascript:void(0);" onclick="javascript:window.print();" class="text-info" title="Print Page Report"><i class="fa fa-print"></i> Print</a></h3> 
                <h4><b>Batch No: </b><?php echo $_GET['batchNo'];?></h4>
            </div>
            <div class="col-lg-6 col-sm-8 col-md-8 col-xs-12">

            </div>
            <!-- /.col-lg-12 -->
        </div>
        <!-- .row -->
        <div class="row">
            <div class="col-md-12">
                <div class="white-box">
                    <ul class="timeline">
                        <li>
                            <div class="timeline-badge danger">
                                <i class="fa fa-check"></i>
                            </div>
                            <div class="timeline-panel" id="batchSection">
                                <div class="timeline-heading">
                                    <h4 class="timeline-title">Vaccine Batch Details</h4>
                                    <p><small class="text-muted text-success activityDateTime"></small> </p>
                                    <!-- <span class="activityQrCode"></span> -->
                                </div>
                                <div class="timeline-body">
                                    <table class="table activityData table-responsive" >
                                        <tr>
                                            <td colspan="2"><p>Information Not Avilable</p></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </li>
                        <li class="timeline-inverted">
                            <div class="timeline-badge danger">
                                <i class="fa fa-times"></i>
                            </div>
                            <div class="timeline-panel" id="supplierSection">
                                <div class="timeline-heading">
                                    <h4 class="timeline-title">Supplier</h4>
                                    <p><small class="text-muted text-success activityDateTime"></small> </p>
                                    <!-- <span class="activityQrCode"></span> -->
                                </div>
                                <div class="timeline-body">
                                    <table class="table activityData table-responsive">
                                        <tr>
                                            <td colspan="2"><p>Information Not Avilable</p></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </li>
                        <li>
                           <div class="timeline-badge danger">
                                <i class="fa fa-times"></i>
                            </div>
                            <div class="timeline-panel" id="manufacturerSection">
                                <div class="timeline-heading">
                                    <h4 class="timeline-title">Manufacturer</h4>
                                    <p><small class="text-muted text-success activityDateTime"></small> </p>
                                    <!-- <span class="activityQrCode"></span> -->
                                </div>
                                <div class="timeline-body">
                                    <table class="table activityData table-responsive" >
                                        <tr>
                                            <td colspan="2"><p>Information Not Avilable</p></td>
                                        </tr>
                                    </table>        
                                </div>
                            </div>
                        </li>
                        <li class="timeline-inverted">
                            <div class="timeline-badge danger">
                                <i class="fa fa-times"></i>
                            </div>
                            <div class="timeline-panel" id="wholesalerSection"> 
                                <div class="timeline-heading">
                                    <h4 class="timeline-title">Wholesaler</h4>
                                    <p><small class="text-muted text-success activityDateTime"></small> </p>
                                    <!-- <span class="activityQrCode"></span> -->
                                </div>
                                <div class="timeline-body">
                                    <table class="table activityData table-responsive">
                                        <tr>
                                            <td colspan="2"><p>Information Not Avilable</p></td>
                                        </tr>
                                    </table>  
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="timeline-badge danger">
                                <i class="fa fa-times"></i>
                            </div>
                            <div class="timeline-panel" id="distributerSection">
                                <div class="timeline-heading">
                                    <h4 class="timeline-title">Distributer</h4>
                                    <p><small class="text-muted text-success activityDateTime"></small> </p>
                                    <!-- <span class="activityQrCode"></span> -->
                                </div>
                                <div class="timeline-body">
                                   <table class="table activityData table-responsive" >
                                        <tr>
                                            <td colspan="2"><p>Information Not Avilable</p></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </li>
                        <li class="timeline-inverted">
                            <div class="timeline-badge danger">
                                <i class="fa fa-times"></i>
                            </div>
                            <div class="timeline-panel" id="pharmaSection">
                                <div class="timeline-heading">
                                    <h4 class="timeline-title">Pharma</h4>
                                    <p><small class="text-muted text-success activityDateTime"></small> </p>
                                    <!-- <span class="activityQrCode"></span> -->
                                </div>
                                <div class="timeline-body">
                                    <table class="table activityData table-responsive" >
                                        <tr>
                                            <td colspan="2"><p>Information Not Avilable</p></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- /.row -->
        <!-- .right-sidebar -->
        <div class="right-sidebar">
            <div class="slimscrollright">
                <div class="rpanel-title"> Service Panel <span><i class="ti-close right-side-toggle"></i></span> </div>
                <div class="r-panel-body">
                    <ul>
                        <li><b>Layout Options</b></li>
                        <li>
                            <div class="checkbox checkbox-info">
                                <input id="checkbox1" type="checkbox" class="fxhdr">
                                <label for="checkbox1"> Fix Header </label>
                            </div>
                        </li>
                        <li>
                            <div class="checkbox checkbox-warning">
                                <input id="checkbox2" type="checkbox" checked="" class="fxsdr">
                                <label for="checkbox2"> Fix Sidebar </label>
                            </div>
                        </li>
                        <li>
                            <div class="checkbox checkbox-success">
                                <input id="checkbox4" type="checkbox" class="open-close">
                                <label for="checkbox4"> Toggle Sidebar </label>
                            </div>
                        </li>
                    </ul>
                    <ul id="themecolors" class="m-t-20">
                        <li><b>With Light sidebar</b></li>
                        <li><a href="javascript:void(0)" theme="default" class="default-theme">1</a></li>
                        <li><a href="javascript:void(0)" theme="green" class="green-theme">2</a></li>
                        <li><a href="javascript:void(0)" theme="gray" class="yellow-theme">3</a></li>
                        <li><a href="javascript:void(0)" theme="blue" class="blue-theme">4</a></li>
                        <li><a href="javascript:void(0)" theme="purple" class="purple-theme">5</a></li>
                        <li><a href="javascript:void(0)" theme="megna" class="megna-theme working">6</a></li>
                        <li><b>With Dark sidebar</b></li>
                        <br/>
                        <li><a href="javascript:void(0)" theme="default-dark" class="default-dark-theme">7</a></li>
                        <li><a href="javascript:void(0)" theme="green-dark" class="green-dark-theme">8</a></li>
                        <li><a href="javascript:void(0)" theme="gray-dark" class="yellow-dark-theme">9</a></li>
                        <li><a href="javascript:void(0)" theme="blue-dark" class="blue-dark-theme">10</a></li>
                        <li><a href="javascript:void(0)" theme="purple-dark" class="purple-dark-theme">11</a></li>
                        <li><a href="javascript:void(0)" theme="megna-dark" class="megna-dark-theme">12</a></li>
                    </ul>
                   
                </div>
            </div>
        </div>
        <!-- /.right-sidebar -->
</div>
<input type="hidden" id="batchNo" value="<?php $batchNo = isset($_GET['batchNo'])?$_GET['batchNo']:''; echo $batchNo;?>">

<?php include('templates/_footer.php');?>           