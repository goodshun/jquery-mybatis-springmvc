$(document).ready(function() {
	fish.setLanguage("zh");
	$('#myCarousel').carousel();//轮播
	mainUtil.init();
	getMessageList();
});
var mainUtil={
		params:{},
		init:function(){
			var params = {};
			params.user_id =sessionStorage.getItem("user_id"); 
			$.ajax({
				   data: JSON.stringify(params),
				   contentType: "application/json"  ,
				   dataType: "json",
				   type:"POST",
				   url:"/reg/getCanTranFarmList.action",
				   success:function(data){ 
					   console.log(data);
					   if(data.length==0){
						   fish.info({
								title:'提示信息',
								message:"暂无数据"
							});
					   }
					   else{
						 showList(data);
						 $('#pagination').pagination({
							    records: data.length,
							    visiblePages: 5,
							    rowNum: 6,
							    //rowNumList:[5,10,20],
							    pgTotal:false,
			                    pgInput:false,
			                    rowList:[],
							    onPageClick: function (e, eventData) {
							      pageClick(eventData.page,data);
							    },
							    create:function(){
							      pageClick(1,data);
							    }
							});
					   }
				      }
			   });  
		},
		addCar:function(dom){
			var	params={};
			params.farm_id=$(dom).parent().attr("farm_id");
			params.user_id=sessionStorage.getItem("user_id");
			$.ajax({
				   data: JSON.stringify(params),
				   contentType: "application/json",
				   dataType:"text",
				   type:"POST",
				   url:"/reg/addToCar.action",
				   success:function(data){ 
					   
					   fish.info({
							title:'提示信息',
							message:data
						});
				      },
				   error: function (message) {
					   fish.info({
							title:'提示信息',
							message:data
						});
				      }
			   });    
		},
		transFarm:function(dom){
			var	params={};
			params.farm_id=$(dom).parent().parent().parent().attr("farm_id");
			params.user_id=sessionStorage.getItem("user_id");
			$.ajax({
				   data: JSON.stringify(params),
				   contentType: "application/json",
				   dataType:"text",
				   type:"POST",
				   url:"/reg/transFarm.action",
				   success:function(data){ 
					   fish.info({
							title:'提示信息',
							message:data
						});
					 mainUtil.init();
				      },
				   error: function (message) {
					   fish.info({
							title:'提示信息',
							message:message
						});
				      }
			   });   
		},
		getMessageList:function(){
			var	params={};
			params.user_id=sessionStorage.getItem("user_id");
			$.ajax({
				   data: JSON.stringify(params),
				   contentType: "application/json",
				   dataType:"json",
				   type:"POST",
				   url:"/reg/getMessageList.action",
				   success:function(data){ 
					   	console.log(data);
					   	}
			   });    
		}
}

//加入购物车
function addCar(dom){
	mainUtil.addCar(dom);
}

function transFarm(dom){
	mainUtil.transFarm(dom);
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
//显示最新6个农场
function showList(data){
	 $("#form_list .product-grid:gt(0)").remove();
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

//消息列表
function getMessageList(){
	// $("#form_list .product-grid:gt(0)").remove();
	var	params={};
	params.user_id=sessionStorage.getItem("user_id");
	$.ajax({
		   data: JSON.stringify(params),
		   contentType: "application/json",
		   dataType:"json",
		   type:"POST",
		   url:"/reg/getMessageList.action",
		   success:function(data){ 
			   	$('.badge').html(data.length);
			   	var html="";
			   	for(i=0;i<data.length;i++){
			   		var time = data[i].message_time;
			   		var test = time.split(' ');
			   		html +="<li class='list-group-item message' message_state='' onclick='showMessageDetail(this)'  farm_name="+data[i].farm_name+" sender_id="+data[i].sender_id+" message_content="+data[i].message_content+"  message_time1 ="+test[0]+" message_time2="+test[1]+"    message_id="+data[i].message_id+"  >"
			   		+data[i].farm_name+"&nbsp;&nbsp;农场消息</li> ";
			   	}
			   	console.log(time)
			   	$('.list-group').append(html);
		      },
	   });    
	
}


//消息详情
function showMessageDetail(dom){
	$('#messageDeataiDialog').remove();
	$.ajax({
		url : 'pop_messageInfo.html'
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
		$('#message_farm_name').html($(dom).attr('farm_name'));
		$('#message_farm_sender').html($(dom).attr('sender_id'));
		$('#message_farm_time').html($(dom).attr('message_time1')+$(dom).attr('message_time2'));
		$('#message_farm_content').html($(dom).attr('message_content'));
		if($(dom).attr('message_state')!='00X'){
			$(dom).attr('message_state','00X');
			var count = $('.badge').html();
			$('.badge').html(parseInt(count)-1);
		}
		updateMessageState($(dom).attr('message_id'));
});
	}
//修改消息状态
function updateMessageState(message_id){
	var	params={};
	params.message_id=message_id;
	$.ajax({
		   data: JSON.stringify(params),
		   contentType: "application/json",
		   dataType:"json",
		   type:"POST",
		   url:"/reg/updateMessageState.action",
		   success:function(data){ 
			   console.log(data);
		      },
	   });    
}



function pageClick (page,data){
    rowNum = $('#pagination').pagination("option","rowNum");
    var start = (page-1)*6,end = page*6;
    var perData = $.extend(true, [], data.slice(start,end));
   // $("#grid").grid("reloadData",perData);
}