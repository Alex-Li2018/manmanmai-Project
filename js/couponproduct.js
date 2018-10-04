
$(function () {
		
	var couponproductFN = (function(){

		//基本的url路径
		var baseURL = 'http://localhost:9090/api/';
		var couponID = window.location.search;
		couponID = couponID.substring(10);

		//发送ajax渲染页面
		$.ajax({
			url : baseURL + 'getcouponproduct',
			data : {
				couponid : couponID 
			},
			dataType : 'json',
			success : function(obj){
				//console.log(obj);
				var picTxtHTML = template('tpl-picTxt',obj);
				$('.picTxt ul').html(picTxtHTML);

				//给页面的图片一个点击事件,如果被点击那么显示遮罩层
				$('.picTxt img').on('click',function(e){

					//阻止事件的冒泡
					// e = e || window.event;
					// e.stopPropagation();

					$('#cover').show();
					var swiper = new Swiper('.swiper-container', {
				      navigation: {
				        nextEl: '.swiper-button-next',
				        prevEl: '.swiper-button-prev',
				      },
				   });
				});
			}
		});

	}());	
})