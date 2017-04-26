/*  

   _____ _       _                 _  _____ 
  / ___/| (•)   | |               | |/ ___/  v 2.3
 | (___ | |_  __| | ___ ____      | | (___  
  \___ \| | |/ _` |/ _ / __/  _   | |\___ \
  ____) | | | (_| |  __\__ \ | |__| |____) |
 /_____/|_|_|\__,_|\___/___/  \____//_____/ 
                                            
                                            
This script is necessary for proper work of your Slides Project.
It requires plugins.js and jquery-2.2.4 to run this script.

https://designmodo.com/slides/

*/

window.inAction = 1;
window.allowSlide = 1;
window.blockScroll = 0;
window.direction = "";
window.effectOffset = 0;
window.slideSpeed = 1000;
window.cleanupDelay = 1450;
window.effectSpeed = 800;
window.horizontalMode = 0;
window.sidebarShown = 0;
window.loadingProgress = 0;
window.customScroll = 0;              //control hijacking of the scroll
window.scrollSpeed = 700;
window.preload = 1;
window.setHashLink = 1;
window.hideSidebarOnBodyClick = 1;

var $html = jQuery('html');

//Test Device
window.isMobile = false;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) { window.isMobile = true; }

//Detect Mobile
if(window.isMobile){$html.addClass('mobile');}

//Detect Browser
window.isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
window.isSafari = /^((?!chrome).)*safari/i.test(navigator.userAgent);
window.isChrome = /chrom(e|ium)/.test(navigator.userAgent.toLowerCase()); 
window.isChromeiOS = navigator.userAgent.match('CriOS'); 
window.isMSIE = navigator.userAgent.match('MSIE');
window.isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
window.isiPad = navigator.userAgent.match(/iPad/i) !== null;

//Detect OS
window.isWindows = navigator.platform.toUpperCase().indexOf('WIN')!==-1;
window.isOSX = navigator.platform.toUpperCase().indexOf('MAC')!==-1;
window.isLinux = navigator.platform.toUpperCase().indexOf('LINUX')!==-1;

//Prepare for CSS Fixes
if (window.isSafari){$html.addClass('safari');}
if (window.isFirefox){$html.addClass('firefox');}
if (window.isChrome){$html.addClass('chrome');}
if (window.isMSIE){$html.addClass('msie');}
if (window.isAndroid){$html.addClass('android');}
if (window.isWindows){$html.addClass('windows');}
if (window.isOSX){$html.addClass('osx');}
if (window.isLinux){$html.addClass('linux');}

//Retina
window.isRetina = ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)').matches)) || (window.devicePixelRatio && window.devicePixelRatio > 1.3));

if (window.isRetina){$html.addClass('retina');}

