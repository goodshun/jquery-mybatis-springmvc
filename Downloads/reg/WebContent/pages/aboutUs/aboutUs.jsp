<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
	<script type="text/javascript" src="${pageContext.request.contextPath}/public/Common.js"></script>
	<script type="text/javascript">
	
	
	//发送消息
	function sendMessage(){
		
		var params={};
		params.sender_id=   sessionStorage.getItem("user_id");		
		params.message_content = $('#message_Content').val();
		params.message_type ="S";
		if((params.message_content).length>100 ||  params.message_content==""){
			 fish.info({
					title:'提示信息',
					message:"请按要求输入"
				});
		}
		$.ajax({
			   data: JSON.stringify(params),
			   contentType: "application/json"  ,
			   dataType: "text",
			   type:"POST",
			   url:"/reg/sendOrderMessage.action",
			   success:function(data){ 
				   $('#message_Content').val("")
				   fish.info({
						title:'提示信息',
						message:data
					});
			      }
		   });
	}

	</script>
</head>
<body>
<div class="main">
	<div class="panel panel-default">
		<div class="panel-body">
			<div class="panel-heading">
            <a href="#" style="font-size: 32px;">	<img src="${pageContext.request.contextPath}/images/log-2.png"/>  农场服务系统简介</a
        	</div>
			<div style="height: 2px;width: 100%;background-color: #555555"></div>
			<div style="margin-top: 30px;font-size: 20px;">
			&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;随着人们的生活水平的提高，农村种植养殖等越来越少，荒废的农场也越来越多，浪费相当严重；同时城市生活节奏的越来越快速，人们开始向往农村的生活。城市的蔬菜等食物也隐隐存在很多安全隐患很多人吃的不放心不安心，很多人都想体验种植的乐趣以及吃到自己放心的食物，然而由于时间问题，农场问题等因素，无法实现。同时伴随着互联网的快速发展，人们的生活越来越偏向于网络世界，很多东西都可以通过互联网实现。农场服务系统是一个帮助人们游走于虚拟与现实田园生活的很好的一个桥梁，它利用计算机对农场进行统一的管理，实现人们对农场的管理的规范化，系统化，同时帮助提高了农场租赁的效率，提高了人们的生活水品。
			
			</div>
		</div>
	</div>
	<div style="width: 100%;height: 300px;display: none;">
	      <div class="col-md-12" style="margin-top: 40px;">
                <div class="form-group">
                    <label class="col-md-2 control-label" style="text-align: center;    font-size: 21px;">您的意见:</label>
                    <div class="col-md-10 clear-white">
                        <textarea id="message_Content" class="form-control"placeholder="100字以内" style="height: 200px; resize:none;" data-rule="required;email;length[10~,true]"></textarea>
                    </div>
                </div>
            </div>
        
        <div class="panel-footer text-right js-buttons-view">
            <button type="submit" class="btn btn-default" onclick="sendMessage()">提交</button>
        </div>
	</div>
</div>
</body>
</html>