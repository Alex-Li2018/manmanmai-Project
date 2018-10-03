
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

	var inlanddiscount = {

		//获取图文混排的数据并渲染
		getPicTxtData : function(){

			//发送ajax请求数据
			this.sendAjax(renderPicTxt);

			//渲染页面的响应完成函数
			function renderPicTxt(obj){
				var objData = obj.result;
				//console.log(objData);	
				//渲染数据到页面上
				var picTxtHTML = template('tpl-picTxt',obj);
				$('.picTxt').html(picTxtHTML);

				//调用下拉刷新的函数
				scrollRefresh();
			}
			//下拉刷新功能实现
			function scrollRefresh (){
				
				//监听页面滚动事件
				window.onscroll = function(){
					//如果页面滚动的高度大于页面内容ul的高度就继续渲染内容
					if(getScrollTop() == getRefreshfHeight() ) {
						//console.log('我在加载刷新中');
						// 继续发送ajax来渲染页面
						$.ajax({
							url : 'http://localhost:9090/api/' + 'getinlanddiscount',
							dataType : 'json',
							success : function(obj){
								var picTxtHTML = template('tpl-picTxt',obj);
								$('.picTxt').append(picTxtHTML);
							}
						})
					}
				};

				//获取滚动条当前的滚动高度位置
				function getScrollTop() {
					var scrollTop ;
					if(document.documentElement && document.documentElement.scrollTop) {
					   scrollTop = document.documentElement.scrollTop;
					} else if(document.body) {
					  scrollTop = document.body.scrollTop;
					}
					//console.log(scrollTop);
					return scrollTop;
				}

				//获取需要刷新的高度  
				function getRefreshfHeight() {
					//	刷新的高度
					var refreshfHeight = 0;
				   // 获取下拉刷新的具体高度,从此处开始刷新页面
				   refreshfHeight =  $('.picTxt').offset().height - 536;
				   //console.log(refreshfHeight);
				   return refreshfHeight;
				}
			}
		},

		//发送ajax方法封装
		sendAjax : function (fn) {
			var baseURL = 'http://localhost:9090/api/';
			$.ajax({
				url : baseURL + 'getinlanddiscount',
				dataType : 'json',
				success : fn 
			});
		},

		//点击导航栏active切换
		overturnActive : function(){
			$('.swiper-slide li').on('click',function(){
				$(this).addClass('active').siblings().removeClass('active');
			});
		}	
	}

	//调用对象实现渲染页面的功能
	inlanddiscount.getPicTxtData();
	//导航栏切换active类的操作
	inlanddiscount.overturnActive();
})