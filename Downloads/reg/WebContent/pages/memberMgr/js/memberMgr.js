$(function() {
		fish.setLanguage("zh");
		
		var numberTemplate = {width:80,align:"right",sorttype:'float'};
		var mydata = [{id:"1",phone_number:"18702528602",name:"张三",role:"普通用户",sex_type:"0",state:"冻结"}];

		$(".js-job-grid").grid({
			data:mydata,
		    height: 400,
		    rowNum: 10,
		    colModel:[
		        {name: "phone_number",	label: "账号", 		hidden:false,	},
		        {name: "id",		label: "id", 		hidden:true,	},
				{name: "name",	label: "姓名", 		hidden:false,	},
				{name: "role",				label: "权限", 		 	hidden:false,	},
		        {name: "sex_type",				label: "性别", 			hidden:false,	code:"SEX_TYPE"	, formatter: "select",
					formatoptions:{
						value: {'0':'男','1':'女'}
					}},
		        {name: "state",		label: "状态", 		hidden:false,	},
		        
		        
		    ],
		    autoResizable:true,
		    pager:true,
		    pager: true,
		    /*pageData:mydata,*/
		    pgtext:'第{0}页,共{1}页',
		    recordtext:'共 {2} 条',
		    pginput:false
		});
		
		$(".js-job-grid").grid("navButtonAdd",[{
            caption:"增加",
            onClick:function(){
          	  //console.log($(".js-job-grid").grid("getSelection"))
          	 
            }
        },{
            caption:"冻结",
            onClick:function(){
            	fish.error({title:'提示',message:'账户已被冻结，无法登陆'});
            }
        },{
            caption:"激活",
            onClick:function(){
            	fish.error({title:'提示',message:'用户名或密码错误'});
            }
        },{
            caption:"详情",
            onClick:function(){
          	  showUserInfo();
            }
        }
    ]);

});



