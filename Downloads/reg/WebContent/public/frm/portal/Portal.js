define([
    'frm/portal/Remote',
    "frm/portal/AppGlobal",
    "frm/portal/Utils",
    "frm/portal/fish.extend",
    "frm/portal/RestAPIHelper"
], function (remote, appGlobal, utils) {
    var FishView = fish.View,
    	PortalDef = function () {
        this.appGlobal = appGlobal;
        // this object serves as an interface exposed to other parts of the system
        // to wait upon a specific promise which is a property of this object,
        // and properties of this object is initialized in PortalView
        this.promise = {};
    }

//    请使用restful方式调用服务;兼容portal8.1
    PortalDef.prototype.callService = remote.callService;
    PortalDef.prototype.callRemoteService = remote.callRemoteService;
    PortalDef.prototype.callServiceSyn = remote.callServiceSyn;

    fish.View.configure({manage: true, syncRender:true});
    /**
     * @method portal.BaseView
     * 返回fish.View实例,重写其中的initialize,resize,setElement方法
     */
    PortalDef.prototype.BaseView = (function() {
    	var adviceFuncs = {
    		initialize: function(func) { return function() {
				func.apply(this, arguments);
				this.on('render', function() {
					
				}, this);
				this.on('afterRender', function(){
					//菜单加载完成,会触发resize事件,会执行到menuresize方法;因此这里菜单的就不再执行了
					//workspace菜单没有tabs__content样式,但也没有resize方法,这里不做考虑
					if(!this.$el.hasClass("tabs__content")) {
						this.resize(portal.utils.getDeltaHeight(this.$el));
					}
				}, this);
				this.on('afterRender', function() {
					var viewType = utils.drawViewType(this.$el),
						menuView = this,
						comprivList = [],
						comprivTabButton = function($el) {
						if ($el.parent().parent().hasClass("ui-tabs-nav")) {
							return true;
						} else {
							return false;
						}
					},
						comprivGridColumn = function($el) {
						if ($el.is("th") && $el.parents("div.grid").length > 0) {
							return true;
						} else {
							return false;
						}
					},
						compHide = function($comp) {
						// detect if $comp is a tab button
						if (comprivTabButton($comp)) {
							var index = $comp.parent().prevAll().length,
								$tab = $comp.parent().parent().parent();
							$tab.tabs("hideTab", index);
						} else if (comprivGridColumn($comp)) {
							var $grid = $comp.parents("div.grid"),
								colModel = $grid.grid("option", "colModel"),
								index = $comp.prevAll().length,
								colDef = colModel[index];
							$grid.grid("hideCol", colDef.name);
						} else {
							$comp.hide();
						}
					},
						compShow = function($comp) {
						// detect if $comp is a tab button
						if (comprivTabButton($comp)) {
							var index = $comp.parent().prevAll().length,
								$tab = $comp.parent().parent().parent();
							$tab.tabs("showTab", index, false);
						} else if (comprivGridColumn($comp)) {
							var $grid = $comp.parents("div.grid"),
								colModel = $grid.grid("option", "colModel"),
								index = $comp.prevAll().length,
								colDef = colModel[index];
							$grid.grid("showCol", colDef.name);
						} else {
							$comp.show();
						}
					};
					// lookup parent menu view
					while (menuView && !menuView.$el.hasClass("tabs__content")) {
						menuView = menuView.parentView;
					}
					if (menuView) {
						comprivList = menuView.comprivList;
					}
			        fish.forEach(comprivList, function(priv) {
						// OBJ_ID must has 3 components
						var parts = priv.objId.split("/");
						if (parts.length !== 3) {
							return;
						}
						// view type must match
						if (parts[0] !== viewType) {
							return;
						}
						var compid = parts[1],
							wrapid = compid.split(".")[0]
							path = parts[2];
						// wrapid must match
						if (wrapid && this.$el.parent().attr("id") !== wrapid) {
							return;
						}
						switch (priv.privLevel) {
						case '0': //hidden
							compHide(this.$(path));
							break;
						case '1': //readonly
						case '2': //editable
							compShow(this.$(path));
							break;
						}
					}, this);
				}, this);
			}},
			resize: function(func) {return function(delta) {
				func.call(this, delta);
				// this.views; //{selector: new View()} or Selector:[ new View()]
				fish.each(this.__manager__.views, function (views) {
					fish.each($.makeArray(views), function (view) {
						if (view.$el.is(':visible')) {
							if (fish.isFunction(view.resize)) {
								var delta = view.$el.parent().height() - view.$el.outerHeight(true);
								view.resize(delta);
							}
						}
					}, this);
				}, this);
			}},
			setElement: function(func) {return function() {
				var $el = $(this.el);//支持异步setElement
				func.apply(this, arguments);
				this.$el.addClass("comprivroot");
				if($el[0] !== this.$el[0]){
					$el.replaceWith(this.$el);
				}
				return this;
			}}
    	}
    	return FishView.extend({
    		resize: $.noop
    	}, {
    		extend: function (protoProps, staticProps) {
    			var parent = this;

    			protoProps = protoProps || {};
//    			protoProps.manage = true;
//    			protoProps.syncRender = true;
    			protoProps.className = (protoProps.className ? protoProps.className + ' ' : '') + 'comprivroot';

				// deadvice, restore some function definition
    			if (parent !== portal.BaseView) {
    				fish.each(fish.keys(adviceFuncs), function(fName) {
        				if (fish.isFunction(parent[fName])) {
        					parent.prototype[fName] = parent[fName];
        				} else {
        					delete parent.prototype[fName];
        				}
    				});
    			}

    			fish.extend(staticProps, fish.pick.apply(fish, [protoProps].concat(fish.keys(adviceFuncs))));

    			// here do advice for functions that framework interests
    			$.each(adviceFuncs, function(funcName, adviceFunc) {
    				var func = protoProps[funcName] || parent.prototype[funcName];
    				protoProps[funcName] = adviceFunc(func);
    			});

    			return FishView.extend(protoProps, staticProps);
    		}
    	});
    })();
    
    fish.View = PortalDef.prototype.BaseView;
    
	PortalDef.prototype.role = function() {
		var appId = appGlobal.get("origin").appId;
		if (appId) {
			if (appId == '1') {
				return 'M'; // master
			} else {
				return 'S'; // slave
			}
		}
		return null;
	};

	window.portal = new PortalDef();
    window.portal.utils = utils;
});