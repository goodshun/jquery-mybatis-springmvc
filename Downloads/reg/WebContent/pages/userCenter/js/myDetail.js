$(function() {
		fish.setLanguage("zh");
		memberUtil.getdata(1);
});

var memberUtil={
		params:{},
		showList: function(data){
			$(".js-job-grid").grid({
				data:data,
			    height: 400,
			    rowNum: 10,
			    colModel:[
			  		{name: "detail_id",				label: "订单编号", 			hidden:false,	},
			  		{name: "user_id",			label: "农场主ID", 			hidden:false,	},
			        {name: "farm_id",			label: "农场ID", 			hidden:true,	},
			        {name: "farm_name",			    label: "农场名称", 			hidden:false,	},
			        {name: "farm_address",				label: "农场地址", 			hidden:false,	},
			        {name: "farm_price",					label: "农场价格（元/年）", 			hidden:false,	},
			        {name: "farm_size",					label: "农场大小", 			hidden:false,	},
			        {name: "start_time",			label: "开始时间", 			hidden:false,	},	
			        {name: "end_time",			label: "结束时间", 			hidden:false,	},	
			        {name: "detail_state",			label: "订单状态", 			hidden:false,code:"DETAIL_STATE", formatter: "select",
						formatoptions:{
							value: {'00A':'正在执行','00X':'已经结束'}
						}		},	
			    ],
			    autoResizable:true,
			    pager:true,
			    pager: true,
			    pageData:data,
			    pgtext:'第{0}页,共{1}页',
			    recordtext:'共 {2} 条',
			    pginput:false
			});
		
		},
		getdata:function (page, rowNum, sortname, sortorder,queryParams) {
			var params ={};
			params.user_id =sessionStorage.getItem("user_id"); 
	    	$.ajax({
	    		data: JSON.stringify(params),
	    		contentType: "application/json"  ,
	    		dataType:"json",
			   type:"POST",
			   url:"/reg/getDetailList.action",
			   success:function(data){  
				   console.log(data);
				   memberUtil.showList(data);
			      }    
	    	});
	    	
	    },
	   queryData:function(params){
		   $.ajax({
			   data: JSON.stringify(params),
			   contentType: "application/json"  ,
			   dataType: "json",
			   type:"POST",
			   url:"/reg/queryDetailList.action",
			   success:function(data){  
				  memberUtil.showList(data);
			      }
		   });    
	   },
}

//查询按钮
  function queryCard(){
	var params = {};
	params.user_id=$('#card_id').val();
	params.farm_name=$('#user_name').val();
	params.order_id =sessionStorage.getItem("user_id");
	memberUtil.queryData(params);
}

