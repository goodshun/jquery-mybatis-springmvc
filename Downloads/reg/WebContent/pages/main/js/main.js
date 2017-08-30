	
$(document).ready(function() {
	fish.setLanguage("zh");
	   $("#tabs").tabs({
		      canClose:true,
		      paging: true,
		      autoResizable:true
		    });
		   
		   $("#tabs").tabs({
			   	activate: function(e, ui) {
				$('#tabs').find('div').css('display','none');
				var id =ui.newPanel.attr('id');
				$('#'+id).show();
	           }
		   });
		   
		   
		   sessionStorage.setItem('user_id', phone);
/*		   $.ajax({
			   data:{'phone':phone},
			   type:"POST",
			   dataType:"json",
			   url:"getMenu.action",
			   success:function(data){  
			      console.log(data);
			      }  
		   });*/
		   $("#header_ul_list").menu();
		   $('.js-menu').hover(function(){
				 $("#header_ul_list").parent().show(); },function(){
				 $("#header_ul_list").parent().hide();
			 });
		   
		   toHomeMenu();
});


var MainUtil={
		params:{},
		init:function(){}
}

//回首页
function toHomeMenu() {
	$("#header_ul_list").find("li").removeClass("cur");
	$("#header_ul_list").find("li").eq(0).addClass("cur");
	$('#navigaTab').empty();
	var iframeIndex = ContextPath+"/pages/main/new-form.jsp";
	$('#indexPage').attr('src', iframeIndex);
	window.setInterval("reinitIframe()", 200);
}
//进入到菜单页
function toMenuPage(dom){
	var menuId = $(dom).attr("menu_id_");
	var curname = $(dom).html();
	var flag = false;
	var pageIndex;
	$('#tabs').find('div').each(function(index,element){
		if($(this).attr('id') == ('showPage_'+menuId)){
			flag =true;
			pageIndex=index;
		}
	});
	if(flag==true ){
		$('#tabs').tabs("showTab",pageIndex,true);
		return false;
	}
	$('#tabs').tabs("add",{id:'showPage_'+menuId,active:true,label:curname});
	$('#showPage_'+menuId).append(
		'<iframe id="Page_'+menuId+'" name="Page_'+menuId+'" src="" onload="" style="z-index:1 ;width:100% ;height:100% ;scrolling :no;  frameborder:0; " ></iframe>');
	$('#showPage_'+menuId).css('height','800px');
	$('#navigaTab').empty();
	var url = $(dom).attr("url_");
	var iframeIndex = ContextPath+"/"+url;
	$('#Page_'+menuId+'').attr('src',iframeIndex);
	window.setInterval("reinitIframe()", 200);
	//
	
	
	
	//更新tab页
/*	$('.ui-tabs-nav').*/
	
	
	// 更新面包屑导航
	var html="<i class='iconfont color-272636 fs18'>&#xe604;</i>";
	html+="<a href='javascript:void(0);' onclick='toHomeMenu(this);'>首页</a>";
	html+="<span class='mlr5'>&gt;</span>";
	$("#header_ul_list").find("li").removeClass("cur");
	$(dom).closest("li[name='firstMenu']").addClass("cur");
	var fistName = $(dom).parent().parent().parent().find('a:eq(0)').html();
	
	html+="<a href='javaScript:void(0) 'class='cur' >"+fistName+"</a>";
	html+="<span class='mlr5'>&gt;</span>";
	html+="<a href='javaScript:void(0) 'class='cur' >"+curname+"</a>";
	$('#navigaTab').append(html);
}

//重置iframe高度
function reinitIframe() {
	var iframe = document.getElementById("indexPage");
	try {
		var bHeight = iframe.contentWindow.document.body.scrollHeight;
		var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
		var height = Math.min(bHeight, dHeight);
		iframe.height = height;
	} catch (ex) {
	}
}