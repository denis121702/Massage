include("js/bgStretch.js");
include("js/sImg.js");
include("js/jquery.color.js");
include("js/jquery.backgroundpos.js");
include("js/jquery.easing.js");
include("js/jquery.mousewheel.js");
include("js/jquery.fancybox-1.3.4.pack.js");
include("js/uScroll.js");
include("js/googleMap.js");
include("js/superfish.js");
include("js/switcher.js");
include("js/MathUtils.js");

function include(url) {
    document.write('<script src="' + url + '"></script>');
}
var MSIE = true, OPR = true, content, defColor, defMh, h;

function addAllListeners() {
    var val1 = $('.readMore').css('color');
    $('.readMore').hover(
        function(){
            $(this).stop().animate({'color':'#fff'},300,'easeOutExpo');
        },
        function(){
            $(this).stop().animate({'color':val1},400,'easeOutCubic');
        }
    );
    var val2 = $('.list2>li>a').css('color');
    $('.list2>li>a').hover(
        function(){
            $(this).stop().animate({'color':'#fff'},300,'easeOutExpo')
                .parent().addClass('hover');
        },
        function(){
            $(this).stop().animate({'color':val2},500,'easeOutCubic')
                .parent().removeClass('hover');
        }
    );
    $('.list4>li>figure>a,.list6>li>figure>a')
    .find('strong').css('top','200px').end()
    .hover(
        function(){
            if (!MSIE){
                $(this).children('.sitem_over').css({display:'block',opacity:'0'}).stop().animate({'opacity':1}).end() 
                .find('strong').css({'opacity':0}).stop().animate({'opacity':1,'top':'0'},350,'easeInOutExpo');
            } else { 
                $(this).children('.sitem_over').stop().show().end()
                .find('strong').stop().show().css({'top':'0'});
            }
        },
        function(){
            if (!MSIE){
                $(this).children('.sitem_over').stop().animate({'opacity':0},1000,'easeOutQuad',function(){$(this).children('.sitem_over').css({display:'none'})}).end()  
                .find('strong').stop().animate({'opacity':0,'top':'200px'},1000,'easeOutQuad');  
            } else {
                $(this).children('.sitem_over').stop().hide().end()
                .find('strong').stop().hide();
            }            
        }
    );
    $('.prev').hover(
        function(){
            $(this).css({'backgroundPosition':'center bottom'})
                .children('span').stop().animate({'backgroundPosition':'right center'},300,'easeOutExpo');
        },
        function(){
            $(this).css({'backgroundPosition':'center top'})
                .children('span').stop().animate({'backgroundPosition':'left center'},400,'easeOutCubic');
        }
    );
    $('.next').hover(
        function(){
            $(this).css({'backgroundPosition':'center bottom'})
                .children('span').stop().animate({'backgroundPosition':'left center'},300,'easeOutExpo');
        },
        function(){
            $(this).css({'backgroundPosition':'center top'})
                .children('span').stop().animate({'backgroundPosition':'right center'},400,'easeOutCubic');
        }
    );
    $('.pause').hover(
        function(){
            $(this).css({'backgroundPosition':'center bottom'})
                .children('span').stop().animate({'backgroundPosition':'1px top'},300,'easeOutExpo');
        },
        function(){
            $(this).css({'backgroundPosition':'center top'})
                .children('span').stop().animate({'backgroundPosition':'1px bottom'},400,'easeOutCubic');
        }
    );   
	$('.pause-menu').hover(
        function(){
            $(this).css({'backgroundPosition':'center bottom'})
                .children('span').stop().animate({'backgroundPosition':'1px top'},300,'easeOutExpo');
        },
        function(){
            $(this).css({'backgroundPosition':'center top'})
                .children('span').stop().animate({'backgroundPosition':'1px bottom'},400,'easeOutCubic');
        }
    );   
}

function showSplash(){
     content.stop(true).animate({'width':'0'},500,'easeOutExpo')
     $('#bgControls').stop().animate({'bottom':'31px'})
	// alert("123");
}
function showSplash2(){     
	content.stop(true).animate({'width':'0'},400,'easeInExpo').delay(250).animate({'width':'238px'},700,'easeOutExpo');
	$('#bgControls').stop().animate({'bottom':'31px'}); // start
	// alert("showSplash2");
}
function hideSplash(){
   content.stop(true).animate({'width':'0'},400,'easeInExpo').delay(250).animate({'width':'683px'},700,'easeOutExpo');
   $('#bgControls').stop().animate({'bottom':'-51px'});  // stop
   
}
function hideSplash2(){
    content.stop(true).animate({'width':'683px'},700,'easeOutExpo');
    $('#bgControls').stop().animate({'bottom':'-51px'}); // stop
}
function hideSplashQ(){
    content.css({'width':'683px'});
    $('#bgControls').stop().css({'bottom':'-51px'}); // stop
}

