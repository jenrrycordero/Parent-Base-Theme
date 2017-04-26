
//Fire general codes.

if ( typeof svgIcon === "function")
{
    //dropdown.
    const iconArrowDown = document.querySelector( '.si-icon-down-arrow' );
    if ( iconArrowDown ) new svgIcon( iconArrowDown, svgIconConfig, { easing : mina.elastic, speed: 600, size: {w:50,h:80} } );
}




//Ready event.
jQuery(document).ready(function ($) {
    $(window).addClass("dom-ready");

    replace_images();

});









//Load event
jQuery(document).load(function($) {
    $(window).addClass("dom-loaded");
});