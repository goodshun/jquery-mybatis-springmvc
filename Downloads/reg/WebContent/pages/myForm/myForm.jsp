<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script type="text/javascript"
	src="${pageContext.request.contextPath}/public/Common.js"></script>
	<script type="text/javascript" src="/reg/public/ajaxfileupload.js"></script>
<title>Insert title here</title>
<script type="text/javascript">
$(document).ready(function(e) {  
    $('body').on('change',$('#ImportPicInput'),function(){  
          $( "#importPicName").val($( "#ImportPicInput").val());  
          $.ajaxFileUpload({  
        	    type: "POST",  
        	    url: "/reg/saveorupdate.action",  
        	    data:{},//要传到后台的参数，没有可以不写  
        	    secureuri : false,//是否启用安全提交，默认为false  
        	    fileElementId:'ImportPicInput',//文件选择框的id属性  
        	    //dataType: 'json',//服务器返回的格式  
        	    dataType:"text",
        	    async : false,  
        	    success: function(data){  
        	       if(data=="empty") console.log("文件不能为空");
        	       else if(data=="systemBug") console.log("系统出错请重试");
        	       else  $('#farm_photo').attr("src",data);
        	    },  
        	    error: function (data, status, e){ 
        	    	console.log("444");
        	    	console.log(data);
        	        //coding  
        	    }, 
        	}); 
    });  
});  


</script>
</head>
<body>
 <input type ="file" id="ImportPicInput" name= "myfile" style=" display: none" />  
      <div class ="input-append">  
             <label for ="importPicName"> 上传原始图片：</label >  
             <input type ="text" class="input-large" id= "importPicName" />  
             <a class ="btn btn-default" onclick= "$('#ImportPicInput').click();" > 打开</ a>  
      </div >  
      <img src="" style="height:100px;width: 100px; display: none;" id="farm_photo"/>
</body>
</html>