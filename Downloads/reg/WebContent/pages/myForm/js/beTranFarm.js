$(document).ready(function() {
	fish.setLanguage("zh");
	haveFarmUtil.init();
	
});




var haveFarmUtil={
		params:{},
		init:function(){
			var params = {};
			params.user_id =sessionStorage.getItem("user_id"); 
			$.ajax({
				   data: JSON.stringify(params),
				   contentType: "application/json"  ,
				   dataType: "json",
				   type:"POST",
				   url:"/reg/getMyOwnFarm.action",
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
		}
		
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
			$(dom).find('.farm_more').attr('start_time',data[i].start_time);
			$(dom).find('.farm_more').attr('end_time',data[i].end_time);
			$(dom).find('.farm_more').attr('user_id',data[i].user_id);
			$(dom).find('.farm_more').attr('detail_id',data[i].detail_id);
			$(dom).find('.farm_more').attr('order_id',data[i].order_id);
			$("#form_list").append(dom);
			$(dom).show();
			if(i==0){
				$(dom).click();
				//$(dom).hover();
			}
	   }
}

//点击显示信息
function showDetail(dom){
	//显示详细信息
	$('#add_farm_name').val($(dom).find('.farm_name').html());
	$('#add_farm_size').val($(dom).find('.farm_size').html());
	$('#add_farm_address').val($(dom).find('.farm_address').html());
	$('#add_farm_price').val($(dom).find('.farm_more').attr('farm_price'));
	$('#add_farm_phone').val($(dom).find('.farm_more').attr('farm_phone'));
	$('#add_farm_state').val('租赁中');
	$('#add_farm_time').val($(dom).find('.farm_more').attr('start_time'));
	$('#add_farm_intime').val($(dom).find('.farm_more').attr('end_time'));
	$('#showDetail').find('input').attr('disabled','false');
	sessionStorage.setItem('reciver_id',$(dom).find('.farm_more').attr('order_id'));
	sessionStorage.setItem('farm_id',$(dom).attr('farm_id'));
	sessionStorage.setItem('detail_id',$(dom).find('.farm_more').attr('detail_id'));
	showEcharts();
}

function showEcharts(){
	var params={};
	params.detail_id =sessionStorage.getItem("detail_id"); 
	$.ajax({
		   data: JSON.stringify(params),
		   contentType: "application/json"  ,
		   dataType: "json",
		   type:"POST",
		   url:"/reg/getFoodList.action",
		   success:function(data){ 
				echartsView(data);
		      }
	   });
}

//earchart视图部分
function echartsView(data){
	$('#foodcount_watch').children().remove();
	var noData={};
	if(data.length==0){
		for( i=0;i<4;i++){
			noData.food_count=0;
			data.push(noData);
		}
	}
	var myChart = echarts.init(document.getElementById("foodcount_watch")); 
    voption = {
    	    tooltip: {
    	        trigger: 'item',
    	        formatter: "{a} <br/>{b} : {c}kg"
    	    },
    	    legend: {
    	        data: ['土豆','玉米','稻谷','其他'],
    	        bottom: 0
    	    },
    	    color: ['#ff6046','#3299cc','#00ff7f', '#7f007f'],
    	    calculable: true,
    	    series: [
    	        {
    	            type:'funnel',
    	            left: '10%',
    	            top: 50,
    	            //x2: 80,
    	            bottom: 60,
    	            width: '80%',
    	            // height: {totalHeight} - y - y2,
    	            //min: 0,
    	            //max: maxNum,
    	            minSize: '0%',
    	            maxSize: '100%',
    	            sort: 'descending',
    	            gap: 2,
    	            label: {
    	                normal: {
    	                    show: true,
    	                    position: 'inside'
    	                },
    	                emphasis: {
    	                    textStyle: {
    	                        fontSize: 12
    	                    }
    	                }
    	            },
    	            labelLine: {
    	                normal: {
    	                    length: 10,
    	                    lineStyle: {
    	                        width: 1,
    	                        type: 'solid'
    	                    }
    	                }
    	            },
    	            itemStyle: {
    	                normal: {
    	                    borderColor: '#fff',
    	                    borderWidth: 1
    	                }
    	            },
    	            data: [
    	                {value:data[0].food_count, name: '土豆'},
    	                {value:data[1].food_count, name: '玉米'},
    	                {value:data[2].food_count, name: '稻谷'},
    	                {value:data[3].food_count, name: '其他'},
    	            ]
    	        }
    	    ]
    	};

   // 为echarts对象加载数据 
   myChart.setOption(voption); 
}

//更新作物信息
function updateFood(){
	var list=[];
	var params={};
	params.detail_id= sessionStorage.getItem('detail_id');
	list.push($('#update_tudou').val());
	list.push($('#update_yumi').val());
	list.push($('#update_daogu').val());
	list.push($('#update_qita').val());
	for(i=0;i<list.length;i++){
		if(list[i]==null || list[i]==undefined || list[i]=="") {
			fish.info({
			title:'提示信息',
				message:"不能为空"
				});
			return false ;
			}
	}
	params.list=list;
	$.ajax({
		   data: JSON.stringify(params),
		   contentType: "application/json"  ,
		   dataType: "text",
		   type:"POST",
		   url:"/reg/updateFood.action",
		   success:function(data){ 
			   
				   fish.info({
						title:'提示信息',
						message:data
					});
				   showEcharts();
				    $('#update_tudou').val("");
					$('#update_yumi').val("");
					$('#update_daogu').val("");
					$('#update_qita').val("");
		      }
	   });  
}

//发送消息

//发送消息
function sendMessage(){
	
	var params={};
	params.reciver_id = sessionStorage.getItem("reciver_id");
	params.sender_id=   sessionStorage.getItem("user_id");
	params.farm_id = 	sessionStorage.getItem("farm_id");
	params.message_type ="P";
	params.message_content = $('#message_Content').val();
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



