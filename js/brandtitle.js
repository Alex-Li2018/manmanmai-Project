

$(function () {
	
	var brandList = {

		//获取商品数据并渲染
		getBrandData : function(){
			$.ajax({
				url : 'http://localhost:9090/api/getbrandtitle',
				dataType : 'json',
				success : function(obj){
					console.log(obj);
					var brandHTML = template('tpl-brand',obj);
					$('.brandList').html(brandHTML);
				}
			});
		}
	}

	//调用方法并渲染数据
	brandList.getBrandData();

})