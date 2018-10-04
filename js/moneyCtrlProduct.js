

$(function(){

	//初始化插件达到弹簧效果
	var swiper = new Swiper('.swiper-container', {
	   direction: 'horizontal', //改成横向的变化
	   slidesPerView: 'auto',
	   freeMode: true,
	   scrollbar: {
	     el: '.swiper-scrollbar',
	   },
	   mousewheel: true,
	});

	var moneyCtrlProduct = {
		//获取页面url路径里面的productid
		productId : location.search,
		//获取图文信息并渲染
		getPicTxtData : function(){

			// 看是否获取到console.log(this.productId);
			//处理获取到的id
			var ID = +this.productId.slice(11); //转成num类型
			this.sendAjax(ID,renderPicTxt);

			function renderPicTxt (obj) {

				//console.log(obj.result[0]);
				var objData = obj.result[0];
				//替换图片
				$('.pic').html(objData.productImg2);
				//替换info里面的内容
				$('.info .mall').text(objData.productFrom);
				$('.info .addtime').text(objData.productTime);
				$('.info .author').text(objData.productTips);
				//更换标题
				$('.title').text(objData.productName);
				$('.subtitle').text(objData.productPinkage);
				//更换内容
				$('.content .conn').text(objData.productInfo2);
				//处理获取到的字符串 a链接的字符串 以及描述的字符串
				var aText = objData.productInfo.slice(0,4);
				var desText =   objData.productInfo.slice(4);
				// console.log(aText,desText);
				$('.content .description a').text(aText);
				$('.content .description span').text(desText);
				//添加城市供货列表
				$('.city').html(objData.productCity);
				//添加评论	
				$('.commentCont').html(objData.productComment);
			}
		},
		//封装的发送ajax的方法
		sendAjax : function(productId,fn){
			var baseURL = 'http://localhost:9090/api/';
			$.ajax({
				url : baseURL + 'getmoneyctrlproduct',
				dataType : 'json',
				data : {productid : productId},
				success : fn
			});
		},

		//点击导航栏active切换
		overturnActive : function(){
			$('.swiper-slide li').on('click',function(){
				$(this).addClass('active').siblings().removeClass('active');
				
			});
		},
		//返回顶部解决办法:
		goTop : function(){
		  //在行内已经阻止了a标签的默认行为
		  $('.goTop').on('click',function(){
		      $('html,body').scrollTop(0);
		  });
		}
	}

	//调用函数渲染页面
	moneyCtrlProduct.getPicTxtData();
	//导航栏切换active类的操作
	moneyCtrlProduct.overturnActive();
	//返回顶部
	moneyCtrlProduct.goTop();
});
