
$(function(){

	var gsproductFN = !(function(){
		
		var gsproduct = {
			baseURL : 'http://localhost:9090/api/',
			//给头部导航一个点击事件点击谁就展开对应的下拉框
			coudanBoxClick : function(){
				$('.coudan-box li').on('click',function(){

					//判断每一个i标签里面是否有on类名
					if(!$(this).find('i').hasClass('on')) {

						//每次点击之前先清除其他的on类 排他
						$('.coudan-box li i').removeClass('on');
						//每次点击之前先隐藏其他的下拉框
						$('.popsort,.popaddr,.popprice').hide();
						//没有就加上
						$(this).find('i').addClass('on');

						//展开对应的下拉框
						var classNam = '.pop' + this.className;
						$(classNam).show();
					}else {
						//有了,li被点击了就取消掉
						$(this).find('i').removeClass('on');
						//每次点击之前先隐藏其他的下拉框
						$('.popsort,.popaddr,.popprice').hide();
					}
				});
			},

			//获取店铺信息
			getSortData : function (){
				this.sendAjax('getgsshop','.popsort');
			},

			//获取区域信息
			getAreaData : function(){
				this.sendAjax('getgsshoparea','.popaddr');
			},

			//发送ajax函数的封装
			sendAjax : function (url,ele) {
				var baseURL = this.baseURL;
				var getPicTxtData = this.getPicTxtData; //在此处声明图文混排的数据的函数,方便下面调用
				$.ajax({
					type : 'get',
					url : baseURL + url,
					dataType : 'json',
					success : function (obj){

						//渲染店铺详情
						//console.log(obj.result);
						//循环生成下拉框内容并渲染到页面上
						var strHTML = "";
						for(var i=0;i<obj.result.length;i++) {
							if(obj.result[i].areaName){
								var str = '<li data-areaId="'+ obj.result[i].areaId +'"><a href="#">'+ obj.result[i].areaName +'<i></i></a></li>';
							}else {
								var str = '<li data-shopId="'+ obj.result[i].shopId +'"><a href="#">'+obj.result[i].shopName+'<i></i></a></li>';
							}
							strHTML += str;
						}

						//渲染到页面上
						$(ele+' ul').html(strHTML);
						//点击刷新效果实现
						popboxClickRender();

						//给下拉框里面的数据一个点击渲染事件
						function popboxClickRender() {

							var shopId = areaId = 0; //获取商品地域的id号码
							$('.popsort li').on('click',function(){
								shopId = this.dataset.shopid;
								getPicTxtData(shopId,areaId);
								//每次点击之后隐藏下拉框
								$('.popsort,.popaddr,.popprice').hide();
								//每次点击完后将头部导航的箭头变为向下
								$('.sort i').removeClass('on');
							});
							$('.popaddr li').on('click',function(){
								areaId = this.dataset.areaid;
								getPicTxtData(shopId,areaId);
								//每次点击之后隐藏下拉框
								$('.popsort,.popaddr,.popprice').hide();
								//每次点击完后将头部导航的箭头变为向下
								$('.addr i').removeClass('on');
							})
						}	
					}
				});
			},

			//获取图文混排的数据
			getPicTxtData : function(shopId,areaId){
				var baseURL = 'http://localhost:9090/api/';
				$.ajax({
					url : baseURL + 'getgsproduct',
					dataType : 'json',
					data : {
						shopid : shopId,
	 					areaid : areaId
					},
					success : function (obj) {
						//console.log(obj);
						var picTxtHTML = template('tpl-picTxt',obj);
						$('.picTxt ul').html(picTxtHTML);
					}
				});
			}
		};

		//调用方法,展开对应的下拉框
		gsproduct.coudanBoxClick();
		//调用方法,渲染店铺详情
		gsproduct.getSortData();
		//调用方法,渲染区域详情
		gsproduct.getAreaData();
		//调用方法,渲染图文混排部分
		gsproduct.getPicTxtData(0,0);
	}());
});