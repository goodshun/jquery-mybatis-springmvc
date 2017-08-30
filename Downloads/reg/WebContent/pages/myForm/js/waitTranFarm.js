$(document).ready(function() {
	fish.setLanguage("zh");
	waitFarmUtil.init();
	
});



var waitFarmUtil={
		params:{},
		init:function(){
			var params = {};
			params.user_id =sessionStorage.getItem("user_id"); 
			$.ajax({
				   data: JSON.stringify(params),
				   contentType: "application/json"  ,
				   dataType: "json",
				   type:"POST",
				   url:"/reg/getWaitTranFarmList.action",
				   success:function(data){ 
					   if(data.length==0){
						   fish.info({
								title:'提示信息',
								message:"暂无数据"
							});
					   }
					   else{
						 showList(data);
					   }
				      }
			   });  
			
		},
		addNewFarm:function(){
			var params={};
			params.farm_name=$('#add_farm_name').val();
			params.farm_size=$('#add_farm_size').val();
			params.farm_address=$('#add_farm_address').val();
			params.farm_price=$('#add_farm_price').val();
			params.farm_photo_url= $('#farm_photo').attr("src");
			if(params.farm_photo_url == "" || params.farm_photo_url==null) {
				fish.info({
					title:'提示信息',
					message:"请选择图片"
				});
				return false;
			}
			params.farm_phone=$('#add_farm_phone').val();
			params.farm_state="00A";
			params.user_id=sessionStorage.getItem("user_id");
			$.ajax({
				   data: JSON.stringify(params),
				   contentType: "application/json"  ,
				   dataType: "json",
				   type:"POST",
				   url:"/reg/addFarm.action",
				   success:function(data){ 
					   $('#addFarmDialog').remove();
					   fish.info({
							title:'提示信息',
							message:"新增成功"
						});
					   $("#form_list .product-grid:gt(0)").remove();
					   showList(data);
				      }
			   });  
		},
}



//增加农场
function addNewFarm(){
	$('#addFarmDialog').remove();
	$.ajax({
		url : 'pop_addFarm.html'
	}).then(function(data) {
		var $dialog = $(data).appendTo('body');
		$dialog.dialog({
			autoOpen : true,
			height : 400,
			width : '50%',
			modal : true
		// width:"auto"//可设置
		});
		$dialog.dialog("open");
		$('#ImportPicInput').on("change",function(){
			uploadPhoto();
		});
		$('#addFarmDialog').form({
			validate : 1
		});
		$("#saveCard").unbind("click").click(function() {
			$('#addFarmDialog').isValid();
			$dialog.dialog("close");
			waitFarmUtil.addNewFarm();
		});
		$('#Cancel').click(function() {
			$dialog.dialog("close");
		});
	});
}
//删除农场
function deleteFarm(dom){
	var params = {};
	params.farm_id= $(dom).parent().parent().parent().attr('farm_id');
	 fish.confirm('确认是否撤销？').result.then(function() {
		 $.ajax({
			   data: JSON.stringify(params),
			   contentType: "application/json"  ,
			   dataType: "text",
			   type:"POST",
			   url:"/reg/deleteFarm.action",
			   success:function(data){ 
				   $(dom).parent().parent().parent().remove();
				   fish.info({
						title:'提示信息',
						message:data
					});
			      }
		   }); 
     });
	 
}
//详细信息
function showDetails(dom){
	$('#addFarmDialog').remove();
	$.ajax({
		url : 'pop_addFarm.html'
	}).then(function(data) {
		var $dialog = $(data).appendTo('body');
		$dialog.dialog({
			autoOpen : true,
			height : 400,
			width : '50%',
			modal : true
		// width:"auto"//可设置
		});
		$dialog.dialog("open");
		$('#add_farm_name').val($(dom).parent().parent().parent().find('.farm_name').html());
		$('#add_farm_size').val($(dom).parent().parent().parent().find('.farm_size').html());
		$('#add_farm_address').val($(dom).parent().parent().parent().find('.farm_address').html());
		$('#add_farm_price').val($(dom).parent().attr('farm_price'));
		$('#add_farm_phone').val($(dom).parent().attr('farm_phone'));
		$('#add_farm_state').val('待租赁');
		$('#add_farm_time').val($(dom).parent().attr('farm_out_time'));
		$('#addFarmDialog .modal-title').html('详细信息');
		$('#addFarmDialog .detail-show').css('display','block');
		$('#state_showOrnot').css('display','none');
		$('#addFarmDialog').find('input').attr('disabled','false');
		$("#saveCard").css('display','none');
		$('#Cancel').click(function() {
			$dialog.dialog("close");
			$('#addFarmDialog').remove();
		});
	});
}

//上传图片
function uploadPhoto(){
        $( "#importPicName").val($( "#ImportPicInput").val());  
      //判断是否有选择上传文件
        var imgPath = $("#ImportPicInput").val();
        if (imgPath == "") {
            alert("请选择上传图片！");
            return;
        }
        //判断上传文件的后缀名
        var strExtension = imgPath.substr(imgPath.lastIndexOf('.') + 1);
        if (strExtension != 'jpg' && strExtension != 'gif'
        && strExtension != 'png' && strExtension != 'bmp') {
            alert("请选择图片文件");
            return;
        }
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
      	       else  {
      	    	   $('#farm_photo').css("display","block");
      	    	   $('#farm_photo').attr("src",data);
      	    	   $('#openDir').attr("disabled","true");
      	       }
      	    },  
      	    error: function (data, status, e){ 
      	    	console.log("444");
      	    	console.log(data);
      	        //coding  
      	    }, 
      	}); 
}
function showList(data){
	  for(i=0;i<data.length;i++){
			var dom = $("#form_list .product-grid").eq(0).clone();
			$(dom).attr("farm_id",data[i].farm_id);
			$(dom).find('.farm_photo').attr('src',data[i].farm_photo_url);
			$(dom).find('.farm_name').html(data[i].farm_name);
			$(dom).find('.farm_size').html(data[i].farm_size + '亩');
			$(dom).find('.farm_address').html(data[i].farm_address);
			$(dom).find('.farm_more').attr('farm_price',data[i].farm_price);
			$(dom).find('.farm_more').attr('farm_phone',data[i].farm_phone);
			$(dom).find('.farm_more').attr('farm_state',data[i].farm_state);
			$(dom).find('.farm_more').attr('farm_out_time',data[i].farm_out_time);
			$("#form_list").append(dom);
			$(dom).show();
	   }
}