//On DOM ready
jQuery(document).ready(function() { "use strict";
  var $body = jQuery('body'); 
  
  //add window a trigger
  setTimeout(function(){
    jQuery(window).trigger('ready');
  },1);
  
  //redraw
  $body.hide().show(0);
  
  //Fix for android
  if( window.isChromeiOS || $body.hasClass('simplifiedAndroid') ) {
    $body.addClass('simplifiedMobile');
  }
  
  $html.addClass('page-ready');

  //Set speed
  if ($body.hasClass('fast')){
    //fast 
    window.slideSpeed = 600;  
    window.cleanupDelay = 1200;
    window.effectSpeed = 600;
    window.scrollSpeed = 400;
  } else if ($body.hasClass('slow')){
    //slow
    window.slideSpeed = 1400;  
    window.cleanupDelay = 2000;
    window.effectSpeed = 1000;
    window.scrollSpeed = 1000;
  }
  
  //How many stages?
  window.stage = 1;
	window.stages = jQuery('.slide').size();
  
  //Get mode
  window.isScroll = $body.hasClass('scroll');
  window.isSimplifiedMobile = $body.hasClass('simplifiedMobile');
  if (window.isScroll || window.isSimplifiedMobile && window.isMobile) { $html.addClass('scrollable'); }
  
  //Horizonal Mode
  if ($body.hasClass('horizontal')){
    window.horizontalMode = 1; 
  }
  
  //Preload
  if ($body.hasClass('noPreload')){
    window.preload = 0; 
  }
  
  //Is it animated?
  if ($body.hasClass('animated')){
    window.animated = 1;
  }
  
  //Is scroll hijacked?
  if ($body.hasClass('defaultScroll')){
    window.customScroll = 0;
  }
  
  //Check hash on start
  function updateHash(){
    var isHash = window.location.href.split("#")[1];
    if ((isHash)&&(jQuery('.slide[name="' +isHash+ '"]').length>0)) {
      var requestedElement = jQuery('.slide[name="' +isHash+ '"]');
      if ( (window.isMobile && window.isSimplifiedMobile) || window.isScroll ){
        if (requestedElement.length) {
          if (!window.preload) {
            jQuery('html,body').stop().clearQueue().animate({scrollTop:requestedElement.position().top},window.effectSpeed);
          } else {
            jQuery(window).load(function(){
              jQuery('html,body').stop().clearQueue().animate({scrollTop:requestedElement.position().top},window.effectSpeed);
            });
          }
        }
      } else {
        window.stage = jQuery('.slide').index(requestedElement) + 1;
        if (window.loaded) {
          showSlide(window.stage); 
        }
      }
    } else {
      $body.addClass('firstSlide stage-1');
    }
  }
  updateHash();
  
  //Listen history changes
  jQuery(window).on('popstate',function(e) {
    setTimeout(function(){
      updateHash();
    },100);
    e.preventDefault();
  });
  
  //
  var isHash = window.location.href.split("#")[1];
  if ((window.debugMode)&&(!isNaN(isHash))) {
    window.stage = Number(isHash);
  }
  
  //Preload images
  if (window.preload){
    var imgs = [];
    jQuery("*").each(function() { 
      if(jQuery(this).css("background-image") !== "none") { 
        imgs.push(jQuery(this).css("background-image").replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '')); 
      } else if (jQuery(this).is('img')){
        imgs.push(jQuery(this).attr("src")); 
      }
    });
    
    window.images = imgs.length;
    jQuery.cacheImage(imgs, { complete: function () { window.loadingProgress++; }});
    
    var loadingInterval = setInterval(function(){
      var progress = 45*(window.loadingProgress/window.images);
      jQuery('.loadingIcon .dash').attr('stroke-dasharray',progress+',100');
      jQuery('.loadingIcon').redraw();
      if (window.loaded){
        jQuery('.loadingIcon .dash').attr('stroke-dasharray','100,100');
        clearInterval(loadingInterval);
      }
    },400);
  }
  
  //on load
  jQuery(window).load(function(){
    //start masonry
    jQuery('.grid.masonry').masonry({
      itemSelector: 'li',
      transitionDuration: '0.1s'
    });
  });
 
  //initiate slide
  showSlide(window.stage); 
  
  //On page load 
  if (!window.preload) {
    runTheCode();
  } else {
    jQuery(window).load(function(){
      runTheCode();
    });
  }
  function runTheCode(){
    $html.addClass('page-loaded');
    window.inAction = 0;
    window.loaded = 1;
    window.blockScroll = 0;
    
    setTimeout(function(){
      if (window.isScroll){
        updateScroll();
        updateNavigation();
      } if (window.isMobile && window.isSimplifiedMobile){
        jQuery('.slide').addClass('selected animate active');
        updateNavigation();
      } else {
        showSlide(window.stage);
      }
    },500);
  }
  
  
  
  
  
  
  
   
  /*
         _____ _       _         _____ _                            
        / ___/| (•)   | |       / ___/| |                           
       | (___ | |_  __| | ___  | |    | |__   __ _ _ __   __ _  ___ 
        \___ \| | |/ _` |/ _ \ | |    | '_ \ / _` | '_ \ / _` |/ _ \
        ____) | | | (_| |  __/ | |____| | | | (_| | | | | (_| |  __/
       /_____/|_|_|\__,_|\___/  \____/|_| |_|\__,_|_| |_|\__, |\___/
                                                          __/ |     
       Slide Appearance Manager                          /___/    
  
  */ 
     
  function showSlide(requested){
    
    requested = parseInt(requested);
    
    if ( window.isMobile && window.isSimplifiedMobile || window.isScroll ){
      return;
    }
    
    updateNavigation();
    
    var newSlide = jQuery('.slide').eq(requested - 1),
        currenSlide = jQuery('.slide.selected'),
        currenSlideIndex = currenSlide.index('.slide') + 1;
        
    //cleanup
    hideShare();
    unzoomImage();
    hideSidebar();
    window.allowSlide = 1;
    
    //reset 
    $html.removeClass('sidebarShown');
    $body.removeClass('sidebarShown lastSlide firstSlide');

    //It it first or last stage?
    if (window.stage === 1){
      $body.addClass('firstSlide');
    }
    if ((window.stages === window.stage)&&(window.stages !== 1)) {
      $body.addClass('lastSlide');
    }
    
    $body.removeClassByPrefix("stage-").addClass('stage-'+window.stage);
    
    //white slide?
    if ( newSlide.hasClass('whiteSlide') ){
      $body.addClass('whiteSlide');
    } else {
      $body.removeClass('whiteSlide');
    }
    
    //prepare slides for transporting
    if (currenSlideIndex !== requested){
      currenSlide.removeClass('selected').removeClass(window.direction).addClass('active');
      newSlide.removeClass('before after').addClass('selected active').addClass(window.direction);
      
      //set order
      newSlide.prevAll('.slide').addClass('before').removeClass('after');
      newSlide.nextAll('.slide').addClass('after').removeClass('before');
      
      //set a trigger
      jQuery(window).trigger("slideChange", [parseInt(requested), newSlide]);
    }
    
    //set hash
    if (window.setHashLink){
      if (newSlide.attr('name')) { 
        window.location.hash = newSlide.attr('name'); 
      } else {
        if ((window.location.toString().indexOf('#')>0)&&(location.protocol !== "file:")&&(location.href.split('#')[0])){
          if (history.pushState) {
            window.history.pushState("", "", location.href.split('#')[0]); 
          } else {
            window.location.hash = "";
          }
        }
      }
    }
    
    //prepare to show slide
    newSlide.find('.content').scrollTop(0);
    
    if (window.loaded){
      //wait for animation
      window.blockScroll = 1;
      
      setTimeout(function(){
        if (currenSlideIndex !== requested){
          currenSlide.removeClass('active animate');
        }
        window.blockScroll = 0;
      },window.slideSpeed);
      
      if (window.effectOffset > window.slideSpeed) { window.effectOffset = window.slideSpeed; }
      
      setTimeout(function(){
        newSlide.addClass('animate');
      },window.slideSpeed - window.effectOffset);
      
        
      //clear element animation on done
      jQuery('.done').removeClass('done');
      
      clearTimeout(window.clearElementAnimation);
      window.clearElementAnimation = setTimeout(function(){
        jQuery(".slide.selected [class*='ae-']").addClass('done');
      }, window.slideSpeed + window.effectSpeed + window.cleanupDelay);
    }
    
    //debug mode
    if (window.debugMode) { window.location.hash = requested; }
  }
  
  //remove animation from a clickable element
  jQuery(".animated").on("click","[class*='ae-']:not('.done')", function(){ jQuery(this).addClass('done'); });
  
  //Change slide
  window.changeSlide = function(n){
    
    if (n === "increase"){
			if ((window.stage + 1) >= window.stages){
				n = window.stages;
			} else {
				n = window.stage + 1;
			}
		} else if (n === "decrease"){
			if ((window.stage - 1) < 1){
				n = 1;
			} else {
				n = window.stage - 1;
			}
		}
    
		if ( window.isMobile && window.isSimplifiedMobile || window.isScroll ){
		  window.stage = n;
		  var requestedElement = jQuery('.slide:eq('+ (window.stage - 1) +')'),
          offsetTop = jQuery(requestedElement).offset().top,
          scrollTop = jQuery(document).scrollTop(),
          finalPosition = (window.isMobile) ? offsetTop + scrollTop : offsetTop;
      
		  jQuery('html,body').stop().clearQueue().animate({scrollTop:finalPosition},1000);
		} else {
		  if (n !== window.stage){
		    if (window.inAction !== 1){	
		      window.inAction = 1;
		      window.stage = n;
		      showSlide(window.stage);
		      setTimeout(function(){ window.inAction = 0; }, window.slideSpeed);
		    }
		  }
		}
	};
  
  jQuery('.nextSlide').on('mouseup touchstart', function(){
    window.changeSlide('increase');
  });
  
  jQuery('.prevSlide').on('mouseup touchstart', function(){
    window.changeSlide('decrease');
  });
  
  jQuery('.toFirstSlide').on('mouseup touchstart', function(){
    window.changeSlide(1);
    if (history.pushState) {
      window.history.pushState("", "", location.href.split('#')[0]); 
    } else {
      window.location.hash = "";
    }
    if (window.isMobile){
      hideSidebar();
    }
  });
  
  jQuery('.toLastSlide').on('mouseup touchstart', function(){
    window.changeSlide(window.stages);
    if (history.pushState) {
      window.history.pushState("", "", location.href.split('#')[0]); 
    } else {
      window.location.hash = "";
    }
    if (window.isMobile){
      hideSidebar();
    }
  });
  
  jQuery('[class*="toSlide-"]').on('mouseup touchstart', function(){
    var num = jQuery(this).attr('class').replace(/[^0-9]/g, '');
    window.changeSlide(num);
    if (window.isMobile){
      hideSidebar();
    }
  });
  
  //zoom out image
  function unzoomImage(){
    if (jQuery('.zoom-overlay-open').length > 0){
      setTimeout(function(){
        jQuery('.zoom-img').click();
      },window.slideSpeed);
    }
  }
  
  
  
  
  
  
  
   
   /*                 |
            *               .   
   .        |               |
   |                .           
    _____          |     _ _   
   / ___/               | | | 
  | (___   ___ _ __ ___ | | |
   \___ \ / __| '_   _ \| | | 
   ____) | (__| | | (_) | | | 
  |_____/ \___|_|  \___/|_|_|
    
  #scrolling */

  jQuery('html,body').on('DOMMouseScroll mousewheel', function(event){
    
    var currentSection = jQuery('.slide.selected .content'),
        scrollsize = Math.ceil(Math.abs(event.deltaY) * event.deltaFactor),
        minScrollSize = (window.isFirefox) ? 8 : 50,
        browserScrollRate = (window.isFirefox) ? 10 : 1,
        OSScrollRate = (window.isWindows) ? browserScrollRate * 2 : browserScrollRate,
        wheelDelta = (event.originalEvent.wheelDelta) ? event.originalEvent.wheelDelta : event.deltaY * event.deltaFactor,
        energy = wheelDelta * browserScrollRate * OSScrollRate,
        scrollDirection = (event.deltaY >= 0) ? "up" : "down",
        curSecScrolltop = jQuery(currentSection).scrollTop(),
        currentSectionHeight = jQuery(currentSection).find('.container').outerHeight(),
        deviceZoom = detectZoom.device();
    
    if ((window.isWindows)||(window.isLinux)){
      minScrollSize = 1;
    }
    
    //scroll mode
    if ( (window.isMobile && window.isSimplifiedMobile) || window.isScroll ) {

      if ((!window.sidebarShown)&&(!window.popupShown)&&(!window.blockScroll)) {
      
        //smooth scroll
        if (window.customScroll){
          
          //lock default scroll
          event.preventDefault();
              
          if (energy > 1500) { energy = 1500; }
          if (energy < -1000) { energy = -1500; }
              
          var scrollObject = jQuery(window),
              scrollTop = scrollObject.scrollTop(),
              finalScroll = scrollTop - energy;
                
          TweenLite.to(scrollObject, window.scrollSpeed/1000, {
            scrollTo : { y: finalScroll, autoKill:false },
            ease: Power3.easeOut,
            overwrite: "all"            
          });
              
        } else {
          if (!window.isWindows){
            jQuery(currentSection).scrollTop(curSecScrolltop - energy);
          }
        }
      }
    }

    //slide mode
    if ( !window.isScroll ){
      
      // scroll oversized content
      if ((currentSectionHeight > jQuery(window).height())){
        
        window.allowSlide = 0;
          
        if (( scrollDirection === "up" ) && ( jQuery(currentSection).scrollTop() === 0 )){
          window.allowSlide = 1;
        } else if (( scrollDirection === "down" ) && ( jQuery(currentSection).scrollTop() + jQuery(window).height() >= Math.floor(currentSectionHeight / deviceZoom) )){
          window.allowSlide = 1;
        }
            
        if ((!window.sidebarShown)&&(!window.popupShown)&&(!window.blockScroll)) {
          
          if (window.customScroll){
            //lock default scroll
            event.preventDefault();
            
            //smooth scroll
            if (energy > 1500) { energy = 1500; }
            if (energy < -1000) { energy = -1500; }
              
            TweenLite.to(currentSection, 0.5, {
              scrollTo : { y: curSecScrolltop - energy, autoKill:false },
              ease: Power3.easeOut,
              overwrite: 5              
            });
            
          } else {
            curSecScrolltop = (scrollDirection === "up") ? curSecScrolltop - scrollsize : curSecScrolltop + scrollsize;   
            jQuery(currentSection).scrollTop(curSecScrolltop);
          }
        }
          
      //end scroll oversized content
      }

      if (window.allowSlide && scrollsize) {
        if (scrollDirection == "down") {
          window.collectScrolls = window.collectScrolls + scrollsize;
        } else {
          window.collectScrolls = window.collectScrolls - scrollsize;
        }

        setTimeout(function(){
          window.collectScrolls = 0;
        },200);
      }
      
      //change slide on medium user scroll
      if ((Math.abs(window.collectScrolls) >= 500) && (window.allowSlide) && (!window.sidebarShown) && (!window.popupShown) && (!window.disableOnScroll)){
        
        window.collectScrolls = 0;

        //should we even.. 
        if ((scrollDirection === "down" && window.stage !== window.stages)||(scrollDirection === "up" && window.stage !== 1)){
          
          //ok let's go
          if (window.inAction !== 1){
            if (scrollDirection === "down"){
              window.changeSlide('increase');
            } else {
              window.changeSlide('decrease');
            }
          }
        }
      }
    }
    //end on mousewheel event
  });

  jQuery(window).on('scroll', function(){
    if ( (window.isMobile && window.isSimplifiedMobile) || window.isScroll ){
      updateScroll();
    }
  });
  
  //hide share with delay
  var hideShareonScrollDelay = 0;
  function updateScroll(){
    hideShareonScrollDelay++;
    if (hideShareonScrollDelay >= 6){
      hideShare();
      hideShareonScrollDelay = 0;
    }
      
    jQuery('.slide').each(function(index, element) {
        
      var $element = jQuery(element),
          scrollTop = jQuery(document).scrollTop(),
          positionY = (window.isMobile) ? jQuery(element).offset().top + scrollTop : jQuery(element).offset().top,
          elementHeight = $element.height(),
          windowHeight = jQuery(window).height(),
          documentHeight = jQuery(document).height(),
          halfWay = (windowHeight/2 > elementHeight) ? elementHeight/2 : windowHeight/2,
          halfOnScreen = ((positionY < (windowHeight + scrollTop - halfWay)) && (positionY > (scrollTop - elementHeight + halfWay))),
          scale = (scrollTop - positionY) / windowHeight,
          allowToSelect = true;
            
      //checking first slide
      if (scrollTop === 0) {
        if (index === 0) {
          allowToSelect = true;
        } else {
          allowToSelect = false;
        }
      }
            
      //checking last slide
      if (scrollTop + windowHeight === documentHeight) {
        if (index === window.stages - 1) {
          allowToSelect = true;
        } else {
          allowToSelect = false;
        }
      }
      
      if (halfOnScreen && allowToSelect) {
        $element.addClass('selected animate active');
        
        if (window.stage !== $element.index('.slide') + 1){
          window.stage = $element.index('.slide') + 1;
          
          //set a trigger
          jQuery(window).trigger("slideChange", [window.stage, $element]);
        } if (!window.firstTimeTrigger){
          window.firstTimeTrigger = 1;
          jQuery(window).trigger("slideChange", [window.stage, $element]);
        }
          
        if (window.stage === 1){
          $body.addClass('firstSlide');
        } else {
          $body.removeClass('firstSlide');
        }
        if (window.stages === window.stage) {
          $body.addClass('lastSlide');
        } else {
          $body.removeClass('lastSlide');
        }
        
        $body.removeClassByPrefix("stage-").addClass('stage-'+window.stage);
            
        //white slide?
        if ($element.hasClass('whiteSlide')){
          $body.addClass('whiteSlide');
        } else {
          $body.removeClass('whiteSlide');
        }
          
        //clearTimeout(window.clearElementAnimation);
        window.clearElementAnimation = setTimeout(function(){
          $element.find("[class*='ae-']").addClass('done');
        }, window.effectSpeed + window.cleanupDelay);
            
        updateNavigation();
            
      } else {
        $element.removeClass('selected');
      }
        
      //parallax
      if (scale > -1 && scale < 1){
        if ($element.hasClass('parallax')){
          var precentage = 100 - ((scale/2) + 0.5) * 100;
          $element.find('.background').css('-webkit-transform-origin',"50% " + precentage + "%").css('transform-origin',"50% " + precentage + "%");
        }
      }
    });
  }
  
  
  
  
  
  
  
   
  /* 
         ______                      
        / ____/       (•)
       | (_____      ___ _ __   ___ 
        \___ \ \ /\ / | | '_ \ / _ \
        ____) \ V  V /| | |_) |  __/
       /_____/ \_/\_/ |_| .__/ \___/
                        | |                
       Swipe Event      |_|           
  */


  jQuery('.mobile .slides:not(.scroll):not(.simplifiedMobile)').swipe({
    swipeStatus:function(event, phase, direction, distance){
      
      window.allowSwipeUp = 1;
      window.allowSwipeDown = 1;
          
      //set height for current slide
      var currentSection = jQuery('.slide.selected .content'),
          currentSectionHeight = jQuery(currentSection).find('.container').outerHeight(),
          next = "up",
          prev = "down",
          minDistanceMobile = 30,
          windowHeight = window.innerHeight;
          
      if (window.sidebarShown){
        currentSection = jQuery('.sidebar .content');
      } 
      
      if (window.popupShown){
        currentSection = jQuery('.popup .content');
      }
      
      if (phase === "start") {
        window.scrollTop = jQuery(currentSection).scrollTop();
      }
          
      //horizontal mode
      if (window.horizontalMode){
        next = "left";
        prev = "right";
      }
      
      //lock slide
      if ( (!window.horizontalMode) && ( currentSectionHeight > windowHeight) ){
        if (window.scrollTop + windowHeight < currentSectionHeight){
          window.allowSwipeUp = 0;
        } else if (window.scrollTop > 0) {
          window.allowSwipeDown = 0;
        }
      }
      
      if (!window.sidebarShown) {
        // MOBILE
        if (window.horizontalMode){
          if (direction === next && distance > minDistanceMobile){
            window.changeSlide('increase');
          } else if (direction === prev && distance > minDistanceMobile){
            window.changeSlide('decrease');
          }
        } else {
          if (direction === next && distance > minDistanceMobile && window.allowSwipeUp && window.allowSlide){
            window.changeSlide('increase');
          } else if (direction === prev && distance > minDistanceMobile && window.allowSwipeDown && window.allowSlide){
            window.changeSlide('decrease');
          }
        }
      }
    },
    maxTimeThreshold:30,
    fingers:'all',
    allowPageScroll:"vertical"
  });
  
  
  
  
  
  
  
   
  /*    _____                 _       
       |  __ \               | |
       | |__) __ _ _ __   ___| |____
       |  ___/ _` | '_ \ / _ | | __/
       | |  | (_| | | | |  __| |__ \
       |_|   \__,_|_| |_|\___|_|___/
    
       Responsive Panels              */
      
  if(jQuery('.panel .compact').length > 0){
    
    jQuery('.panel .compact').each(function(index, element) {
      var panel = jQuery(element).parents('.panel'),
          desktop = jQuery(panel).find('.desktop'),
          compact = element,
          forceMobileView = jQuery(panel).hasClass('forceMobileView');
      
      jQuery(window).on('load resize ready',function(){
        
        var documentWidth = jQuery(document).width(),
            panelsPadding = parseInt(jQuery(panel).css('padding-left').replace('px','')) + parseInt(jQuery(panel).css('padding-right').replace('px',''));
        
        if ((window.isMobile || jQuery(document).width() < 767) && forceMobileView) {
        
          jQuery(desktop).addClass('hidden');
          jQuery(compact).removeClass('hidden');
        
        } else {
          
          jQuery(desktop).removeClass('hidden');
          jQuery(compact).addClass('hidden');
          
          var totalWidth = 0;
          
          desktop.children().each(function(){
            if ( jQuery(this).outerWidth() > jQuery(this).children().outerWidth() ){
              totalWidth += Math.round(jQuery(this).outerWidth());
            } else {
              totalWidth += Math.round(jQuery(this).children().outerWidth());
            }
          });
          
          // if width of space is not enough or we are on mobile
          if ((totalWidth + Math.round(panelsPadding) > documentWidth + 2 ) || ((window.isMobile || documentWidth < 767) && forceMobileView)) {
            jQuery(desktop).addClass('hidden');
            jQuery(compact).removeClass('hidden');
          } else {
            jQuery(desktop).removeClass('hidden');
            jQuery(compact).addClass('hidden');
          }
        }
          
      });
      
    });
  }
  
  //HIDE PANELS ON SCROLL
  if ((jQuery('.panel.hideOnScroll').length > 0) && (window.isScroll || window.isSimplifiedMobile)){
    var lastScrollTop,
        i = 0,
        sensitivity = 20,
        panelToHide = jQuery('.panel.hideOnScroll');
         
    //hide if height larger than screen size 
    jQuery(window).scroll(function() {
      var scrollTop = jQuery(this).scrollTop(),
          windowHeight = jQuery(window).height(),
          documentHeight = jQuery(document).height(),
          $panelToHide = jQuery(panelToHide);
          
      if (scrollTop > lastScrollTop) {
        i++;
        if (i >= sensitivity) {
          $panelToHide.addClass('hide');
          i = sensitivity;
        }
      } else {
        i -= 1;
        if (i <= sensitivity/2) {
          i = 0;
          $panelToHide.removeClass('hide');
        }
      }
      lastScrollTop = scrollTop;
      
      //show on top and bottom
      if ((scrollTop + windowHeight + sensitivity >= documentHeight) || (scrollTop + sensitivity <= 0)) {
        $panelToHide.removeClass('hide');
      }
    }); 
  }
  
  
  
  
  
  
  
   
  /*
         _  __              
        | |/ /              
        | ' / ___ _   _ ____
        |  < / _ \ | | / __/
        | . \  __/ |_| \__ \
        |_|\_\___/\__, |___/
                   __/ |    
                  |___/    
   
        Listen user keys 
                                   */
   
	jQuery(window).on("keydown",function(e){
    var delta = 2.5,
        scrollTime = 0.5,
        scrollDistance = 50,
        currentSection = jQuery('.slide.selected .content'),
        scrollTop = jQuery(currentSection).scrollTop(),
        finalScroll = scrollTop + parseInt(delta*scrollDistance);

    
		/* [ ← ] */
		if (e.keyCode === 37){
      e.preventDefault();
			if (window.horizontalMode){ window.changeSlide('decrease'); }
		}
    
		/* [ ↑ ] */
		if (e.keyCode === 38){
			if (!window.horizontalMode){
        e.preventDefault();
        window.changeSlide('decrease');
      } else {
        e.preventDefault();
        TweenLite.to(jQuery(currentSection), scrollTime, {
          scrollTo : { y: finalScroll, autoKill:true },
          ease: Power1.easeOut,
          overwrite: 5							
        });
      }
		}
		
		/* [ → ] */
		if (e.keyCode === 39){
		  if (window.horizontalMode){ 
        e.preventDefault();
        window.changeSlide('increase');
      }
		}
    
		/* [ ↓ ] */
		if (e.keyCode === 40){
      if (!window.horizontalMode) {
        e.preventDefault();
        window.changeSlide('increase');
      } else {
        e.preventDefault();
        TweenLite.to(jQuery(currentSection), scrollTime, {
          scrollTo : { y: finalScroll, autoKill:true },
          ease: Power1.easeOut,
          overwrite: 5							
        });
      }
		}
		
		/* [ esc ] */
		if (e.keyCode === 27){
			hideSidebar();
      hideShare();
      hidePopup();
      unzoomImage();
		}
	});
  
  
  
  
  
  
  
   
  /*
       _   _                           _                 
      | \ | |           ( )           | | ( )                 •
      |  \| | __ ___   ___  __ _  __ _| |_ _  ___  _ __       •
      | . ` |/ _` \ \ / | |/ _` |/ _` | __| |/ _ \| '_ \     (•)
      | |\  | (_| |\ V /| | (_| | (_| | |_| | (_) | | | |     •
      |_| \_|\__,_| \_/ |_|\__, |\__,_|\__|_|\___/|_| |_|     •
                            __/ |
      Generate navigation  /___/               
  */
  
  
  
  var navParent = jQuery('.navigation'),
      navigation = jQuery(navParent).find('ul');
  
  if (jQuery(navigation).length > 0) {
  
  
    if (jQuery(navigation).is(':empty')) {
      
      jQuery(navigation).each(function(index, element) {
        for (var i = 1; i <= window.stages; i++){
          var title = jQuery('.slide:eq('+(i - 1)+')').data('title');
          if (title === undefined) { 
            
            if (window.debugMode) {
              jQuery(element).append('<li data-title="#'+i+'"></li>');
            } else {
              jQuery(element).append('<li></li>');
            }
          
          } else {
            jQuery(element).append('<li data-title="'+title+'"></li>');
          }
        }
      });
    }
    
    //Navigation clicks
    jQuery('.navigation li').on("click touchend", function(){
      window.changeSlide(jQuery(this).index() + 1);
    });
    
    if (!jQuery('.side').hasClass('compact')){
      //Collapse sidemenu to compact
      jQuery(window).on('load resize ready',function(){
        var containerWidth = jQuery(window).height() - jQuery(window).width()*0.1112 - 100,
            container = jQuery('.side').removeClass('compact').find('ul'),
            totalWidth = 0;
        
        jQuery(container).children().each(function(){
          if ( jQuery(this).outerWidth() > jQuery(this).children().outerWidth() ){
            totalWidth += Math.round(jQuery(this).outerWidth());
          } else {
            totalWidth += Math.round(jQuery(this).children().outerWidth());
          }
        });
        
        if (totalWidth > containerWidth){
          jQuery('.side').addClass('compact');
        } else {
          jQuery('.side').removeClass('compact');
        }
      });
    }
  }
  
  //In-page #Navigation
  jQuery("a[href^='#'][target!='_blank']").click(function(e){ e.preventDefault();
    
    var url = jQuery(this).attr('href'),
        hashLink = url.split('#')[1];
    
    if( hashLink && jQuery('.slide[name="' +hashLink+ '"]').length > 0 ){
      var requestedElement = jQuery('.slide[name="' +hashLink+ '"]');
      
      if ( window.isMobile && window.isSimplifiedMobile || window.isScroll ){
        var target = requestedElement;
        if (target.length) {
          jQuery('html,body').stop().clearQueue().animate({scrollTop:target.position().top},1000);
        }
        if (window.setHashLink){ 
          window.location.hash = hashLink;
        }
      } else {
        window.stage = jQuery('.slide').index(requestedElement) + 1;
        showSlide(window.stage);
      }
      if (window.isMobile){
        hideSidebar();
      }
    }
    
  });
  
  //Update Navigation
  function updateNavigation(){
    setTimeout(function(){
      if ( jQuery(navigation).length > 0 ){
        jQuery(navigation).each(function(index, element) {
          jQuery(element).find('li.selected').removeClass('selected');
          jQuery(element).find('li').eq(window.stage - 1).addClass('selected');
				});
      }
    },100);
  }
  
  
  
  
  
  
  
   
  /*     _____       _      _                 ☰   
        / ____(•)   | |    | |                
       | (___  _  __| | ___| |__   __ _ _ __   
        \___ \| |/ _` |/ _ | '_ \ / _` | '_/
        ____) | | (_| |  __| |_) | (_| | |   
       |_____/|_|\__,_|\___|_.__/ \__,_|_|   
                                             
       Sidebar Toggle                         */

  jQuery('.sidebarTrigger[data-sidebar-id]').on('click', function(){
    
    var sidebarID = jQuery(this).data('sidebar-id'),
        element = jQuery('.sidebar[data-sidebar-id="' + sidebarID + '"]'),
        isAnimated = jQuery(element).hasClass('animated');
    
    if (!window.sidebarShown){
      if (element.length > 0) {
        window.sidebarShown = 1;
        window.allowSlide = 0;
        jQuery(element).removeClass('animate active').addClass('visible');
        $html.addClass('sidebarShown');
        jQuery(element).find('.content').scrollTop(0);
        
        if (isAnimated){
          clearTimeout(window.removeAnimationTimeout);
          setTimeout(function(){
            jQuery(element).addClass('animate active');
          },100);
        }
      }
    } else {
      hideSidebar();
    }
    
    //clean up
    hideShare();
  });
  
  function hideSidebar(){
    
    if (window.sidebarShown){
      $html.removeClass('sidebarShown');
      var $sidebar = jQuery('.sidebar.visible');
      $sidebar.removeClass('visible');
      
      window.removeAnimationTimeout = setTimeout(function(){
        $sidebar.removeClass('animate active');
      },500);
      window.sidebarShown = 0;
      window.allowSlide = 1;
    }
  }
  
  //Hide on click outside
  jQuery(document).on('mouseup touchstart', function (e){
    var container = jQuery(".sidebarShown .sidebar, .dropdownTrigger");
    if (!container.is(e.target) && container.has(e.target).length === 0 && window.hideSidebarOnBodyClick) {
      hideSidebar();
    }
  });
  
  //Hide on .close Click
  jQuery('.sidebar .close').on('click touchstart', function(){
    hideSidebar();
  });
  
  
  
  
  
  
  
   
  /*    _____                           __
       |  __ \           _   _ _ __    |  |_
       | |__) ___  _ __ | | | | '_ \   |__| |
       |  ___/ _ \| '_ \| | | | |_) |    |__|
       | |  | (_) | |_)  \__,_| .__/
       |_|   \___/| .__/      | |    
                  | |         |_|    
       Popup      |_|                      */
                
  jQuery('.popupTrigger').on('click', function(){
    
    var sidebarID = jQuery(this).data('popup-id'),
        element = jQuery('.popup[data-popup-id="' + sidebarID + '"]'),
        isAnimated = element.hasClass('animated');
 
    
    if (element.length > 0) {
      jQuery(element).addClass('visible');
      
      if (isAnimated){
        setTimeout(function(){
          jQuery(element).addClass('animate active');
          
          clearTimeout(window.clearPopupElementAnimation);
          window.clearPopupElementAnimation = setTimeout(function(){
            jQuery(element).find("[class*='ae-']").addClass('done');
          }, window.effectSpeed + window.cleanupDelay);
        },100);
      }
    
      $html.toggleClass('popupShown');
      jQuery(element).scrollTop(0);
      window.allowSlide = 0;
      window.popupShown = 1;
      
      //Autoplay Iframe
      if (jQuery(element).hasClass('autoplay')){
        var $element = jQuery(element),
            iframe = $element.find('iframe'),
            HTML5video = $element.find('video');
            
        if ( iframe.length > 0  ) {
          var iframeSrc = jQuery(iframe).attr('src'),
              symbol = (iframeSrc.indexOf('?') > -1) ? "&" : "?";
          jQuery(iframe).attr('src',iframeSrc + symbol + "autoplay=1");
        } else if (HTML5video.length > 0){
          jQuery(HTML5video)[0].play();
        }
      }
    }
    
    //clean up
    hideShare();
  });
  
  function hidePopup() {
    //stop video on close
    if (window.popupShown){
      
      var element = jQuery('.popup.visible'),
          iframe = jQuery(element).find('iframe'),
          HTML5video = jQuery(element).find('video');
      
      //stop autoplay
      if (iframe.length > 0) {
        var iframeSrc = jQuery(iframe).attr('src'),
            symbol = (iframeSrc.indexOf('?autoplay') > -1) ? "?" : "&";
            
        jQuery(iframe).attr('src', jQuery(iframe).attr('src').replace(symbol+'autoplay=1',''));
      } else if (HTML5video.length > 0) {
          jQuery(HTML5video)[0].pause();
          jQuery(HTML5video)[0].currentTime = 0;
      }
      
      $html.removeClass('popupShown');
      
      //clear element animation on done
      clearTimeout(window.clearPopupElementAnimation);
      jQuery(element).find('.done').removeClass('done');
      jQuery(element).removeClass('visible animate active');
      
      window.allowSlide = 1;
      window.popupShown = 0;  
    }
  }
  
  //Hide on body click
  jQuery(document).on('click', function (e){
    var container = jQuery(".popupShown .popup .popupContent, .popupTrigger");
    if (!container.is(e.target) && container.has(e.target).length === 0 && container.length > 0) {
      hidePopup();
    }
  });
  
  //Hide on .close Click
  jQuery('.popup .close').on('click', function(){
    hidePopup();
  });
  
  
  
  
  
  
  
   
  /*     _____ ______ ______ 
        / ____|  ___/|  ___/
       | |  _ | |__  | |__   
       | | |_\|  __/ |  __/  
       | |__| | |____| |____ 
        \____/|_____/|_____/
                             
       Grid Element Equalizer    */
  
  jQuery(window).on('resize load ready',function(){
    equalizeELements();
  });
    
  function equalizeELements(){
    
    var gridEl = jQuery('.grid.equal');
    if (gridEl.length) {
      jQuery(gridEl).each(function(index, element) {
          
        var screenWidth = jQuery(window).width(),
            collapseWidth = (jQuery(element).hasClass('later')) ? 767 : 1024,
            equalElement = jQuery(element).find('.equalElement'),
            equalMobile = jQuery(this).hasClass('equalMobile');
            
        if ((screenWidth >= collapseWidth)||(equalMobile)){
          var height = 0;
            
          //fetch max height
          jQuery(equalElement).each(function(index, el) {
            
            jQuery(el).css('height','auto');
            
            if (height < jQuery(el).outerHeight()) {
              height = jQuery(el).outerHeight();
            }
            
          });
              
          //apply
          jQuery(element).find('.equalElement').each(function(index, el) {
            jQuery(el).css('height',height + "px");
          });
        } else {
          jQuery(equalElement).css("height",'auto');
        }
      });
    }
  }
 
  //Detect Resize
  jQuery(window).on('resize',function(){
    $html.addClass('resizing');
  }).on('resizeEnd',function(){
    $html.removeClass('resizing');
  });
  
  
  
  
  
  
  
   
  /*     _____ _       _           
        / ____| (•)   | |          
       | (___ | |_  __| | ___ _ __ 
        \___ \| | |/ _` |/ _ \ '_/
        ____) | | | (_| |  __/ |   
       |_____/|_|_|\__,_|\___/_|   
                                   
                                                           
       Slider     • •(•)• •        */
  
  
  var sliderEl = jQuery('.slider');
  
  if (jQuery(sliderEl).length > 0) {
    jQuery(sliderEl).each(function(index, element) {
      
      //auto height
      if (jQuery(element).hasClass('clickable')){    
        jQuery(element).on('click', function(){
  
          var el = jQuery(this),
              selected = jQuery(el).find('.selected'),
              $selected = jQuery(selected),
              nextElement = jQuery(selected).nextOrFirst('li'),
              nextIndex = jQuery(nextElement).index(),
              sliderID = jQuery(el).data('slider-id'),
              controller = jQuery('.controller[data-slider-id="'+sliderID+'"]');
               
          //select next
          jQuery(selected).removeClass('selected').addClass('hide');
          jQuery(nextElement).removeClass('hide').addClass('selected');
          
          $selected.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
            jQuery(this).removeClass('hide');
          });
                    
          if ( (sliderID) && (jQuery(controller).length > 0) ){
            jQuery(controller).find('.selected').removeClass('selected');
            jQuery(controller).children('li:eq('+nextIndex+')').addClass('selected');
          }
        });
      }
		});
  }
  
  // controller
  var controller = jQuery('.controller');
  
  if (jQuery(controller).length > 0) {
    jQuery(controller).find('li').each(function(index, element) {
      
			 jQuery(element).on('click', function(){
         var controllerElement = jQuery(this),
             selectedElement = jQuery(controllerElement).closest('.controller').find('.selected'),
             elementIndex = jQuery(this).index(),
             controllerId = jQuery(controllerElement).closest('.controller').data('slider-id'),
             sliderId = jQuery('.slider[data-slider-id="'+controllerId+'"]');
         
         if (!jQuery(controllerElement).hasClass('selected')){
            jQuery(selectedElement).removeClass('selected');
            jQuery(controllerElement).addClass('selected');
            sliderId.find('.selected').removeClass('selected').addClass('hide').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
              jQuery(this).removeClass('hide');
            });
            sliderId.children('li:eq('+elementIndex+')').removeClass('hide').addClass('selected');
         }
       });
      
    });
  }
  
  //Next and prev buttons
  jQuery('[data-slider-action]').click(function(){
    
    if (jQuery(this).data('slider-id')){
      var desiredElement, desiredIndex,
          sliderID = jQuery(this).data('slider-id'),
          action = jQuery(this).data('slider-action'),
          slider = jQuery('.slider[data-slider-id="' + sliderID + '"]'),
          controller = jQuery('.controller[data-slider-id="'+sliderID+'"]'),
          selected = jQuery(slider).find('.selected');
          
      if (action === "next"){
        desiredElement = jQuery(selected).nextOrFirst('li');
      } else if (action === "prev") {
        desiredElement = jQuery(selected).prevOrLast('li');
      }
               
      //select next
      desiredIndex = jQuery(desiredElement).index();
      jQuery(selected).removeClass('selected');
      jQuery(desiredElement).removeClass('hide').addClass('selected');
                    
      if ((sliderID) && (jQuery(controller).length > 0) ){
        jQuery(controller).find('.selected').removeClass('selected').addClass('hide').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
          jQuery(this).removeClass('hide');
        });
        jQuery(controller).children('li:eq('+desiredIndex+')').addClass('selected');
      }
      
    }
  });
  
  //Auto Height
  jQuery('[data-slider-id].autoHeight').each(function(index, element) {
		jQuery(window).on('click resize load ready',function(){
      var totalHeight = 0;
      
      jQuery(element).find('.selected').children().each(function(){
        totalHeight += Math.round(jQuery(this).outerHeight());
      });
      jQuery(element).height(totalHeight + "px");
		});
	});
  
  
  
  
  
  
  
   
  /*     _____ _                    
        / ___/| |                   
       | (___ | |__   __ _ _ __ ___ 
        \___ \| '_ \ / _` | '__/ _ \
        ____) | | | | (_| | | |  __/
       /_____/|_| |_|\__,_|_|  \___/
    
       Share Window Appereance and Performance */
       
       
  window.dropdownShown = false;
  jQuery('.dropdownTrigger').click(function(){
    if (window.dropdownShown){
      hideShare();
    } else {
      //show
      
      var offset = jQuery(this).offset(),
          offsetY = Math.ceil(offset.top),
          offsetX = Math.ceil(offset.left),
          shareID = jQuery(this).data('dropdown-id'),
          element = jQuery('.dropdown[data-dropdown-id="' + shareID + '"]');
      
      clearTimeout(window.hideDropdown);
      
      if ( jQuery(element).hasClass('bottom') ) {
        offsetY = offsetY - jQuery(element).outerHeight();
      } else {
        offsetY = offsetY + jQuery(this).outerHeight();
      }
      
      if ( jQuery(element).hasClass('right') ) {
        offsetX = offsetX - jQuery(element).outerWidth() + jQuery(this).outerWidth();
      }
      
      jQuery(element).removeClass('show hide').addClass('show').css('top',offsetY).css('left',offsetX);
      $html.addClass('dropdownShown');
      window.dropdownShown = true;
    }
  });
  
  function hideShare(){
    //hide
    if (window.dropdownShown){
      jQuery('.dropdown').addClass('hide');
      $html.removeClass('dropdownShown');
      window.hideDropdown = setTimeout(function(){
        jQuery('.dropdown').removeClass('show hide');
      },500);
      window.dropdownShown = false;
    }
    
    hideShareonScrollDelay = 0;
  }
  
  //remove on resize
  jQuery(window).on('resize',function(){ 
    hideShare();
  });
  
  //remove on click outside
  jQuery(document).on('mouseup touchstart', function (e){
    var container = jQuery(".dropdownShown .dropdown, .dropdownTrigger");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      hideShare();
    }
  });
  
  //set url for share
  window.shareUrl = window.location.href;
  if (jQuery('.share').data('url')) {
    window.shareUrl = jQuery('.dropdown').data('url');
  }
  //set text for share
  window.shareText = document.title;
  if (jQuery('.share').data('text')) {
    window.shareText = jQuery('.dropdown').data('url');
  }
  
  jQuery('.share').sharrre({
    enableHover: false,
    shorterTotal: true,
    url: window.shareUrl,
    text: window.shareText,
    enableCounter: false,
    share: {
      twitter: true,
      facebook: true,
      pinterest: true,
      googlePlus: true,
      stumbleupon: true,
      linkedin: true
    },
    
    buttons: {
      pinterest: {
        media: jQuery('.dropdown').data('pinterest-image'),
        description: jQuery('.dropdown').data('text') + " " + jQuery('.dropdown').data('url')
      }
    },
    
    template: jQuery('.share').html(),
    
    render: function(api) {
      
      jQuery(api.element).on('click touchstart', '.twitter', function() {
        api.openPopup('twitter');
      });
      jQuery(api.element).on('click touchstart', '.facebook', function() {
        api.openPopup('facebook');
      });
      jQuery(api.element).on('click touchstart', '.pinterest', function() {
        api.openPopup('pinterest');
      });
      jQuery(api.element).on('click touchstart', '.googlePlus', function() {
        api.openPopup('googlePlus');
      });
      jQuery(api.element).on('click touchstart', '.stumbleupon', function() {
        api.openPopup('stumbleupon');
      });
      jQuery(api.element).on('click touchstart', '.linkedin', function() {
        api.openPopup('linkedin');
      });
      jQuery(api.element).on('click touchstart', '.mail', function() {
        var subject = (jQuery(this).data('subject') ? jQuery(this).data('subject') : "");
        var body = (jQuery(this).data('body') ? jQuery(this).data('body') : "");
        var url = window.location.href;
        if ( jQuery('.dropdown').data('url') ) { url = jQuery('.dropdown').data('url'); }
        //open email
        window.location.href ="mailto:?Subject=" + encodeURIComponent( subject ) + "&Body=" + encodeURIComponent( body ) + " " + url;
      });
      
    }
  });
  
  //CONTACT FORM
  jQuery("#contact-form").ajaxForm(function() { 
    var $contactFormButton = jQuery("#contact-form .button"),
        successText = $contactFormButton.data('success-text') ? $contactFormButton.data('success-text') : "Done!",
        successClass = $contactFormButton.data('success-class') ? $contactFormButton.data('success-class') : "green",
        defaultText = $contactFormButton.val();
        
    $contactFormButton.attr('value',successText).addClass(successClass);
    
    setTimeout(function(){
      jQuery("#contact-form .button").attr('value',defaultText).removeClass(successClass);
      jQuery("#contact-form")[0].reset();
    },4000);
  });
  
// end on dom ready
});