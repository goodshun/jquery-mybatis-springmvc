<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>用户注册</title>
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
/*   $(function(){
		$("#phone_number").blur(function(){
				var phone = $("#phone_number").val();
				var len = $("#phone_number").val().length;
				$.getJSON("userJudge.action",{"phone_mobile":phone},function(data){
						if(data!=null){
							alert("手机号已注册，青重新输入！！");
							$("#userNameError").html("手机号已注册！");
							$("#regFrm").attr("onsubmit","return false");
							
						}else if(len==0||phone==null){
							$("#userNameError").html("手机号不能为空！");
							$("#regFrm").attr("onsubmit","return false");
							}
						else if (!checkContactNumber()) { 
							  $("#userNameError").html("不符合手机号格式！");
							  $("#regFrm").attr("onsubmit","return false");
							} 
						else{
							$("#userNameError").html("恭喜！手机号可用！")
							$("#regFrm").attr("onsubmit","return true");
								}
					});
			});
	  	}); */
// 密码合法性的判断
  	$(function(){
		$("#pwd").blur(function(){
			var len = $("#pwd").val().length;
			if(len==0){
				$("#pwdError").html("密码不能为空！");
				$("#regFrm").attr("onsubmit","return false");
				}
			if(len>0&&len<6){
				$("#pwdError").html("密码位数最少为6位！");
				$("#regFrm").attr("onsubmit","return false");
				}
			if(len>=6){
				$("#pwdError").html("密码格式正确！");
				$("#regFrm").attr("onsubmit","return true");
				}
			})
  	  	})
// 确认两次密码
	$(function(){
		$("#conpwd").blur(function(){
		var oldpwd = $("#pwd").val();
		var conpwd = $("#conpwd").val();
		var number = $("#conpwd").val().length;
		if(number == 0){
			$("#pwdError").html("密码不能为空！");
			$("#regFrm").attr("onsubmit","return false");
		}
		else if(oldpwd!=conpwd){
				$("#conpwdError").html("两次密码不一致！");
				$("#regFrm").attr("onsubmit","return false");
			}else{
				$("#conpwdError").html("密码符合！");
				$("#regFrm").attr("onsubmit","return true");
			}
		})
	})
	function check(){  
 	     fr=document.reg;  
 	     if(fr.phone_mobile.value==""){  
 	        fr.phone_mobile.focus();  
 	        return false;  
 	     }  
 	     if((fr.login_password.value=="")){  
 	             fr.login_password.focus(); 
 	             return false;  
 	     }
 	    if((fr.login_password2.value=="")){  
             fr.login_password2.focus(); 
             return false;  
     }
 	       fr.submit();
 	     }
    function checkContactNumber() {  
        var mobile = $.trim($("#phone_number").val());  
        var isMobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/;  
            if (!isMobile.exec(mobile) && mobile.length != 11) {  
                $("#phone_number").focus();  
                return false;  
            }  
        return true;  
        }  
  </script>
  <body>
    <!-- <form id="regFrm" action="userReg.action" method="post" onsubmit="">
    	用户名：<input type="text" name="userName" id="uname"><span style="color: red;" id="userNameError"></span><br/>
    	密码：<input type="password" name="password" id="pwd"><span style="color: red;" id="pwdError"></span><br/>
    	确认密码：<input type="password" id="conpwd"><span style="color: red;" id="conpwdError"></span><br/>
    	生日<input type="text" name="birthday" onClick="WdatePicker()" class="Wdate"><br/>
    	<input type="submit" value="注册">
    </form> -->
    <div class="page-container">
            <h1>用户注册</h1>
          <!--   <form id="regFrm" action="userReg.action" method="post" onsubmit="">
              用户名:<input type="text" name="userName" class="username" >
            密&nbsp;&nbsp;&nbsp;&nbsp;码:<input type="password" name="password" class="password" >
                <button type="submit" class="submit_button">登录</button> -->
                <form name="reg" id="regFrm" action="userReg.action" method="post" onsubmit="">
                手机号：<input type="text" name="phone_mobile" id="phone_number"><span style="color: red;" id="userNameError"></span><br/>
    	密码：<input type="password" name="login_password" id="pwd"><span style="color: red;" id="pwdError"></span><br/>
    	确认密码：<input type="password" name="login_password2" id="conpwd"><span style="color: red;" id="conpwdError"></span><br/>
    	 <button type="submit" class="submit_button" onclick="return check()">注册</button>
            </form>
        </div>
  </body>
</html>
