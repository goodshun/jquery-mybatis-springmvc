<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>登录成功</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<script type="text/javascript" src="${pageContext.request.contextPath}/public/Common.js"></script>
	<script type="text/javascript">
		var ContextPath = '${pageContext.request.contextPath}';
		var phone = "${sessionScope.u.phone_mobile}";	//ID

	</script>
	<script type="text/javascript" src="<%=request.getContextPath()%>/pages/main/js/main.js"></script>
 	<link type="text/css" rel="stylesheet" href="/reg/public/styles/css/main.css" charset="GBK"/>
  </head>
  <body>
  <!-- headBg begin -->
	<div class="headBg">
		<div class="head">
			<div class="login-text">

				<div class="text"><a class="glyphicon glyphicon-off nav-head-icon" id="logout_btn" href="userExit.action"></a></div>
				<!-- <a href="javascript:void(0);" id="pass_change">修改密码</a>
				<a href="javascript:void(0);" id="logout_btn">退出</a> -->
				<!-- 可切换的岗位列表 -->
			</div>
			<div class="logo">
			 <span class="fa fa-bars js-menu"style="padding: 16px 20px;top: 0;font-size: 15px;line-height: 18px ;z-index: 1;position: relative;color: white;" >
			 <div   style="border: 1px solid #c6c6c6; z-index: 10000;position:absolute;background-color: white; margin-top: 16px; display: none;"> 
			  	<ul id="header_ul_list" class="ui-menu"  >
					<!-- 菜单动态加载 -->
				<!-- <li name="firstMenu" id="menuitem1"  ><a href="javascript:void(0);" menu_id_="1" url_="pages/memberMgr/memberMgr.jsp"  onclick="toMenuPage(this)">会员管理</a></li>	
				<li name="firstMenu" id="menuitem2" ><a href="javascript:void(0);" menu_id_="2" url_="pages/menuMgr/menuMgr.jsp" onclick="toMenuPage(this)">菜单管理</a></li>	 -->
				<li name="firstMenu" id="menuitem4" ><a href="javascript:void(0);" menu_id_="4"  >我的农场</a>
				<ul class="ui-menu">
				<li name="secondMenu" id="menuitem7"><a href="javascript:void(0);" menu_id_="7" url_="pages/myForm/haveTranFarm.jsp" onclick="toMenuPage(this)">已租的农场</a></li>
				<li name="secondMenu" id="menuitem8"><a href="javascript:void(0);" menu_id_="8" url_="pages/myForm/beTranFarm.jsp" onclick="toMenuPage(this)">被租的农场</a></li>
				<li name="secondMenu" id="menuitem9"><a href="javascript:void(0);" menu_id_="9" url_="pages/myForm/waitTranFarm.jsp" onclick="toMenuPage(this)">待租的农场</a></li>
				</ul>
				</li>	
				<li name="firstMenu" id="menuitem5" ><a href="javascript:void(0);" menu_id_="5" >个人中心</a>
				<ul class="ui-menu">
				<li name="secondMenu" id="menuitem7"><a href="javascript:void(0);" menu_id_="10" url_="pages/userCenter/userCenter.jsp" onclick="toMenuPage(this)">我的信息</a></li>
				<li name="secondMenu" id="menuitem8"><a href="javascript:void(0);" menu_id_="11" url_="pages/userCenter/myCar.jsp" onclick="toMenuPage(this)">我的购物车</a></li>
				<li name="secondMenu" id="menuitem9"><a href="javascript:void(0);" menu_id_="12" url_="pages/userCenter/myDetail.jsp" onclick="toMenuPage(this)">我的订单</a></li>
				</ul>
				</li>	
				<li name="firstMenu" id="menuitem6" ><a href="javascript:void(0);" menu_id_="6" url_="pages/aboutUs/aboutUs.jsp" onclick="toMenuPage(this)"> 关于我们</a></li>	
				</ul> 
				</div> 
			</span>
			 
				<img style="height:30px;margin-top:-5px; margin-left: 20px;" src="<%=request.getContextPath()%>/images/log-2.png">
				<span style="font-weight: bold; font-size: 20px;">农场服务系统</span>
			</div>
		</div>
	</div>
	<!-- headBg end -->

	<!-- headNav begin -->
	 <div id="tabs" class="ui-tabs" style="margin-top:2px;" >
            <ul class="ui-tabs-nav ">
                 <li >
                    <a href="showPage_home">租赁中心</a>
                </li> 
                
            </ul>
            	<!-- 首页内容 -->
	<div id ="showPage_home">
		<iframe id="indexPage" name="indexPage" src="" onload="" style="z-index:1" width="100%" height="100%" scrolling ="no"  frameborder="0"></iframe>
	</div>
            </div>
<!-- 	<div class="navBg" style="margin-top: 2px;">
		
	</div> -->
	<!-- 菜单导航(面包屑导航) -->
	<div class="main" style="display: none;">
		<div class="breadCrumb" id="navigaTab" style="display: none;">
			<!-- 首页菜菜单时候默认不展示，进入其他菜单页展示 -->
		</div>
		
  	</div>
	<!-- headNav end -->
	
    		<%-- 欢迎【${sessionScope.u.phone_mobile}】登录<a href="userExit.action">退出</a><br/> --%>

  </body>
</html>
