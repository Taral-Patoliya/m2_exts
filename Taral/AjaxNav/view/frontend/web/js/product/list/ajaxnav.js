define([
	"jquery",
	"jquery/ui"
], function($){
	$.widget("ajaxnav.productListSidebar",{
		options:{
			mainElement: '.main',
	        navigationElement:'#layered-filter-block'
		},
		_create: function()
		{
			alert("hi");
		}
	});
});