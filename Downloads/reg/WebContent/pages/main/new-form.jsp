<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/public/Common.js"></script>
<script type="text/javascript">var ContextPath = '${pageContext.request.contextPath}';</script>
<script type="text/javascript" src="<%=request.getContextPath()%>/pages/main/js/newForm.js"></script>
<link type="text/css" rel="stylesheet" href="css/form.css" charset="GBK"/>
<style type="text/css">
.message {
	cursor: pointer;
}
.max {
	height: 100%;
	width: 100%;
}
</style>
</head>
<body>
	<div style="height: 100%; width: 100%;">
		<div style="height: 100%; width: 69.9%; float: left;">
			<div id="myCarousel" class="carousel slide" data-ride="carousel"
				style="height: 300px;">
				<!-- Indicators -->
				<ol class="carousel-indicators">
					<li data-target="javascript:;" data-slide-to="0" class="active"></li>
					<li data-target="javascript:;" data-slide-to="1"></li>
					<li data-target="javascript:;" data-slide-to="2"></li>
				</ol>

				<!-- Wrapper for slides -->
				<div class="carousel-inner" role="listbox">
					<div class="item active">
						<img src="<%=request.getContextPath()%>/img/farm6.jpg"
							style="height: 300px; width: 100%;" alt="First slide">
						<div class="carousel-caption">
							<h3 id="first-slide-label">
								<a class="anchorjs-link"
									href="#first-slide-label"> <span class="anchorjs-icon"></span>
								</a>
							</h3>
							
						</div>
					</div>
					<div class="item">
						<img src="<%=request.getContextPath()%>/img/form2.jpg"
							style="height: 300px; width: 100%;" alt="Second slide">
						<div class="carousel-caption">...</div>
					</div>
					<div class="item">
						<img src="<%=request.getContextPath()%>/img/form3.jpg"
							style="height: 300px; width: 100%;" alt="Third slide">
						<div class="carousel-caption">...</div>
					</div>
				</div>

				<!-- Controls -->
				<a class="left carousel-control" href="javascript:;" role="button"
					data-slide="prev"> <span
					class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
					<span class="sr-only">Previous</span>
				</a> <a class="right carousel-control" href="javascript:;" role="button"
					data-slide="next"> <span
					class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
					<span class="sr-only">Next</span>
				</a>
			</div>
			<div style="height: 500px; margin-top: 5px; background-color: #fofcff;" id="form_list">

				<div style="background-color: #ffffff; display: none;"
					class="product-grid" farm_id="">

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
							<a href="#" onclick="transFarm(this)"> 立即租赁</a>
						</div>
						<div class="clear"></div>
					</div>
					<div class="more-product-info" onclick="addCar(this)" title="加入购物车">
						<span> </span>
					</div>

				</div>

			</div>
			  <div class="col-md-12" style="text-align: center;" >
              <div id="pagination"></div>
          	 </div>
		</div>
		<div
			style="height: 100%; width: 30%; float: right; min-height: 900px; border-radius: 15px; background-color: #eee">
			<ul class="list-group">
				<li class="list-group-item" style="color: #0085d0; font-size: 18px;">
					<span class="badge">0</span>消息通知
				</li>
			
			</ul>

		</div>
	</div>
</body>
</html>