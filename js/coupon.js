
$(function(){

	var coupon = {

		//获取导航栏数据并渲染
		getNavData : function(){
			$.ajax({
				url : 'http://localhost:9090/api/getcoupon',
				dataType : 'json',
				success : function(obj){

					//console.log(obj.result);
					//循环遍历生成内容
					var strHTML = "";
					for(var i=0;i<obj.result.length;i++){
						var str = '<li><a href="'+ obj.result[i].couponLink + '?couponid=' + obj.result[i].couponId
											+'"><img src="'+ obj.result[i].couponImg
											+'" alt=""><p>'+ obj.result[i].couponTitle
											+'</p></a></li>';
						strHTML += str; 					
					}
					//渲染到页面上
					$('#nav ul').html(strHTML); 
				}
			});
		}
	}

	coupon.getNavData();

})