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
			  		{name: "good_id",				    label: "租赁编号", 				hidden:false,	},
			        {name: "user_id",			    label: "农场主ID", 			hidden:false,	},
			        {name: "farm_size",			    label: "农场大小(亩)", 			hidden:false,	},
			        {name: "farm_address",			label: "农场地址", 			hidden:false,	},
			        {name: "farm_out_time",			label: "发布时间", 			hidden:false,	},
			        {name: "farm_state",			label: "农场状态", 			hidden:false,	code:"FARM_STATE", formatter: "select",
						formatoptions:{
							value: {'00A':'待租赁','00X':'已租赁'}
						}	},
			        {name: "farm_price",			label: "农场租金(元/年)", 			hidden:false,	},
			        {name: "farm_phone",			    label: "农场电话", 			hidden:false,	},
			        {name: "farm_id",			    label: "农场ID", 			hidden:true,	},	
			    ],
			    autoResizable:true,
			    pager:true,
			    pager: true,
			    pageData:data,
			    pgtext:'第{0}页,共{1}页',
			    recordtext:'共 {2} 条',
			    pginput:false
			});
			$(".js-job-grid").grid("navButtonAdd",[{
			                                      caption:"结算",
			                                      onClick:function(){
			                                    	  modCard();
			                                      }
			                                  },{
			                                      caption:"删除",
			                                      onClick:function(){
			                                    	  deleteCard();
			                                      }
			                                  }
			                              ]);
		
		},
		getdata:function (page, rowNum, sortname, sortorder,queryParams) {
			var params ={};
			params.user_id =sessionStorage.getItem("user_id"); 
	    	$.ajax({
	    		data: JSON.stringify(params),
	    		contentType: "application/json"  ,
	    		dataType:"json",
			   type:"POST",
			   url:"/reg/getCarList.action",
			   success:function(data){  
				   memberUtil.showList(data);
			      }    
	    	});
	    	
	    },
}


	
	//结算功能
function modCard() {
	var rowData = $(".js-job-grid").grid("getSelection");
	if(rowData.good_id == null || rowData.good_id == undefined ){
		fish.warn({title:'注意',message:'请选择一条记录！'});
		return false;
	}
	
	 var params = {};
		params.farm_id=rowData.farm_id;
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
				   memberUtil.showList(data);
			      },
			   error: function (message) {
				   fish.info({
						title:'提示信息',
						message:message
					});
			      }
		   });   
	
}
//删除购物车
function deleteCard() {
	var rowData = $(".js-job-grid").grid("getSelection");
	if(rowData.good_id == null || rowData.good_id == undefined ){
		fish.warn({title:'注意',message:'请选择一条记录！'});
		return false;
	}
	var params = {};
	params.good_id=rowData.good_id;
	$.ajax({
		   data: JSON.stringify(params),
		   contentType: "application/json",
		   dataType:"text",
		   type:"POST",
		   url:"/reg/deleteCarList.action",
		   success:function(data){ 
			   fish.info({
					title:'提示信息',
					message:data
				});
			   memberUtil.getdata(1);
		      },
		   error: function (message) {
			   fish.info({
					title:'提示信息',
					message:message
				});
		      }
	   });   
	
}
