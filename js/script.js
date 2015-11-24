var isSplash = -1;
function start(){
	
};
function startF(){	
	setTimeout(function () {
		$('#menu_splash .nav1').css({marginLeft:-2000}).stop().delay(200).animate({marginLeft:0},1200,'easeOutExpo');
		$('#menu_splash .nav2').css({marginTop:-2000}).stop().delay(400).animate({marginTop:0},1200,'easeOutExpo');
		$('#menu_splash .nav4').css({marginLeft:2000}).stop().delay(600).animate({marginLeft:0},1200,'easeOutExpo');
		$('#menu_splash .nav3').css({marginTop:2000}).stop().delay(800).animate({marginTop:0},1200,'easeOutExpo');
		
	}, 200);
};
function showSplash(){
	setTimeout(function () {		
		$('header').stop().animate({'marginTop':'0px'}, 800, "easeOutExpo");
		$('.top2').stop().animate({'marginTop':'0px'}, 800, "easeOutExpo");

		$('#menu_splash .nav1').css({marginLeft:-2000, display:'block'}).stop().delay(200).animate({marginLeft:0},1200,'easeOutExpo');
		$('#menu_splash .nav2').css({marginTop:-2000, display:'block'}).stop().delay(400).animate({marginTop:0},1200,'easeOutExpo');
		$('#menu_splash .nav4').css({marginLeft:2000, display:'block'}).stop().delay(600).animate({marginLeft:0},1200,'easeOutExpo');
		$('#menu_splash .nav3').css({marginTop:2000, display:'block'}).stop().delay(800).animate({marginTop:0},1200,'easeOutExpo');
	}, 400);	
};
function hideSplash(){ 
	$('header').stop().animate({'marginTop':'-60px'}, 800, "easeOutExpo");		
	$('.top2').stop().animate({'marginTop':'56px'}, 800, "easeOutExpo");

	$('#menu_splash .nav1').stop().delay(0).animate({marginLeft:-2000},800,'easeInExpo', function(){ $(this).css({display:'none'}); });
	$('#menu_splash .nav2').stop().delay(200).animate({marginTop:-2000},800,'easeInExpo', function(){ $(this).css({display:'none'}); });
	$('#menu_splash .nav4').stop().delay(400).animate({marginLeft:2000},800,'easeInExpo', function(){ $(this).css({display:'none'}); });
	$('#menu_splash .nav3').stop().delay(600).animate({marginTop:2000},800,'easeInExpo', function(){ $(this).css({display:'none'}); });
};
function hideSplashQ(){
	$('header').css({'marginTop':'-60px'});
	$('.top2').css({'marginTop':'56px'});

	$('#menu_splash .nav1').css({marginLeft:-2000, display:'none'});
	$('#menu_splash .nav2').css({marginTop:-2000, display:'none'});
	$('#menu_splash .nav4').css({marginLeft:2000, display:'none'});
	$('#menu_splash .nav3').css({marginTop:2000, display:'none'});
};

