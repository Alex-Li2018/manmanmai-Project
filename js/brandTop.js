
$(function(){

	var brandTop = {

		//获取商品名字数据并存入数组
		brandName : ["平板电视十大品牌", "液晶电视十大品牌", "LED电视十大品牌", "等离子电视十大品牌", "3D电视十大品牌", 
		"智能电视十大品牌", "网络电视十大品牌", "空调十大品牌", "变频空调十大品牌", "中央空调十大品牌", 
		"移动空调十大品牌", "嵌入式空调十大品牌", "冷暖空调十大品牌", "挂壁式空调十大品牌", "单冷空调十大品牌",
		 "风管式空调十大品牌", "家庭影院十大品牌", "冰箱十大品牌", "对开门冰箱 十大品牌", "迷你冰箱十大品牌", 
		 "双门冰箱十大品牌", "三门冰箱十大品牌", "DVD高清播放器十大品牌", "蓝光dvd播放器十大品牌", 
		 "音响/音箱十大品牌", "洗衣机十大品牌", "滚筒洗衣机十大品牌", "全自动洗衣机十大品牌", "迷你洗衣机十大品牌",
		  "干衣机十大品牌", "波轮洗衣机十大品牌", "脱水机十大品牌", "双缸洗衣机十大品牌", "热水器十大品牌", 
		  "燃气热水器十大品牌", "空气能热水器十大品牌", "电热水器十大品牌", "电热水龙头十大品牌", 
		  "即热式热水器十大品牌", "太阳能热水器十大品牌", "酒柜/冰吧/冷柜十大品牌", "酒柜十大品牌", 
		  "消毒柜/洗碗机十大品牌", "手机十大品牌", "智能手机十大品牌", "直板手机十大品牌", "翻盖手机十大品牌", 
		  "安卓手机十大品牌", "滑盖手机十大品牌", "数码相机十大品牌", "单反相机十大品牌", "长焦相机十大品牌", 
		  "单电相机 十大品牌"],

		//获取页面的品牌id号码
		getBrandtitleId : function(){
			var brandtitleId = location.search;
			brandtitleId = brandtitleId.substring(14);
			return brandtitleId;
		},

		//修改标题里对应的文字
		modifyTitle : function(){
			//获取品牌ID
			var brandtitleId = this.getBrandtitleId();
			var baseTitle = this.brandName[brandtitleId].replace('十大品牌','');
			$('.navBrankNam').text(baseTitle);
			//遍历改变文章顶部
			$('.title').each(function(index,ele){
				//改变页面里不同的标题里的文字
				switch (index) {
					case 0 : 
						$(ele).text(baseTitle + '那个牌子好');
						break;
					case 1 : 
						$(ele).text(baseTitle + '销量排行');
						break;
					case 2 : 
						$(ele).text(baseTitle + '最有用的用户评论');
						break;
					default : 
						$(ele).text(baseTitle);
						break;
				} 
			})
		},

		//获取最好牌子的数据并渲染
		getBestBrandData : function () {

			//获取品牌ID
			var brandtitleId = this.getBrandtitleId();
			this.sendAjax('getbrand',{ brandtitleid : brandtitleId },renderBestBrand);
			//渲染页面
			function renderBestBrand (obj) {
				//console.log(obj);
				var bestBrandHTML = template('tpl-bestBrand',obj);
				$('.brandList ul').html(bestBrandHTML);
			}
		},

		//获取销量最好的数据并渲染
		getBestSale : function(){

			//获取品牌ID
			var brandtitleId = this.getBrandtitleId();
			this.sendAjax('getbrandproductlist',{ brandtitleid : brandtitleId,pagesize : 4 },renderBestSale);
			function renderBestSale (obj) {
				//console.log(obj);
				var bestSaleHTML = template('tpl-bestSale',obj);
				$('.picTxt ul').html(bestSaleHTML);
			}
		},

		//获取评论数据并渲染
		getCommentData : function(){

			this.sendAjax('getproductcom',{productid : 1},renderComment);
			//渲染评论数据
			function renderComment(obj) {
				//console.log(obj);
				var commentHTML = template('tpl-com',obj);
				$('.plList ul').html(commentHTML);
			}
		}, 

		//发送ajax数据函数
		sendAjax : function(url,data,fn){
			var baseURL = 'http://localhost:9090/api/';
			$.ajax({
				url : baseURL + url,
				dataType : 'json',
				data : data,
				success : fn
			});
		}
	};

	//调用方法,渲染那个牌子好
	brandTop.getBestBrandData();
	//调用方法,渲染那个销量好
	brandTop.getBestSale();
	//调用方法,渲染评论页面
	brandTop.getCommentData();

	brandTop.modifyTitle();
});