$(document).ready(ON_READY);
$(window).load(ON_LOAD);
function ON_READY() {
    /*SUPERFISH MENU*/   
    $('.menu #menu').superfish({
	   delay: 800,
	   animation: {
	       height: 'show'
	   },
       speed: 'slow',
       autoArrows: false,
       dropShadows: false
    });
    
    $('#bgStretch').bgStretch({
    	   align:'leftTop',
           navs:$('.pagin').navs({'autoPlay':10000})
        })
        .sImg({
            sleep: 1000,
            spinner:$('<div class="spinner spinner_bg"></div>').css({opacity:.5}).stop().hide(3000)
        });
        var img=0;
        var num=$('.pagin li').length-1;
        $('.prev').click(function(){
            img=img-1;
    		if (img<0) img=img+num+1;
    		$.when($('#bgStretch img')).then(function(){
    			$('.pagin li a').eq(img).click();
    		})
        	return false
    	});
    	$('.next').click(function(){
    		img=img+1;
    		if (img>num) img=img-num-1;
    		$.when($('#bgStretch img')).then(function(){
    			$('.pagin li a').eq(img).click();
    		})
            return false
    	});
        $('.pause').toggle(
            function(){
                $(this).addClass('play');
                $('#bgStretch').bgStretch({
            	   navs:$('.pagin').navs({autoPlay:999999999})
                })
                return false
    	    },
            function(){
                $(this).removeClass('play');
                $('#bgStretch').bgStretch({
            	   navs:$('.pagin').navs({'autoPlay':10000})
                })
                return false
    	    }
        );
}
function ON_LOAD(){
    MSIE = ($.browser.msie) && ($.browser.version <= 8);
    OPR = ($.browser.opera);
    defMh = parseInt($('body').css('minHeight'));
    $('.spinner').fadeOut();
    
	$('.list4>li>figure>a, .list6>li>figure>a').attr('rel','appendix')
    .prepend('<span class="sitem_over"><strong></strong></span>')
    $('.list4>li>figure>a, .list6>li>figure>a').fancybox({
        'transitionIn': 'elastic',
    	'speedIn': 500,
    	'speedOut': 300,
        'centerOnScroll': true,
        'overlayColor': '#000'
    });
    
    $('.scroll')
	.uScroll({			
		mousewheel:true			
		,lay:'outside'
	})
	h = $(".wrapper").height();
	/*    
    //content switch
    content = $('#content');
    content.tabs({
        show:0,
        preFu:function(_){
            _.li.css({'visibility':'hidden'});	
            hideSplashQ();	
        },
        actFu:function(_){
            if (_.n == 0){
                showSplash()
             } 
			 //else if (_.n == 1 || _.n == 2){
                // showSplash2()
            // } 
			else {
                if (_.curr) {
                    h = parseInt(_.curr.css('height'));
                    if (_.pren == 0) {
                        $(window).trigger('resize');
                        hideSplash2();
                    } else {
                        hideSplash();
                    }
                }
            }
            
            if (_.curr) h = parseInt( _.curr.outerHeight(true));
            $(window).trigger('resize');
            
            if(_.curr){
                _.curr
                    .css({'left':'-660px','visibility':'visible'}).stop(true).delay(400).show().animate({'left':'0px'},{duration:1000,easing:'easeOutExpo'});
        }   
            if(_.prev){
	            _.prev
                    .show().stop(true).animate({'left':'-660px'},{duration:400,easing:'easeInOutExpo',complete:function(){
                        if (_.prev){
                            _.prev.css({'visibility':'hidden'});
                        }
                    }
	              });
            }   
  		}
    });
    var defColor = $('#menu>li>a').not('active').css('color'); 
    var nav = $('.menu');
    nav.navs({
		useHash:true,
        defHash: '#!/page_home',
        hoverIn:function(li){
			// alert('111');
            $('>a', li).stop().animate({color: '#fff'},400,'easeOutExpo');
            if (!MSIE && !OPR) {
                $('>strong',li).stop().animate({'opacity':'1'},500,'easeOutExpo');
            } else {
                $('>strong',li).css({'opacity':'1'});
            }
        },
        hoverOut:function(li){
		// alert('222');
            if ((!li.hasClass('with_ul')) || (!li.hasClass('sfHover'))) {
                $('> a', li).stop().animate({color: defColor},600,'easeOutCubic');
                if (!MSIE && !OPR) {
                    $('>strong',li).stop().animate({'opacity':'0'},800,'easeOutCubic');
                } else {
                    $('>strong',li).css({'opacity':'0'});
                }
            }
        }
    })
    .navs(function(n,_){	
		// alert('333');
   	    $('#content').tabs(n);
        if (_.prevHash == '#!/page_mail') { 
            $('#form1 a').each(function (ind, el){				
                if ($(this).attr('data-type') == 'reset') { $(this).trigger('click') }   
            })
        }
   	});
    */


    setTimeout(function(){  $('body').css({'overflow':'visible'}); },300);    
    addAllListeners();
    
    $(window).trigger('resize');
}

$(window).resize(function (){
    var newMh = h;
    if (defMh > newMh) {newMh = defMh; }
    $('body').stop().animate({'minHeight':newMh})
});