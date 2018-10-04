

$(function(){

	//渲染页面
	var sitenav = (function(){

		//调用方法渲染页面
		getShopNavData();

		//获取数据的方法
		function getShopNavData () {
			$.ajax({
				url : 'http://localhost:9090/api/getsitenav',
				dataType : 'json',
				success : function(obj){
					console.log(obj);
					//渲染页面
					var shopNavHTML = template('tpl-shopNav',obj);
					$('.shopNav ul').html(shopNavHTML);
				}
			});
		}

	}());
});