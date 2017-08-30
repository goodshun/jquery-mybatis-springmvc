<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>个人资料卡</title>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/public/Common.js"></script>
<script type="text/javascript">var ContextPath = '${pageContext.request.contextPath}';</script>
<script type="text/javascript">
var phone = "${sessionScope.u.phone_mobile}";	//ID
$(document).ready(function() {
	fish.setLanguage("zh");
	sessionStorage.setItem(phone);
$('#userInfoForm').form({
    validate: 1
});
});
function saveUserInfo(){
	
  var isOk=  $('#userInfoForm').isValid();
  if(isOk==false)
	 {
	  fish.info({
			title:'提示信息',
			message:"请输入完整信息"
		});
	  return false ;
	 }
    var params = {};
	params.user_id =sessionStorage.getItem("user_id"); 
	params.user_name= $('#user_name').val();
	params.user_sex=$('#user_sex option:selected').text();
	params.user_address=$('#user_address').val();
	params.user_email=$('#user_email').val();
	params.user_bank_name=$('#user_bank_name').val();
	params.user_bank_count=$('#user_bank_count').val();
	params.user_money='0';
	$.ajax({
		   data: JSON.stringify(params),
		   contentType: "application/json"  ,
		   dataType: "text",
		   type:"POST",
		   url:"/reg/saveUserInfo.action",
		   success:function(data){ 
			   fish.info({
					title:'提示信息',
					message:"注册成功，3秒后跳转至登录页面 "
				});
			   setTimeout("jumpPage()",1000*3);
		      }
	   }); 
 
}
function jumpPage(){
	window.location.href="/reg/index.jsp";
}
</script>
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
     <form class="form-horizontal" id="userInfoForm" target="nm_iframe" method="post">
    <div class="panel panel-default">
        <div class="panel-heading">
            <label>个人资料填写</label>
        </div>
        <div class="panel-body">
            <div class="col-md-6">
                <div class="form-group">
                    <label class="col-md-4 control-label">用户名称</label>
                    <div class="col-md-8">
                        <input id="user_name" class="form-control" data-rule="required;">
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label class="col-md-4 control-label">用户性别</label>
                        <div class="col-md-8">
                        <select class="form-control" id="user_sex" data-rule="required">
                            <option value="" selected="selected">请选择</option>
                            <option value="M">男性</option>
                            <option value="W">女性</option>
                        </select>
                    </div>
                    </div>
              </div>
            
            <div class="col-md-6">
                <div class="form-group">
                    <label class="col-md-4 control-label">用户地址</label>
                    <div class="col-md-8">
                        <input name="" id="user_address" class="form-control" data-rule="required;">
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label class="col-md-4 control-label">用户邮箱</label>
                    <div class="col-md-8">
                        <input name="email"  id="user_email" class="form-control" data-rule="required;email">
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label class="col-md-4 control-label">银行名称</label>
                    <div class="col-md-8">
                        <input name="bank_name" id="user_bank_name" class="form-control" data-rule="required">
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label class="col-md-4 control-label">银行账号</label>
                    <div class="col-md-8">
                        <div class="input-group">
                            <input class="form-control" id="user_bank_count" type="text" data-rule="required">
                        </div>
                    </div>
                </div>
            </div>
        
            
        </div>
        <div class="panel-footer text-right js-buttons-view">
            <button type="submit" class="btn btn-default" onclick="saveUserInfo();">提交</button>
        </div>
    </div>
</form>
<iframe id="id_iframe" name="nm_iframe" style="display:none;"></iframe>  
	</div>
</body>
</html>