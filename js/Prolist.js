

//利用沙箱包裹,隔断作用域
!(function(){
	var baseURL = 'http://localhost:9090/api/';
	var pageid = 1; //默认初始页面是1
	var categoryid = window.location.search; //获取从比价搜素页面传递过来的分类id
	categoryid = categoryid.substring(12);

	//调用方法:初始化获取商品列表并渲染数据
	getproductlistData();

	//调用返回顶部的方法
	goTop();

	//----------返回顶部解决办法-----------
   function  goTop(){
     //在行内已经阻止了a标签的默认行为
     $('.goTop').on('click',function(){
         $('html,body').scrollTop(0);
     });
    }

	//-------发送ajax请求商品列表信息----------
	function getproductlistData() {
	    //请求第一页的数据
	    sendAjax(categoryid, 1, successLoad);
	}

	//------下拉框数据改变就发送ajax发送页面页码和分类ID并渲染页面---------
	$('#selectPage').on('change', function() {

	    //获取选择框里面的id号码,将字符串转成number类型
	    pageid = +$('#selectPage').val();
	    //渲染页面
	    sendAjax(categoryid, pageid, successLoad);
	});

	//--------------------上一页与下一页的功能实现----------------------
	function getNextProductlistData() { //是在行内调用的要暴露出去

		 //获取下一页的页码
	    var currentPageId = pageid + 1;
	    if(currentPageId >= 19) {
	    	 $('#selectPage').val(19);
	    	return;
	    }
	    pageid = currentPageId;

	    //设置下拉框的显示内容是当前的页码数
	    $('#selectPage').val(currentPageId);
	    //渲染数据
	    sendAjax(categoryid, currentPageId, successLoad);
	}

	function getPreProductlistData() {

	    var currentPageId = pageid - 1;
	    if(currentPageId <= 0) {
	    	 $('#selectPage').val(1);
	    	return;
	    }
	    pageid = currentPageId;

	    //$('#selectPage').find('option[value="' + currentPageId + '"]').attr('selected', 'true');
	    $('#selectPage').val(currentPageId);
	    sendAjax(categoryid, currentPageId, successLoad);
	}


	//-------------------下面是发送ajax的模板--------------------------
	// 发送ajax的请求
	function sendAjax(categoryid, pageid, fn) {
	    $.ajax({
	        url: baseURL + 'getproductlist',
	        dataType: 'json',
	        data: {
	            categoryid: categoryid,
	            pageid: pageid
	        },
	        //事件成功后的响应体函数
	        success: fn
	    });
	}

	//渲染页面
	function successLoad(obj) {

		 console.log(obj); //查看响应体
	    //渲染数据到页面上
	    var picTxtHTML = template('tpl-picTxt', obj);
	    // 渲染数据到页面上
	    $('#main-picTxt').html(picTxtHTML);
	}


	//将上一页与下一页的功能暴露出去让外面的行内点击事件用
	window.getNextProductlistData = getNextProductlistData;
	window.getPreProductlistData = getPreProductlistData;

}(window));
