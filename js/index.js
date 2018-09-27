
$(function () {
    // 入口函数
    var mmb = new MMB();

    //调用方法请求数据渲染菜单导航页面
    mmb.get_mainNavData();

    //调用方法请求数据渲染图文混排页面
    mmb.get_mainPicTxtData();
   

});


// 构造函数
var MMB = function() {

};

// 定义原型链上面的方法
MMB.prototype = {
    //最基本的url路径属性baseUrl
    // baseUrl :  'http://localhost:9090/api/', //联网端口
    baseUrl :  'http://localhost:9090/api/',  //本地端口

    //请求菜单导航数据
    get_mainNavData : function(){
        $.ajax({
            url : this.baseUrl + 'getindexmenu',
            type : 'get',
            dataType : 'jsonp',
            success : function(result){
                //console.log(result);
                var menuHTML = template('tpl-mainNav',result);
                //console.log(menuHTML);
                $('#main-menuNav').html(menuHTML);
                //显示更多的菜单导航,9至12显示
                $('#main-menuNav li').eq(7).on('click',function(){
                    $('#main-menuNav li').show();
                })
            }
        });
    },

    //请求获取图文混排的数据
    get_mainPicTxtData :  function(){
        $.ajax({
            url : this.baseUrl + 'getmoneyctrl',  
            type : 'get',
            dataType : 'jsonp',
            success : function(obj){
                //console.log(obj.result);    
                //渲染页面
                var liHTML = template('tpl-picTxt',{list: obj.result});
                //console.log(liHTML);
                $('.goodslist').html(liHTML);
            }
        });
    }
}

