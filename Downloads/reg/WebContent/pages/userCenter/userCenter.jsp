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

$(document).ready(function() {
	fish.setLanguage("zh");
	getUserInfo();
});
function getUserInfo(){
	
  	$('#userInfoForm').find('input').attr('disabled','disabled');
    var params = {};
	params.user_id =sessionStorage.getItem("user_id"); 
	/* params.user_name= $('#user_name').val();
	params.user_sex=$('#user_sex option:selected').text();
	params.user_address=$('#user_address').val();
	params.user_email=$('#user_email').val();
	params.user_bank_name=$('#user_bank_name').val();
	params.user_bank_count=$('#user_bank_count').val();
	params.user_money='0'; */
	$.ajax({
		   data: JSON.stringify(params),
		   contentType: "application/json"  ,
		   dataType: "json",
		   type:"POST",
		   url:"/reg/getUserInfo.action",
		   success:function(data){ 
			   $('#user_name').val(data[0].user_name);
			   $('#user_sex').val(data[0].user_sex);
			   $('#user_address').val(data[0].user_address);
			   $('#user_email').val(data[0].user_email);
			   $('#user_bank_name').val(data[0].user_bank_name);
			   $('#user_bank_count').val(data[0].user_bank_count);
			   $('#user_money').val(data[0].user_money);
		      }
	   }); 
 
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
            <label>个人资料展示</label>
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
                         <input name=""  id="user_sex" class="form-control" data-rule="required;">
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
        <div class="col-md-6">
                <div class="form-group">
                    <label class="col-md-4 control-label">账户余额</label>
                    <div class="col-md-8">
                        <div class="input-group">
                            <input class="form-control" id="user_money" type="text" data-rule="required">
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="panel-footer text-right js-buttons-view">
           <!--  <button type="submit" class="btn btn-default" onclick="saveUserInfo();">提交</button> -->
        </div>
    </div>
</form>
<iframe id="id_iframe" name="nm_iframe" style="display:none;"></iframe>  
	</div>
</body>
</html>
       