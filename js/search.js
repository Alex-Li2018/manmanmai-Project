
$(function(){

	var search = {

		//添加历史记录
		addHistory : function(){
			var that = this;
			$('#search-btn').on('click',function(){
				
				//先判断输入框里面是否有内容
				var searchCont= $('#search-input').val();
				if(!searchCont) {
					//没有内容直接跳出去
					return false;
				}
				//在localstorage中去判断生成一个searchData的数组
				var searchData = localStorage.getItem('searchHistory');
				//判断searchData是否有值
				if(searchData) {
					//如果有值,那么把字符串数据取出变为数组
					searchData = JSON.parse(searchData);
				}else {
					//如果没有值就让其为空数组
					searchData = [];
				}
				//判断搜索的内容是否已经出现在历史记录中
				if(searchData.indexOf(searchCont) == -1) {
					//没有出现,就把内容作为第一个加到数组里
					searchData.unshift(searchCont);
				}else {
					// 删除这个数据的旧值
					searchData.splice(searchData.indexOf(searchCont),1);
					// 再把这个新的值添加在最前面
					searchData.unshift(searchCont);
				}

				//在把数据存入localstorage中,不过存的是字符串
				localStorage.setItem('searchHistory',JSON.stringify(searchData));

				//调用查询历史记录的方法
				that.queryHistory();
				//清空下拉框里面的数据
				$('#search-input').val("");
				//隐藏搜索记录
				$('.search-history ul').hide();
			})
		},

		//查询历史记录
		queryHistory : function(){
			//先取出来
			var searchData = JSON.parse(localStorage.getItem('searchHistory'));
			//再操作:取出前三位渲染到页面上
			//循环遍历生成li标签
			var liHTML = "";
			for(var i=0;i<3;i++) {
				//searchData里面有没有数据
				if(searchData[i]) {
					var str = '<li>'+ searchData[i] +'</li>';
					liHTML += str;
				}
			}
			//给输入框一个成为焦点事件
			$('#search-input').on('focus',function(){
				$('.search-history ul').html(liHTML);
				//再给li一个移入移出事件
				$('.search-history ul li').on('click',function(){
					//$(this).addClass('active');
					$('#search-input').val($(this).text());
					$('.search-history ul').hide();
				});
				//移动端没有移入移出事件
				// $('.search-history ul li').on('mouseleave',function(){
				// 	$(this).removeClass('active');
				// });
			});
			//给输入框一个失去焦点事件
			// $('#search-input').on('blur',function(){
			// 	//清空下拉框里面的数据
			// 	//$('#search-input').val("");
			// 	//隐藏搜索记录
			// 	$('.search-history ul').hide();
			// });
		}

	};

	//调用查询方法,渲染数据到页面
	search.queryHistory();
	//调用添加方法
	search.addHistory();

});