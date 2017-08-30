<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>待租赁农场</title>
<script type="text/javascript" src="${pageContext.request.contextPath}/public/Common.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/public/echarts.min.js"></script>
<link type="text/css" rel="stylesheet" href="css/form.css" charset="GBK" />
<script type="text/javascript" src="js/beTranFarm.js"></script>
<style type="text/css">
   .showTabe{
    height:313px;
   	width: 22.93%;
    margin: 0 1% 1% 1%;
    float: left;
    border: 1px solid #E9E9E9;
    position: relative;
   }

</style>
</head>
<body>
	<div style="height: 100%; width: 100%;">
	
		<div
			style="height: 400px; margin-top: 5px; background-color: #fofcff;"
			id="form_list">
			<div style="background-color: #ffffff; display: none;" class="product-grid"
				farm_id="" onclick="showDetail(this)">

				<div class="product-pic">
					<a href="#"><img class="farm_photo" style="height: 195px;"
						src="<%=request.getContextPath()%>/img/form2.jpg"
						title="product-name" /></a>

					<li class="product-name farm_name">山水田园</li>
					<p>
						面积: <span class="product-in farm_size"> 20亩</span> <br> 地址:<span
							class="product-in farm_address">南京东路235号</span>
					</p>
				</div>
				<div class="product-info">
					<div class="product-info-cust  farm_more" order_id="" farm_price="" farm_phone="" farm_state="" farm_out_time="" start_time="" end_time="" user_id="" detail_id="">
					</div>
					 <div class="product-info-price">
					</div> 
					<div class="clear"></div>
				</div>
				<div class="more-product-info" onclick="addCar(this)" title="加入购物车" style="display: none;">
					<span> </span>
				</div>

			</div>

		</div>
			<div style="width: 100%;height: 1px;background: #ccc;margin-top: 1px;margin-bottom: 5px;"></div>	
			<div style="width: 100%;height: 300px;"> 
				<div class="showTabe" id="showDetail">
					<form class="form-horizontal" id="detailfrom">
			<div class="panel panel-default">
				<div class="panel-heading">
           			 <label>农场详情</label>
        		</div>
				<div class="panel-body">
					<div class="col-md-12">
						<div class="form-group">
							<label class="col-md-4 control-label">农场名称：</label>
							<div class="input-group col-md-8">
								<input class="form-control" name="REQUIREMENT_TITLE"data-rule="required;" id="add_farm_name">
							</div>
						</div>
					</div>
					<div class="col-md-12">
						<div class="form-group">
							<label class="col-md-4 control-label">农场大小：</label>
							<div class="input-group col-md-8">
								<input class="form-control" name="REPORTER"
									data-rule="required;" id="add_farm_size">
							</div>
						</div>
					</div>
					<div class="col-md-12">
						<div class="form-group">
							<label class="col-md-4 control-label">农场地址：</label>
							<div class="input-group col-md-8">
								<input class="form-control" name="REPORTER_PHONE"
									data-rule="required;" id="add_farm_address">
							</div>
						</div>
					</div>
					<div class="col-md-12">
						<div class="form-group">
							<label class="col-md-5 control-label">租赁价格(元/年)：</label>
							<div class="input-group col-md-7">
								<input class="form-control" name="REPORTER_ADDRESS"
									data-rule="required;" id="add_farm_price">
							</div>
						</div>
					</div>

					<div class="col-md-12">
						<div class="form-group">
							<label class="col-md-4 control-label">联系方式：</label>
							<div class="input-group col-md-8">
								<input class="form-control" name="RECEIVER"
									data-rule="required;" id="add_farm_phone">
							</div>
						</div>
					</div>
					<div class="col-md-12 detail-show" ">
						<div class="form-group">
							<label class="col-md-4 control-label">农场状态：</label>
							<div class="input-group col-md-8">
								<input class="form-control" name="RECEIVER"
									data-rule="required;" id="add_farm_state">
							</div>
						</div>
					</div>
					<div class="col-md-12 detail-show" ">
						<div class="form-group">
							<label class="col-md-4 control-label">开始时间：</label>
							<div class="input-group col-md-8">
								<input class="form-control" name="RECEIVER"
									data-rule="required;" id="add_farm_time">
							</div>
						</div>
					</div>
				<div class="col-md-12 detail-show" ">
						<div class="form-group">
							<label class="col-md-4 control-label">到期时间：</label>
							<div class="input-group col-md-8">
								<input class="form-control" name="RECEIVER"
									data-rule="required;" id="add_farm_intime">
							</div>
						</div>
					</div>
				</div>
			</div>
		</form>
				</div>
				<div class="showTabe">
						<form class="form-horizontal" id="">
						<div class="panel panel-default">
						<div class="panel-heading">
           			 	<label>作物详情</label>
        				</div>
					<div class="panel-body">
						<div style="width: 100%;height: 251px;" id="foodcount_watch"></div>
						
						</div>
					</div>
					</form>
				</div>
				
				<div class="showTabe">
					
					
						<div class="panel panel-default">
						<div class="panel-heading">
           			 	<label>更新作物	</label>
        				</div>
					<div class="panel-body">
						<div class="form-group">
							<label class="col-md-6 control-label">更新土豆产量（kg）：</label>
							<div class="input-group col-md-6">
								<input class="form-control" name="RECEIVER"
									data-rule="required;" id="update_tudou">
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-6 control-label">更新玉米产量（kg）：</label>
							<div class="input-group col-md-6">
								<input class="form-control" name="RECEIVER"
									data-rule="required;" id="update_yumi">
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-6 control-label">更新稻谷产量（kg）：</label>
							<div class="input-group col-md-6">
								<input class="form-control" name="RECEIVER"
									data-rule="required;" id="update_daogu">
							</div>
						</div>
						<div class="form-group">
							<label class="col-md-6 control-label">更新其他产量（kg）：</label>
							<div class="input-group col-md-6">
								<input class="form-control" name="RECEIVER"
									data-rule="required;" id="update_qita">
							</div>
						</div>
						<div class="panel-footer text-right js-buttons-view" style="height:125px;">
           				 <button type="submit" class="btn btn-default" onclick="updateFood()">提交</button>
        				</div>
        				</div>
					</div>
					
        			
				</div>
					<div class="showTabe">
					
					
						<div class="panel panel-default">
						<div class="panel-heading">
           			 	<label>给租赁者的消息	</label>
        				</div>
					<div class="panel-body">
					<div class=" clear-white">
                        <textarea id="message_Content" class="form-control" placeholder="100字以内" style="height: 200px; resize:none;" data-rule="required;email;length[10~,true]"></textarea>
                    </div>
					
					<div class="panel-footer text-right js-buttons-view">
           				 <button type="submit" class="btn btn-default" onclick="sendMessage()">提交</button>
        			</div>
        				</div>
					</div>
				
        			
				</div>
				
				
		
			</div>
		
		</div>




</body>
</html>