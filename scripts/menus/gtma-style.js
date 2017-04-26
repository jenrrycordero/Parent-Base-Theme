if ( typeof svgIcon === "function")
    new svgIcon( document.querySelector( '.si-icon-hamburger-cross' ), svgIconConfig, { easing : mina.elastic, speed: 600, size: {w:50,h:50} } );

//here should be the .ready() if needed for the menu.
jQuery(document).ready( function($) {

    const offset = 50;
    const setScrolled = _.debounce( () => {
        const $b = $("body");
        const vTop = $(window).scrollTop();

        if ( vTop < offset ) $b.removeClass("scrolled");
        else {
            if ( $b.is(".scrolled") ) return;
            $b.addClass("scrolled");
        }
    }, 10);

    $(window).scroll( setScrolled );

    setScrolled();
});