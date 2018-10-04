
// 入口函数
$(function(){

	//一加载之后,就显示加载图片
	// $('#main').css({
	// 	background : 'url(./images/loading.gif) center no-repeat',
	// 	height : '414px'
	// });

	//创建一个对象
	var mmb_category = new Category();

	//调用方法渲染商品列表页面
	mmb_category.getproductData();

	//调用方法返回顶部
	mmb_category.goTop();

})


var Category =  function () {
	
}

Category.prototype = {

	baseURL : 'http://localhost:9090/api/',

	//获取数据渲染商品列表以及详情页面
	getproductData : function(){

		//将baseURL获取到存入到变量中.
		var baseURL = this.baseURL;

		$.ajax({
			url : this.baseURL + 'getcategorytitle',
			dataType : 'json',
			success : function(obj){

				//渲染商品列表	 注意返回过来的数据格式
				var productListHTML = template('tpl-productList',{list : obj.result});
				//商品列表渲染完成后,立即渲染商品详情 
				$('.briefIn').html(productListHTML);

				sendAjaxGetProductDetail();

				// 发送ajax请求对应商品的详细数据并渲染
				function sendAjaxGetProductDetail () {
					var index = 0;
					sendAjax();
					function sendAjax(){

						if(index > 7) {
							//加上点击商品头部就显示商品内容,手风琴的效果 单击展开双击收拢
							$('.productList').on('click',function(){
								//单击展开双击收拢
								var productListID = this.dataset.id;
								// 手风琴的效果
								if( $('.productDetail').eq(productListID).css('display') == 'none') {
									$('.productDetail').eq(productListID).css('display','table');
									//加上向上的箭头符号
									$('.productList').eq(productListID).find('.title').addClass('active');
								}else {
									$('.productDetail').eq(productListID).css('display','none');
									//去掉向上的箭头符号,变成向下的箭头
									$('.productList').eq(productListID).find('.title').removeClass('active');
								}
							});
							//超过7就退出递归
							return;
						}
						//获取当前对应的ID号码
						var  titleid = $('.productList')[index].dataset.id; 
						//每一次只渲染一个商品详情页面
						$.ajax({
							url : baseURL + 'getcategory',
							dataType : 'json',
							async : false,
							data : { titleid : titleid  },
							success :function(obj) {
								var target = (obj.result.length%3==0)?obj.result.length/3:Math.ceil(obj.result.length/3);
								var OBJ = {
									target : target,
									result : obj.result,
									//判断手风琴效果的ID
									indexID : index
								}
								//console.log(OBJ);
								//渲染到页面上
								var productDetailHTML = template('tpl-productDetail',OBJ);	
								$('.productList').eq(index).after(productDetailHTML);
								index++;
								//利用递归实现
								sendAjax();
							}
						});
					}	
				}		
			}
		});
	},

	//返回顶部解决办法:
   goTop : function(){
      //在行内已经阻止了a标签的默认行为
      //console.log($('.goTop'));
      $('.goTop').on('click',function(){
         $('html,body').scrollTop(0);
      });
   }
};