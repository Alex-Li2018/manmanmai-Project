
//入口函数
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

	//省钱控所有的功能
	var moneyctrl = {
		pageNum : null, //记录总页数
		pageId : 1, //初始化的页面id
		//发送数据渲染图文混排内容
		getPicTxtData : function() {
			
			sendAjax(this.pageId,renderPicTxtAndPaging);
			// fn函数事件响应监听函数
			function renderPicTxtAndPaging (obj) {
					//console.log(obj);
					//调用模板渲染图文混排的数据
					var picTxtHTML = template('tpl-picTxt',obj);
					$('#main-picTxt').html(picTxtHTML);

					//调用模板渲染下拉框分页的数据
				 	pageNum = Math.ceil(obj.totalCount / 14);
					var paging = template('tpl-Paging',{list : pageNum});
					$('#selectPage').html(paging);

					//因为数据是模板渲染上去的所以对于下拉框的操作也要放在监听函数里面
					getNextPrevCurrPicTxtData();
					//发送数据请求当前下一页上一页的数据并渲染
					function getNextPrevCurrPicTxtData () {

						var  pageid= +$('#selectPage').val();; //pageid的页码数
						//------下拉框数据改变就发送ajax发送页面页码和分类ID并渲染页面---------
						$('#selectPage').on('change', function() {

						    //获取选择框里面的id号码,将字符串转成number类型
						    pageid = +$('#selectPage').val();
						    //渲染页面
						    sendAjax(pageid, renderPicTxt);
						});

						//--------------------上一页与下一页的功能实现----------------------
						$('.prevPage').on('click',function(){
							//获取下一页的页码
							var currentPageId = pageid - 1;
							if(currentPageId <= 0) { //如果上一页小于0不执行下面的程序
								return;
							}
							pageid = currentPageId;

							//设置下拉框的显示内容是当前的页码数
							$('#selectPage').val(currentPageId);
							//渲染数据
							sendAjax(currentPageId, renderPicTxt);
						});

						$('.nextPage').on('click',function(){

							var currentPageId = pageid + 1;
							if(currentPageId > pageNum) { //如果下一页大于总页数不执行下面的程序
								return;
							}
						    pageid = currentPageId;
						    $('#selectPage').val(currentPageId);
						    sendAjax(currentPageId, renderPicTxt);
						})

						//渲染图文列表的函数
						function renderPicTxt(obj) {
							var picTxtHTML = template('tpl-picTxt',obj);
							$('#main-picTxt').html(picTxtHTML);
						}
					}
			}
			//发送数据的ajax封装
			function sendAjax (pageId,fn){
				var baseURL = 'http://localhost:9090/api/';
				$.ajax({
					url : baseURL + 'getmoneyctrl',
					dataType : 'json',
					data : {
						pageid : pageId
					},
					success : fn 
				})
			}
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

	//调用方法渲染页面的图文混排的数据
	moneyctrl.getPicTxtData();
	//切换active类
	moneyctrl.overturnActive();
	//返回顶部的方法
	moneyctrl.goTop();
})

