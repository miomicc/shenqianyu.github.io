/*
 *
 * File Name : common.js [use jquery]
 *
 */



$(window).load(function(){
    smoothScroll();
    fixedHeader();
    $('.target').delay(500).scrollClass();
});



/*********************************************************************************************/
// IE対応console.log
/*********************************************************************************************/
if(!('console' in window)){
	window.console = {};
	window.console.log = function(str){
		return str;
	};
}
/*********************************************************************************************/


/*********************************************************************************************/
// スルスルスクロール
/*********************************************************************************************/
function smoothScroll(){
	var span   = 1000; //スピード
	var effect = 'easeOutExpo'; //アニメーション

	$("a.scroll").on('click', function(){
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            $(this).blur();
            var t = navigator.appName.match(/Opera/) ? "html" : "html,body";
            $(t).queue([]).stop();
            var $targetElement = $(this.hash);
            var scrollTo = $targetElement.offset().top;
            if (window.scrollMaxY) {
                var maxScroll = window.scrollMaxY;
            } else {
                var maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            }
            if (scrollTo > maxScroll){
                scrollTo = maxScroll;
            }
            $(t).animate({ scrollTop: scrollTo }, span, effect);
            return false;
        }
	});
}
/*********************************************************************************************/


/*********************************************************************************************/
// 固定ヘッダー
/*********************************************************************************************/
function fixedHeader(){
    var easing = 'easeOutExpo';
    var target = $('#fixNav');
    var _bg = $('#gnavBG');
    var w = $(window);
    var ww = w.width();
    var wh = w.height();
    var offset = target.position().top;
    var st = w.scrollTop();
    var fixFlag = false;
    
    var scroll = {
        set : function(){
            if(st >= offset){
                if(fixFlag === true) return;
                fixFlag = true;
                _bg.stop(true, true).animate({'height':60}, 200, easing);
                target.css({'position':'fixed', 'bottom':'auto', 'top':'0', 'left':'auto'});
            }
            else {
                if(fixFlag === false) return;
                fixFlag = false;
                _bg.stop(true, true).animate({'height':0}, 200, easing);
                target.css({'position':'absolute', 'bottom':'0', 'top':'auto', 'left':'auto'});
            }
        }
    };
    
    // init
    scroll.set();
    
    // event
    $(window).on('scroll', function(){
        st = w.scrollTop();
        scroll.set();
    });
    
    $(window).on('resize', $.throttle(250, function(){
        wh = w.height();
        ww = w.width();
        scroll.set();
    }));
}
/*********************************************************************************************/



/*********************************************************************************************/
// スロールに合わせてclass追加
/*********************************************************************************************/
(function($){
    $.fn.scrollClass = function(config){
        var defaults = {};
        var config = $.extend(defaults, config);
        var target = this;

        function addAction(){
            var length = target.length;
            for(var i=0; i<length; i++){
                if(target.eq(i).hasClass('action')) continue;
                
                var in_position = target.eq(i).offset().top + 100;
                var window_bottom_position = $(window).scrollTop() + $(window).height();
                if(in_position < window_bottom_position){
                    target.eq(i).addClass('action');
                }
            }
        }
        addAction();

        $(window).on('scroll', $.throttle(250, function(){
            addAction();
        }));
        return target;
    };
} )(jQuery);
/*********************************************************************************************/