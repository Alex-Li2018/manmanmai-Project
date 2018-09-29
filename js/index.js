
$(function () {
    // 入口函数
    var mmb = new MMB();

    //调用方法请求数据渲染菜单导航页面
    mmb.get_mainNavData();

    //调用方法请求数据渲染图文混排页面
    mmb.get_mainPicTxtData();
   
    //解决悬浮窗
    //mmb.scrollMove();

    //一键返回顶部
    mmb.goTop();

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
                console.log(result);
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
    },

    //悬浮窗解决办法
    scrollMove : function(){
        // $(window).on('scroll',function(){

        //     // 获取页面滚动条滚动的高度
        //     var scrollTop = $('html,body').scrollTop();
        //     // 获取页面可视区的高度
        //     var clientHeight = $('html,body').height();
        //     // 获取悬浮窗元素的高度
        //     var scrollsidebarHeight = $('#scrollsidebar').height();     

        //     // 获取悬浮窗在页面中的定位位置
        //     var positionY = parseInt(( clientHeight - scrollsidebarHeight ) /2 + scrollTop);

        //     console.log(positionY);
        //     //$('#scrollsidebar').css('top',positionY);
        // });
    }, 

    //返回顶部解决办法:
    goTop : function(){
        //在行内已经阻止了a标签的默认行为
       //console.log($('.goTop'));
        $('.goTop').on('click',function(){
            $('html,body').scrollTop(0);
        });
    }
}

