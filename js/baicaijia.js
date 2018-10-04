
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

	var baicaijia = {

		//获取导航栏的内容
		getNavData : function(){

			//在发送请求的时候就渲染热销(id=1)这一个页面
			this.getPicTxtData(1);
			//把getPicTxtData函数拿到此方法中,相当于就是一个getPicTxtData的函数
			var getPicTxtData = this.getPicTxtData;
			// console.log(getPicTxtData); 检查是否是这个函数
			$.ajax({
				url : 'http://localhost:9090/api/getbaicaijiatitle',
				success : function(obj){
					var navHTML = template('tpl-nav',obj);
					$('.navUL').html(navHTML);

					//给导航栏一个点击事件,加载对应的页码
					$('.navUL li').on('click',function(e){
						//阻止事件的默认跳转
						e = e || window.event;
						e.preventDefault();

						var titleid = $(this).find('a')[0].dataset.id;
						//刷新当前页面的内容
						getPicTxtData(titleid);
					});
				}
			});
		},

		//获取图文混排的内容
		getPicTxtData : function(titleid){

			//渲染界面
			sendAjax(titleid,renderPicTxt);
			//渲染界面的事件监听回调函数
			function renderPicTxt (obj) {
				//console.log(obj);
				var picTxtHTML = template('tpl-txtPic',obj);
				$('#main').html(picTxtHTML);
			}
			//发送ajax的封装
			function sendAjax (titleId,fn){
				var baseURL = 'http://localhost:9090/api/';
				$.ajax({
					url : baseURL + 'getbaicaijiaproduct',
					data : {
						titleid : titleId
					},
					dataType : 'json',
					success : fn 
				});
			}
		}
	}

	//调用方法渲染导航栏并渲染页面中的图文混排
	baicaijia.getNavData();
});