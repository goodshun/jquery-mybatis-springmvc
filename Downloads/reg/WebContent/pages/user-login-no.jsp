<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>用户登录失败</title>
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<link rel="stylesheet" href="assets/css/style.css"> 
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
  </head>
    <script type="text/javascript" src="<%=basePath%>/js/jquery-1.8.3.js"></script>
  <script src="<%=basePath%>/js/My97DatePicker/WdatePicker.js" ></script> 
  <script type="text/javascript">
// 用户名合法性的判断
  $(function(){
		$("#phone_number").blur(function(){
				var phone = $("#phone_number").val();
				var len = $("#phone_number").val().length;
				if(len==0||phone==null){
							$("#userNameError").html("手机号不能为空！");
							$("#loginFrm").attr("onsubmit","return false");
							}
					});
			});
			
// 密码合法性的判断
  	$(function(){
		$("#pwd").blur(function(){
			var len = $("#pwd").val().length;
			if(len==0){
				$("#pwdError").html("密码不能为空！");
				$("#loginFrm").attr("onsubmit","return false");
				}
			})
  	  	})
  	  
  	  function check(){  
  	     fr=document.form1;  
  	     if(fr.phone_mobile.value==""){  
  	        fr.phone_mobile.focus();  
  	        return false;  
  	     }  
  	     if((fr.login_password.value!="")){  
  	             fr.pwd1.focus();  
  	             return false;  
  	     }
  	       fr.submit();
  	     }
  </script>
  <body>
  <span>用户名或者密码错误！</span>
    <div class="page-container">
            <h1>登录</h1>
            <form name="form1" id="loginFrm" action="userLogin.action" method="post" onsubmit="">
              手机号:<input type="text" name="phone_mobile" id="phone_number"><span style="color: red;" id="userNameError"></span><br>
            密&nbsp;&nbsp;&nbsp;&nbsp;码:<input type="password" name="login_password" id="pwd" ><span style="color: red;" id="pwdError"></span>
                <button type="submit" class="submit_button" onclick="return check()">登录</button>
            </form>
			<br><br><br>
			<h2><a href="pages/register.jsp">注册</a></h2>
        </div>
  
  </body>
</html>
