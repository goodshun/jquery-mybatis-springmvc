(function($, undefined) {
    /**
     * 栅格组件
     * @param ele
     * @param opt
     */
    var zsGridster = function(ele,opt) {
        this.$element = ele;
        var baseX = (window.screen.width - 0)/52 - 4;
        var baseY = (window.screen.height - 170)/20 - 4;
        this.defaultOption = {
            widget_margins: [2, 2],
            widget_base_dimensions: [baseX, baseY],
            draggable: {
                handle: '.panel-heading'
            },
            diff_width:0,
            min_rows: 30,
            max_rows: 30,
            min_cols: 52,
            max_cols: 52,
            resize: {
                enabled: true,
                min_size: [3, 3]
            },
            serialize_params: function ($w, wgd) {
                var $div = $w.find(".panel-body");//> .panel >
                return {
                    col: wgd.col,
                    row: wgd.row,
                    size_x: wgd.size_x,
                    size_y: wgd.size_y,
                    widget_id: $div.data("id"),
                    widget_title: $div.data("title"),
                    widget_name: $div.data("name"),
                    widget_url: $div.data("url"),
                    widget_service: $div.data("data-service"),
                    dom_id: $div.attr("id"),
                    widget_icon: $div.data("icon")
                };
            },
            draggable:{  
	            stop: function(event, ui){  
	            	var $el = ui.$player.parents(".gridster");
	            	var divH = $el.parents(".ui-tabs-panel").height();
	                var divW = $el.parents(".ui-tabs-panel").width();
	                $el.outerHeight(divW);
	                $el.outerWidth(divH);
	                $el.slimscroll({
	                    height: divH,
	                    width: divW,
	                    axis: 'both'
	                });
	            }  
            },
        };
        this.wdRegMap = {};
        this.options = $.extend({}, this.defaultOption, opt);
        this.gridster = this.$element.gridster(this.options).data('gridster');
    };
    
    var TPL = "<li><div class='panel panel-default'><div class='panel-heading clearfix'><h4 class='panel-title'><i class='{{widget_icon}}'></i>&nbsp;{{widget_title}}</h4></div><div class='panel-body' id='{{dom_id}}' data-id='{{widget_id}}' data-name='{{widget_name}}' data-url='{{widget_url}}' data-title='{{widget_title}}' data-icon='{{widget_icon}}' data-service='{{widget_service}}'></div></div><span class='gs-remove-handle gs-remove-handle-both'><i class='fa fa-trash'></i></span></li>"
    
    zsGridster.prototype = {
        /**
         * 获取组件结构
         * @param widget
         * @returns {string}
         */
        getWidgetConst : function(widget){
            return fish.compile(TPL)(widget);
        },
        /**
         * 获取选取组件集合
         * @returns {Array}
         */
        getSelectedWidgets : function($selWid){
            var result = {};
            var containerArray = new Array();
            var widgetArray = new Array();
            var _this = this;
            $selWid.each(function () {
                var uuid = fish.getUUID();
                var widgetOption = new Array();
                var $widgetID = $(this).data("id");
                var $widgetName = $(this).data("name");
                var $widgetURL = $(this).data("url");
                var $widgetTitle = $(this).data("title");
                var $widgetService = $(this).data("service");
                var $widgetParam = $(this).data("param");
                var $widgetIcon = $(this).data("icon");
                var domId = "widget_container_" + $("#designer-ipt-template-id").val() + "_" + uuid;
                var widget = {
                    dom_id: domId,
                    widget_id: $widgetID,
                    widget_name: $widgetName,
                    widget_url: $widgetURL,
                    widget_title: $widgetTitle,
                    widget_service: $widgetService,
                    widget_param: $widgetParam,
                    widget_icon: $widgetIcon
                };
                var widgetConst = _this.getWidgetConst(widget);
                widgetOption.push(widgetConst);
                widgetOption.push(8);//col
                widgetOption.push(8);//row
                containerArray.push(widgetOption);

                widgetArray.push(widget);
            });
            result.containerArray = containerArray;
            result.widgetArray = widgetArray;
            return result;
        },
        /**
         * 获取模板组件集合
         * @returns {Array}
         */
        getWidgetsByTemplate: function(template){
            var result = {};
            var containerArray = new Array();
            var widgetArray = new Array();

            if (template.widgets !== "") {

                var objTemplateWidgets = JSON.parse(template.widgets);
                for (var i = 0; i < objTemplateWidgets.length; i++) {
                    var widget = objTemplateWidgets[i];

                    var widgetOption = new Array();
                    var widgetConst = this.getWidgetConst(widget);

                    widgetOption.push(widgetConst);
                    widgetOption.push(widget.size_x);//col
                    widgetOption.push(widget.size_y);//row
                    widgetOption.push(widget.col);//col
                    widgetOption.push(widget.row);//row
                    containerArray.push(widgetOption);

                    widgetArray.push(widget);
                }


            }
            result.containerArray = containerArray;
            result.widgetArray = widgetArray;

            return result;
        },
        
        gridsLoad: function(paramArray){
            var _this = this;
            var containerArray = paramArray.containerArray;
            var widgetArray = paramArray.widgetArray;
            var promiseArr = [];

            //grid加载布局

            $.each(containerArray, function (i, widget) {
                _this.gridster.add_widget.apply(_this.gridster, widget);
            });

            //绑定移除布局部件事件
            $(".gs-remove-handle").click(function () {
                _this.gridster.remove_widget($(this).parent('li'), false, function () {
//                	fish.info("Remove widget success!");
                });
                var domId = $(this).parent('li').find(".panel-body").attr("id");//> .panel > 
                delete _this.wdRegMap[domId];
            });

            $(".panel").panel({
            	collapsible: false,
            	canClose: true,
            	slideUp: function() {
            		var hh = $(this).find(".panel-heading").outerHeight();
            		if (!$(this).data("portlet-height")) {
            			$(this).data("portlet-height", $(this).parent().height());
            		}
            		$(this).parent().height(hh + 2);
            	},
            	slideDown: function() {
            		var ph = $(this).data("portlet-height");
            		$(this).parent().height(ph);
            	},
            	beforeClose: function() {
            		var parentLi = $(this).parent('li');
            		parentLi.css('background','none');
            		_this.gridster.remove_widget(parentLi, false, function () {
                    });
                    var domId = parentLi.find(".panel-body").attr("id");//> .panel > 
                    
//                    var $dom = $("#" + domId, _this.$element);
//                    $dom.getNiceScroll().remove();
                    
                    delete _this.wdRegMap[domId];
            	}
            });

            //注册组件
            $.each(widgetArray, function (i, widget) {
            	var $dfd = $.Deferred();
                _this.wdRegMap[widget.dom_id] = new DBwidget(widget, _this.$element, $dfd);
                promiseArr.push($dfd.promise());
            });
            
            $("#designer-div-gridster").children().css('width','100%');
            
            return promiseArr;
        },
        /**
         * 栅格布局期清除组件
         */
        gridsClear: function(){
            var _this = this;
            $.each(this.wdRegMap, function (key, value) {
                delete _this.wdRegMap[key];
            });
            _this.gridster.remove_all_widgets();
            _this.$element.empty();
        },
        gridsDisable:function(){
        	var _this = this;
            _this.gridster.disable_resize.apply(_this.gridster);
            _this.gridster.$el.addClass('gs-remove-disabled');
        }
    };


    /**
     * DashBoard组件对象
     * @param options
     * @param $grid
     * @param $dfd single portlet synchronizer
     * @constructor
     */
    var DBwidget = function(options,$grid,$dfd) {
        this.dom_id = options.dom_id;
        this.widget_id = options.widget_id;
        this.widget_name = options.widget_name;
        this.widget_url = options.widget_url;
        this.widget_title = options.widget_title;
        this.widget_service = options.widget_service;
        this.widget_param = options.widget_param;
        this.widget_icon = options.widget_icon;
        this._init = function () {
        	var filterUrl = function(url) {
        		if (!url) {
        			return false;
        		}
        		if (url.lastIndexOf(".swf") == url.length - 4) {
        			return false;
        		}
        		return true;
        	}
        	if(!filterUrl(this.widget_url)) return false;

        	require([this.widget_url], function(PortletView) {
        		var portletView = new PortletView({
        			DEFAULT_PARAM: this.widget_param,
        			$PORTLETITLE$: this.widget_title,
        			$PORTLETICON$: this.widget_icon
        		}),
        			titleLine = portletView.titleLine,
        			$th = $("#" + this.dom_id, $grid).parent().prev(".panel-heading"),
        			$tl = $th.children(".panel-title");
        		// examine portlet title line components
        		if (titleLine) {
        			if (!titleLine.template) {
        				titleLine.override = false;
        			}
        			var oh = $th.height();
        			if (titleLine.override) {
        				$tl.remove();
        			}
        			$th.append(titleLine.template);
        			if (titleLine.callback) {
        				// callback is supposed to update ui synchronously
        				titleLine.callback($th);
        			}
        			if (!titleLine.override) {
        				$tl.css("line-height", $th.height() + "px");
        			}
        			$th.children(".panel-heading-button")
        				.css("line-height", $th.height() + "px");
        			var adj = Math.ceil(($th.height() - oh) / 2.0);
        			if (adj < 10) {
        				if (!titleLine.override) {
            				$tl.css("padding-bottom", 10 - adj + "px");
            				$tl.css("margin-bottom", adj - 10 + "px");
        				}
        				$th.css("padding-bottom", 10 - adj + "px");
        				$th.css("padding-top", 10 - adj + "px");
        			} else {
        				if (!titleLine.override) {
            				$tl.css("padding-bottom", 0);
            				$tl.css("margin-bottom", 0);
        				}
        				$th.css("padding-top", 0);
        				$th.css("padding-bottom", 0);
        			}
        		}

        		// portlet content rendering
        		portletView.render();
        		$("#" + this.dom_id, $grid).html(portletView.el);

        		this.refresh();

        		$dfd.resolve();
        	}.bind(this));
        };

        this.refresh = function () {
            var $dom = $("#" + this.dom_id, $grid),
    			height = $dom.closest(".panel").innerHeight() - $dom.closest(".panel").children(".panel-heading").outerHeight(),
    			width =  $dom.closest(".panel").innerWidth();
			$dom.outerHeight(height);
    		$dom.slimscroll({
    			height:height,
    			width:width,
    			axis: 'both'
    		})
//    		$dom.niceScroll({
//    			cursorcolor: '#1d5987',
//                cursorwidth: "10px",
//                cursoropacitymax: "0.4"
//    		});
        }.bind(this);
        this._init();
        return this;
    };
    $.fn.zsGridster = function(options) {
        var zsGridsterIns = new zsGridster(this, options);
        //组件缩放回调函数
        zsGridsterIns.gridster.options.resize.stop = function(gridster, event, ui, $w){
        	var $el = ui.parents(".gridster");
        	var divH = $el.parents(".ui-tabs-panel").height();
            var divW = $el.parents(".ui-tabs-panel").width();
            $el.outerHeight(divW);
            $el.outerWidth(divH);
            $el.slimscroll({
                height: divH,
                width: divW,
                axis: 'both'
            });
            $.each(zsGridsterIns.wdRegMap,function(key,value){
                zsGridsterIns.wdRegMap[key].refresh();
            });
        }
        return zsGridsterIns;
    }
})(jQuery);