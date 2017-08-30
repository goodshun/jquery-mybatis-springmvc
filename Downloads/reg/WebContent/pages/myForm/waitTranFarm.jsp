<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>待租赁农场</title>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/public/Common.js"></script>
<link type="text/css" rel="stylesheet" href="css/form.css" charset="GBK" />
<link type="text/css" rel="stylesheet" href="/reg/public/frm/fish-desktop/third-party/fileupload/fileupload.css" charset="GBK" />
<script type="text/javascript" src="/reg/public/ajaxfileupload.js"></script>
<script type="text/javascript" src="js/waitTranFarm.js"></script>
</head>
<body>
	<div style="height: 100%; width: 100%;">
		<div style="width: 100%;height: 30px;">
					<button type="button" class="btn btn-primary"  style="margin:0 auto; float: right;" onclick="addNewFarm()"> 新增农场 </button>
		</div>
			<div style="width: 100%;height: 1px;background: #ccc;margin-top: 1px;"></div>	
		<div
			style="height: 400px; margin-top: 5px; background-color: #fofcff;"
			id="form_list">
			<div style="background-color: #ffffff; display: none;" class="product-grid"
				farm_id="" >

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
					<div class="product-info-cust  farm_more" farm_price="" farm_phone="" farm_state="" farm_out_time="">
						<a href="#" onclick="showDetails(this)">查看详情</a>
					</div>
					 <div class="product-info-price">
						<a href="#" onclick="deleteFarm(this)"> 撤销农场</a>
					</div> 
					<div class="clear"></div>
				</div>
				<div class="more-product-info" onclick="addCar(this)" title="加入购物车" style="display: none;">
					<span> </span>
				</div>

			</div>

		</div>




	</div>

</body>
</html>