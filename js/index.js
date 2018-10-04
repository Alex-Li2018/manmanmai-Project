
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
                $('#main-menuNav').html(menuHTML);
                //显示更多的菜单导航,9至12显示
                $('#main-menuNav li').eq(7).on('click',function(e){
                    //阻止点击的默认行为
                    e = e || window.event;
                    e.preventDefault();
                    //单击展开,双击收拢的效果
                    if($('#main-menuNav li').eq(8).css('display') == 'none' ) {
                        $('#main-menuNav li').show();
                    }else {
                        //循环遍历让8到11所有的li隐藏
                        for(var n=1;n<5;n++) {
                            $('#main-menuNav li').eq(7+n).css('display','none');
                        }
                    }  
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

    //返回顶部解决办法:
    goTop : function(){
        //在行内已经阻止了a标签的默认行为
       //console.log($('.goTop'));
        $('.goTop').on('click',function(){
            $('html,body').scrollTop(0);
        });
    }
}

