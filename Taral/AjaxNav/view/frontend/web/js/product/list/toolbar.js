define([
	"jquery",
	"jquery/ui",
	'Magento_Catalog/js/product/list/toolbar'
	],function($){
		$.widget('ajaxnav.productListToolbar',$.mage.productListToolbarForm,{
			options: {
	            modeControl: '[data-role="mode-switcher"]',
	            directionControl: '[data-role="direction-switcher"]',
	            orderControl: '[data-role="sorter"]',
	            limitControl: '[data-role="limiter"]',
	            mode: 'product_list_mode',
	            direction: 'product_list_dir',
	            order: 'product_list_order',
	            limit: 'product_list_limit',
	            modeDefault: 'grid',
	            directionDefault: 'asc',
	            orderDefault: 'position',
	            limitDefault: '9',
	            url: '',
	            mainElement: '.main',
	            navigationElement:'#layered-filter-block',
	            toolbar:'.toolbar'


	        },
			_bind: function (element, paramName, defaultValue) {
				element.unbind();
            	if (element.is("select")) {
                	element.on('change', {paramName: paramName, default: defaultValue}, $.proxy(this._processSelect, this));
            	} else {
                	element.on('click', {paramName: paramName, default: defaultValue}, $.proxy(this._processLink, this));
            	}
        	},

			changeUrl: function (paramName, paramValue, defaultValue) {
				_this = this;
				var urlPaths = this.options.url.split('?'),
				baseUrl = urlPaths[0],
				urlParams = urlPaths[1] ? urlPaths[1].split('&') : [],
				paramData = {},
				parameters;
				for (var i = 0; i < urlParams.length; i++) {
					parameters = urlParams[i].split('=');
					paramData[parameters[0]] = parameters[1] !== undefined
					? window.decodeURIComponent(parameters[1].replace(/\+/g, '%20'))
					: '';
				}
				paramData[paramName] = paramValue;
				if (paramValue == defaultValue) {
					delete paramData[paramName];
				}
				paramData = $.param(paramData);
				/*console.log(baseUrl + (paramData.length ? '?' + paramData : ''));*/
				var url = baseUrl + (paramData.length ? '?' + paramData : '');
				var requestUrl = this.addParameterToURL(url,'ajax=1');
				$.ajax({
					url:requestUrl,
					showLoader: true
				}).done(function(data){
					var main = $(_this.options.mainElement);
					$(_this.options.navigationElement).replaceWith(data.sidebar);
					main.html('');
					main.append(data.formkey);
					main.append(data.authentication);
					main.append(data.content);
					_this.sanitizeUrls(_this.options.navigationElement);
					_this.sanitizeUrls(_this.options.toolbar);
					_this.replaceAddress(requestUrl);
					$('body').trigger('contentUpdated');
				});
			},
			sanitizeUrls:function(container)
			{
				//console.log(container);
				_this = this;
				$(container).each(function(){
					$(this).find('a').each(function(){
						var url = this.href;
						this.href = _this.replaceParameters(url);
					});
				});
			},
			addParameterToURL: function(url,param){
				_url = this.replaceParameters(url);
				_url += (_url.split('?')[1] ? '&':'?') + param;
				return _url;
			},
			replaceAddress: function(url)
			{
				window.history.replaceState({},document.title,url.replace(new RegExp('[?&]' + 'ajax' + '=[^&#]*(#.*)?$'),'$1').replace(new RegExp('([?&])' + 'ajax' + '=[^&]*&'), '$1').replace(new RegExp('[?&]' + '_' + '=[^&#]*(#.*)?$'),'$1').replace(new RegExp('([?&])' + '_' + '=[^&]*&'), '$1'));
			},
			replaceParameters: function(string)
			{
				return string.replace(new RegExp('[?&]' + 'ajax' + '=[^&#]*(#.*)?$'),'$1').replace(new RegExp('([?&])' + 'ajax' + '=[^&]*&'), '$1').replace(new RegExp('[?&]' + '_' + '=[^&#]*(#.*)?$'),'$1').replace(new RegExp('([?&])' + '_' + '=[^&]*&'), '$1');
			}

		});

	return $.ajaxnav.productListToolbar;
});