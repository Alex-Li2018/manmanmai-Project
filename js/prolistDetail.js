
//利用闭隔断作用域
!(function (){

		var baseURL = 'http://localhost:9090/api/'; //基本的url路径
		var productId = window.location.search; //获取productId号
		productId = +productId.slice(11); //转成num类型

		//渲染图文混排的部分
		getPicTxtData ();
		//渲染用户评论部分
		getUserComment();
		//返回顶部的功能
		goTop();

		//------渲染图文混排的内容导航--------
		function getPicTxtData () {
			$.ajax({
				url : baseURL + 'getproduct',
				dataType : 'json',
				data : {
					productid : productId
				},
				success : function(obj){
					
					//生成图片标签
					var imgHTML = obj.result[0].productImg + '<a href="#"><img src="./images/sc.jpg" alt=""></a>';
					// 改变内容标签
					$('.pic').html(imgHTML);
					$('.txt').text(obj.result[0].productName);
					$('.price span').text();
					$('#table').html(obj.result[0].bjShop)
				}
			});
		}

		//-------获取用户评论的数据-------
		function getUserComment () {
			$.ajax({
				url : baseURL + 'getproductcom',
				dataType : 'json',
				data : {
					productid : productId
				},
				success : function(obj) {
					//生成模板并渲染
					var commentHTML = template('tpl-userComment',obj);
					$('.com-title').after(commentHTML);
				}
			});
		}

		//------返回顶部的功能--------
		function goTop (){
		  //在行内已经阻止了a标签的默认行为
		 	//console.log($('.goTop'));
		  $('.goTop').on('click',function(){
		      $('html,body').scrollTop(0);
		  });
		}
}())