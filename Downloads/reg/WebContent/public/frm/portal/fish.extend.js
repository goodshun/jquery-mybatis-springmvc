define(function() {
    $.extend($.jgrid.nav, {
        edittitle: "Edit Selected Row",
        deltitle: "Delete Selected Row"
    });
    $.extend($.jgrid.edit, {
        saveicon: "glyphicon glyphicon-ok",
        cancelicon: "glyphicon glyphicon-remove"
    });
    
    $.ui.grid.prototype.options.displayNum = 5;
    $.ui.tabs.prototype.options.autoResizable = true;
    $.ui.dialog.prototype.options.modal = true;
    $.ui.dialog.prototype.options.minHeight = 30; //body的部分
    $.ui.dialog.prototype.options.autoResizable = true;
    $.ui.grid.prototype.options.minHeight = 114;
    $.ui.grid.prototype.options.treeIcons = {
        plus: 'glyphicon glyphicon-triangle-right',
        minus: 'glyphicon glyphicon-triangle-bottom',
        leaf: 'glyphicon glyphicon-file',
        folderClosed: '', //支持全局配置,展开列的close状态的节点图标，默认为空
        folderOpen: '' //支持全局配置,展开列的open状态的节点图标，默认为空
    };

    /**
     * @deprecated 
     * 在框架侧支持,默认采用图标方式,这里为了统一,仍然保留旧的用法
     * @param param
     */
    $.ui.grid.prototype.exportDataAysn = function(param){
		var gridWidth = this.options.width;
		param.fileType ? "" : param.fileType = "xlsx";
		param.colModel = _.chain(this.options.colModel)
        .filter(function (col) {return (!col.hidden||col.exportable===true) && col.name && col.name!='cb' && col.name!='rn' && (col.exportable!==false) ;})
        .map(function (col) {
        	return {label: col.label, name: col.name, colWidth: (parseInt(col.width/gridWidth * 60)) , numeric :(col.formatter == 'number')};
        }).value();
		_exportGrid(param);
	};
	
	$.ui.grid.prototype.options.exportFeatureClicked = function(e,param){
		_exportGrid(param)
	};
	
	var _exportGrid = function(param){
		param.asyn = true;
		param.serviceParam ? "" : param.serviceParam = {};
		fish.post("/export/" + param.serviceName , param, function(data) {
			var uuid = data;
			var qryExportProgress = function(){
				fish.get("/export/progress/" + uuid, function(rs) {
					//var obj = eval('(' + rs + ')');
					var obj = rs;
					if(obj.successFlag){
						  window.location.href=portal.appGlobal.get("webroot") + "/download?filePath="+obj.filePath;
						  $(".container_main").unblockUI();
					}else{
						// console.log(rs.PROGRESS);
						$(".container_main").blockUI({message:obj.progress});
						setTimeout(qryExportProgress,100);
					}
				}, portal.appGlobal.get("webroot"));
			}
			qryExportProgress();
  	  	}, portal.appGlobal.get("webroot"));
	}

	if (!Function.prototype.bind) {  
		Function.prototype.bind = function (oThis) {
			if (typeof this !== "function") {
				// closest thing possible to the ECMAScript 5 internal IsCallable function
				throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
			}

			var aArgs = Array.prototype.slice.call(arguments, 1),
				fToBind = this,
				fNOP = function () {},
				fBound = function () {
					return fToBind.apply(this instanceof fNOP && oThis ? this : oThis || window,
						aArgs.concat(Array.prototype.slice.call(arguments)));
				};

			fNOP.prototype = this.prototype;
			fBound.prototype = new fNOP();

			return fBound;
		};
	}    
});

/**
 * 
 **/

require.undef('i18n');
define('i18n',function() {
  return {
    version: '1.0.0',
    load: function(name, req, onLoad, config) {
      var toLoad = [];
      var loc = "en";
      if(fish&&fish.language){//window.fish肯定是存在的
        loc = fish.language;
      } else {
        var nav = window.navigator;
        if (nav.systemLanguage) {
          loc = nav.systemLanguage;
        } else if (nav.language) {
          loc = nav.language;
        }
      }
      var masterName;
      
      
      var lastIndex = fish.lastIndexOf(name,".");
  	  var suffix = name.substring(lastIndex,name.length);
  	  if(suffix == ".js"){
    	  masterName = name.substring(0,name.length-3) + "." + loc + ".js";
  	  } else {
	      masterName = name + "." + loc;
  	  }

      //
      toLoad.push(masterName);
      req(toLoad, function(value) {
    	value = fish.extend(value, portal.appGlobal.get("commoni18n")[portal.appGlobal.get('language')],portal.appGlobal.get("customi18n")[portal.appGlobal.get('language')])
        onLoad(value);
      });
    }
  };
});

