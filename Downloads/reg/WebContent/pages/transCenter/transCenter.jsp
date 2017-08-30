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
<link type="text/css" rel="stylesheet" href="css/form.css" charset="GBK"/>
</head>
<body  >
<div style="height: 100%; width: 100%;">
			<div style="background-color: #ffffff;" class="product-grid">

					<div class="product-pic">
						<a href="#"><img src="<%=request.getContextPath()%>/img/form1.jpg"  
							title="product-name" /></a>

						<li class="product-name">山水田园</li>
						<p>
							面积: <span class="product-in"> 20亩</span> <br> 地址:<span
								class="product-in">南京东路235号</span>
						</p>
					</div>
					<div class="product-info">
						<div class="product-info-cust">
							<a href="details.html">Details</a>
						</div>
						<div class="product-info-price">
							<a href="details.html"> 立即租赁</a>
						</div>
						<div class="clear"></div>
					</div>
					<div class="more-product-info">
						<span> </span>
					</div>

		</div>
</div>
</body>
</html>