/////////////////////// ready
$(document).ready(function() {
	MSIE8 = ($.browser.msie) && ($.browser.version == 8),
	$.fn.ajaxJSSwitch({
		classMenu:"#menu",
		classSubMenu:".submenu",
		topMargin: 203,//mandatory property for decktop
		bottomMargin: 60,//mandatory property for decktop
		topMarginMobileDevices: 203,//mandatory property for mobile devices
		bottomMarginMobileDevices: 60,//mandatory property for mobile devices
		delaySubMenuHide: 300,
		fullHeight: true,
		bodyMinHeight: 780,
		menuInit:function (classMenu, classSubMenu){
			//classMenu.find(">li").each(function(){
			//	$(">a", this).append("<div class='openPart'></div>");
			//})
		},
		buttonOver:function (item){            
            $('>.txt1',item).stop().animate({'top':'56px'},300,'easeInOutCubic');
            $('>.txt2',item).stop().animate({'top':'0px'},300,'easeOutCubic');
		},
		buttonOut:function (item){
            $('>.txt1',item).stop().animate({'top':'0px'},300,'easeOutCubic');
            $('>.txt2',item).stop().animate({'top':'-56px'},300,'easeInOutCubic');         
		},
		subMenuButtonOver:function (item){
		},
		subMenuButtonOut:function (item){
		},
		subMenuShow:function(subMenu){        	
        	subMenu.stop(true,true).animate({"height":"show"}, 500, "easeOutCubic");
		},
		subMenuHide:function(subMenu){
        	subMenu.stop(true,true).animate({"height":"hide"}, 700, "easeOutCubic");
		},
		pageInit:function (pages){
			//console.log('pageInit');
		},
		currPageAnimate:function (page){
			//console.log('currPageAnimate');
			var Delay=400; // default
			if(isSplash==-1){ // on reload				
				hideSplashQ();
				Delay=0;				
			}
			if(isSplash==0){ // on first time click				
				hideSplash();
				Delay=800;
			}
			isSplash = 2;
			
			// animation of current page
			jQuery('body,html').animate({scrollTop: 0}, 0); 
			
			page.css({"left":$(window).width()}).stop(true).delay(Delay).animate({"left":0}, 1000, "easeOutCubic", function (){
					$(window).trigger('resize');
			});    	
		},
		prevPageAnimate:function (page){
			//console.log('prevPageAnimate');
			page.stop(true).animate({"display":"block", "left":-$(window).width()}, 500, "easeInCubic");
		},
		backToSplash:function (){
			//console.log('backToSplash');
			if(isSplash==-1){
				isSplash = 0;
				startF();				
			}
			else{
				isSplash = 0;				
				showSplash();
			};
			$(window).trigger('resize');			      
		},
		pageLoadComplete:function (){
			//console.log('pageLoadComplete');            
    }
	});  /// ajaxJSSwitch end

	////// sound control	
	$("#jquery_jplayer").jPlayer({
		ready: function () {
			$(this).jPlayer("setMedia", {
				mp3:"music.mp3"
			});
			//$(this).jPlayer("play");
			var click = document.ontouchstart === undefined ? 'click' : 'touchstart';
          	var kickoff = function () {
            $("#jquery_jplayer").jPlayer("play");
            document.documentElement.removeEventListener(click, kickoff, true);
         	};
          	document.documentElement.addEventListener(click, kickoff, true);
		},
		
		repeat: function(event) { // Override the default jPlayer repeat event handler				
				$(this).bind($.jPlayer.event.ended + ".jPlayer.jPlayerRepeat", function() {
					$(this).jPlayer("play");
				});			
		},
		swfPath: "js",
		cssSelectorAncestor: "#jp_container",
		supplied: "mp3",
		wmode: "window"
	});

	/////// icons	
	$(".icons li a").hover(function() {
		$(this).stop().animate({opacity:0.4 }, 400, 'easeOutExpo');		    
	},function(){
	    $(this).stop().animate({opacity:1 }, 400, 'easeOutExpo' );		   
	});

	/////// menu_splash
  $("#menu_splash li").find(".img").css({opacity:0, marginLeft:-300});
  $("#menu_splash li").find(".txt1").css({opacity:0.2});
  $("#menu_splash li").find(".over2").css({opacity:0, marginLeft:180});
  $("#menu_splash li").find(".over1").css({opacity:0.2});
  $("#menu_splash li").find(".over3").css({opacity:0});
  $("#menu_splash li").hover(function() {
    $(this).find(".txt1").stop().animate({opacity:1, marginLeft:-30, marginTop:40 }, 400, 'easeOutBack'); 
    $(this).find(".over2").stop().animate({opacity:1, marginLeft:0 }, 400, 'easeOutExpo');
    $(this).find(".img").stop().animate({opacity:1, marginLeft:0 }, 400, 'easeOutExpo');
    $(this).find(".over3").stop().animate({opacity:1}, 10, 'swing').animate({opacity:0}, 300, 'easeOutExpo');
  },function(){
     $(this).find(".txt1").stop().animate({opacity:0.2, marginLeft:0, marginTop:0 }, 400, 'easeOutBack');  
    $(this).find(".over2").stop().animate({opacity:0, marginLeft:180 }, 400, 'easeOutExpo');
    $(this).find(".img").stop().animate({opacity:0, marginLeft:-300 }, 400, 'easeOutExpo');
  });
	


	

	
	
	
	

	
		
});

/////////////////////// load
$(window).load(function() {	
	setTimeout(function () {					
  		$('#spinner').fadeOut();		
  		$(window).trigger('resize');
  		start();
	}, 100);
	setTimeout(function () {$("#jquery_jplayer").jPlayer("play");}, 2000);	
});