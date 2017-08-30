(function($, undefined) {
	var template = '{{#data}}<div class="{{../colCssp}}"><div class="form-group {{#if required}}required{{/if}}">' +
		'<label class="{{../labelCssp}} control-label">{{label}}</label>' +
		'<div class="{{../elCssp}}"><div class="input-group">' +
		"{{#ifCond type '===' 'textarea'}}" +
		'<textarea id="{{id}}" name="{{name}}" class="form-control" data-rule="{{datarule}}"></textarea>' +
		'{{else}}' +
		"{{#ifCond type '===' 'multiselect'}}" +
		'<select id="{{id}}" name="{{name}}" class="form-control" multiple data-rule="{{datarule}}"></select>' +
		'{{else}}' +
		'<input id="{{id}}" name="{{name}}" class="form-control" data-rule="{{datarule}}">' +
		'{{/ifCond}}' +
		'{{/ifCond}}' +
		'</div></div></div></div>{{/data}}';

	$.widget("ui.propertylist", {
		// default options
		options: {
			colCssp: "col-md-6 col-sm-6",
			labelCssp: "col-md-4 col-sm-4",
			elCssp: "col-md-8 col-sm-8",
			data: [],
			appendTo: false
		},

		_create: function() {
			this.element.addClass('form-horizontal clearfix');
			this.original = this.element.children();
		},

		_init: function() {
			if (this.options.appendTo) {
				this.element.find(this.options.appendTo).empty();
			} else {
				this.element.children().not(this.original).empty();
			}
			this._buildHTML();
			this._initWidget();
			this.element.form();
		},

		_destroy: function() {
			if (this.options.appendTo) {
				this.element.find(this.options.appendTo).empty();
			} else {
				this.element.children().not(this.original).empty();
			}
		},

		_buildHTML: function() {

			$.each(this.options.data, function(index, val) {
				val.name = val.name || val.id;
			});

			var html = Handlebars.compile(template)(this.options);
			this.options.appendTo ? this.element.find(this.options.appendTo).append(html) : this.element.prepend(html);
		},

		_initWidget: function() {
			var jsonarr = this.options.data;
			var that = this;
			for (var i = 0; i < jsonarr.length; i++) {
				var obj = jsonarr[i];
				option = $.extend(true, this.options[obj.type], obj); //支持控件所有初始化属性
				switch (obj.type) {
					case "datetimepicker":
						$("#" + obj.id).datetimepicker(option);
						if (obj.value) {
							$("#" + obj.id).datetimepicker("value", obj.value);
						}
						break;
					case "popedit":
						$("#" + obj.id).popedit(option);
						if (obj.value) {
							$("#" + obj.id).popedit("setValue", obj.value);
						}
						break;
					case "combobox":
						$("#" + obj.id).combobox(option);
						$("#" + obj.id).parent('.input-group').removeClass("input-group");
						//如果有data属性，就忽略url属性，将data作为下拉框选项
						if (obj.data) {
							//如果有bindctrl属性，data属性的内容需要做联动处理
							if (obj.bindctrl)
							{
								//根据前一个下拉框生成联动的下拉框
								this.linkage(obj);
								//给前一个下拉添加change事件，随时联动
//								var newobj = obj;
								$("#" + obj.bindctrl).on('combobox:change', function(e){	
									for (var i = 0; i < that.options.data.length; i++)
									{
										if (that.options.data[i].bindctrl == $(e.target)[0].id)
										{
											that.linkage(that.options.data[i]);
										}
									}
								});
								break;
							}
							else
							{
								$("#" + obj.id).combobox("option", "dataSource", obj.data);
								if (obj.value) {
									$("#" + obj.id).combobox("value", obj.value);
								}
								break;
							}
						}
						if (obj.url) {
							$.getJSON(obj.url, obj, function(o) {
								return function(json, textStatus) {
									$("#" + o.id).combobox("option", "dataSource", json);
									if (o.value) {
										$("#" + o.id).combobox("value", o.value);
									}
								}
							}(obj));
						}
						break;
					case "multiselect":
						$("#" + obj.id).multiselect(option);
						$("#" + obj.id).parent('.input-group').removeClass("input-group");
						//如果有data属性，就忽略url属性，将data作为多选框选项
						if (obj.data) {
							$("#" + obj.id).multiselect("option", "dataSource", obj.data);
							if (obj.value) {
								$("#" + obj.id).multiselect("value", obj.value.split('|'));
							}
							break;
						}
						if (obj.url) {
							$.getJSON(obj.url, obj, function(o) {
								return function(json, textStatus) {
									$("#" + o.id).multiselect("option", "dataSource", json);
									if (o.value) {
										$("#" + o.id).multiselect("value", o.value.split('|'));
									}
								}
							}(obj));
						}
						break;
					default:
						$("#" + obj.id).val(obj.value);
						$("#" + obj.id).parent('.input-group').removeClass("input-group");
						break;
				}
			}
		},
		//联动
		linkage: function(obj)
		{
			var val = $("#" + obj.bindctrl)[0].value;
			var newDate = [];
			for (var x in obj.data)
			{
				if (obj.data[x].bindTo == val)
				{
					newDate.push(obj.data[x]);
				}
			}
			$("#" + obj.id).combobox("option", "dataSource", newDate);
			//value默认取newDate的第一个name
			if (newDate.length > 0) 
			{	
				$("#" + obj.id).combobox("value", newDate[0].value);
			}
			else
			{
				$("#" + obj.id).combobox("value", "");
			}
		}
	});
})(jQuery);