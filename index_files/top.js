/*
 *
 * File Name : top.js [use jquery]
 *
 */



$(window).load(function(){
    para();
});



/*********************************************************************************************/
// パララックス
/*********************************************************************************************/
function para(){
    var _wrap = $('#topWrapper');
    var _wrapInner = $('#wrapInner');
    var maxW = 1920;
    var minW = 1200;
    var scrollTop = $(window).scrollTop();
    var ww = $(window).width();
    var wh = $(window).height();
    
    // parapara
    var _obj;
    var objLength = 0;
    var posY = [];
    var scale = 0;

    
    var para = {
        init : function(){
            _obj = $('#topWrapper').find('.para');
            objLength = _obj.length;
            for(var i=0; i<objLength; i++){
                var y = _obj.eq(i).offset().top;
                posY.push(y);
            }
            
            if(ww < maxW && ww > minW){
                scale = (ww / minW);
                _wrapInner.css({'marginLeft':-(ww/2)});
                _wrap.css({'height':posY[objLength-1] + (ww - minW)});
            }
            else if(ww < maxW && ww < minW){
                _wrapInner.css({'marginLeft':-600});
                _wrap.css({'height':posY[objLength-1]*1.0});
            }
            else if(ww > maxW && ww > minW){
                _wrapInner.css({'marginLeft':-960});
                _wrap.css({'height':posY[objLength-1]*1.2});
            }
            console.log(scale)
        },
        
        action : function(){
            for(var i=0; i<objLength; i++){
                var _target = _obj.eq(i);
                if(_target.hasClass('pat01')){
                    var plus = Math.floor(scrollTop / 3.3);
                }
                else if(_target.hasClass('pat02')){
                    var plus = Math.floor(scrollTop / 4.2);
                }
                else if(_target.hasClass('pat03')){
                    var plus = Math.floor(scrollTop / 5.4);
                }
                else if(_target.hasClass('pat04')){
                    var plus = Math.floor(scrollTop / 12);
                }
                else if(_target.hasClass('pat05')){
                    var plus = Math.floor(scrollTop / 16);
                }
                else if(_target.hasClass('pat06')){
                    var plus = Math.floor(scrollTop / 20);
                }
                _obj.eq(i).css({'transform':'translate3d(0px,'+ (-plus/scale) +'px,0px)'});
            }
            //_wrapInner.css({'transform':'translate3d(0px,'+ (scrollTop/10) +'px,0px)'});
        }
    }
    
    // init
    para.init();
    
    
    $(window).on('scroll', function(){
        scrollTop = $(window).scrollTop();
        para.action();
    });
    
    $(window).on('resize', function(){
        scrollTop = $(window).scrollTop();
        ww = $(window).width();
        wh = $(window).height();
        para.action();
        
        para.init();
    });
}

/*********************************************************************************************/