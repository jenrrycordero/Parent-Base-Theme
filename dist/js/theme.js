"use strict";

/**
 * Function to replace images on the background or on the image itself. This function should be called on document
 * ready and as a callback of any ajax Call.
 *
 * @param {String} imgClass Class to find and replace the src attribute. Default img-lazy
 * @param {String} imgClassBackground Class to find and replace the background-image Css Attribute. Default img-bg-lazy
 * @param {String} imgClassLoaded Class used to identify elements whom images where replaced.
 */
function replace_images(imgClass, imgClassBackground, imgClassLoaded) {

    if (!imgClass) imgClass = "img-lazy";
    if (!imgClassBackground) imgClassBackground = "img-bg-lazy";
    if (!imgClassLoaded) imgClassLoaded = "img-lazy-loaded";

    /** IMG tag. Replace the image sd with the one with hd quality       **/
    jQuery("." + imgClass).each(function () {
        var $this = jQuery(this);
        var img_hd = $this.data("img-hd");

        if (img_hd && !$this.is("." + imgClassLoaded)) {
            jQuery("<img/>", {
                src: img_hd
            }).data("target", $this).load(function () {
                var $imgAssociated = jQuery(this).data("target");
                $imgAssociated.attr('src', jQuery(this).attr("src")).addClass(imgClassLoaded);
            }).error(function () {
                var $imgAssociated = jQuery(this).data("target");
                $imgAssociated.attr('src', jQuery(this).attr("src")).addClass(imgClassLoaded);
            });
        }
    });

    /** replace the background image sd with the one with hd quality **/
    jQuery("." + imgClassBackground).each(function () {
        var $this = jQuery(this);
        var img_hd = $this.data("img-hd");

        if (img_hd && !$this.is(".img-lazy-loaded")) {
            jQuery("<img/>", {
                src: img_hd
            }).data("target", $this).load(function () {
                var $imgAssociated = jQuery(this).data("target");
                $imgAssociated.css({
                    'backgroundImage': "url('" + jQuery(this).attr("src") + "')"
                }).addClass(imgClassLoaded);
            }).error(function () {
                var $imgAssociated = jQuery(this).data("target");
                $imgAssociated.css({
                    'backgroundImage': "url('" + jQuery(this).attr("src") + "')"
                }).addClass(imgClassLoaded);
            });
        }
    });
}

function jump_to_init() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var def = {
        animated: true,
        animationSpeed: 400
    };

    var o = _.assignIn(def, options);

    jQuery("body").on("click", ".jump-to", function () {
        var $this = jQuery(this);
        var $wrapper = $this.parent();
        var animated = !!$this.data("jump-animated"); //todo this or through the options?
        var target = $this.data("target");
        var $target = target === "" ? $wrapper.parent().next() : target === "#" ? jQuery("html") : jQuery(target);

        if ($target.length > 0) {
            $this.addClass("jumped");

            jQuery('html, body').animate({
                scrollTop: $target.offset().top
            }, animated ? o.animationSpeed : 0);
        }
    });
}

function init_animate() {
    var c = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ".animate";

    jQuery(c).each(function () {

        var $this = jQuery(this);
        var animation = $this.data("animation");

        if ($this.is(".animate-hover")) {
            $this.hover(function () {
                $this.addClass("animated " + animation);
            }, function () {
                //$this.removeClass(`animated ${animation}`)
            });
        } else {
            $this.click(function () {
                $this.addClass("animated " + animation);
            });
        }
        $this.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $this.removeClass("animated " + animation);
        });
    });
}

/**
 * Plugin to allow the color swap of elements (this function is to be applied to the element that will have the bg swapped)
 *
 * @param options
 */
jQuery.fn.init_color_swapp = function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var def = {
        speed: 300,
        offset: -270,
        targetClass: ".set-bg-color",
        targetData: "bg-color",
        animate: "swing",
        onScroll: true,
        onResize: true,
        callback: function callback(e) {},
        triggerDelay: 10
    };

    var o = _.assignIn(def, options);

    var currentColor = jQuery(jQuery(o.targetClass).get(0)).data(o.targetData);

    var $target = jQuery(this);
    $target.css("background", currentColor);

    var f = _.debounce(function () {

        var el = {
            animationProperty: {},
            object: {}
        };
        var $elements = jQuery(o.targetClass);

        $elements.each(function (i) {
            var $this = jQuery(this);
            var thisColor = $this.data(o.targetData);

            if ($this.isInViewPort(o.offset)) {
                //update the current color as well as the animationProperty object.
                el.animationProperty.backgroundColor = thisColor;
                el.object = $this;
            }

            if ($elements.length == i + 1) {
                //we only process the animation on the last element. Will use the color set previously...
                if (currentColor != el.animationProperty.backgroundColor) {
                    $target.animate(el.animationProperty, {
                        duration: o.speed,
                        animation: o.animate,
                        complete: o.callback(el.object),
                        queue: false
                    });
                }
                currentColor = el.animationProperty.backgroundColor;
            }
        });
    }, o.triggerDelay, {
        leading: true,
        trailing: false
    });

    if (o.onScroll) jQuery(window).scroll(f);
    if (o.onResize) jQuery(window).resize(f);
};

jQuery.fn.isInViewPort = function () {
    var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    var $w = jQuery(window);
    var $this = jQuery(this);

    var viewPortTop = $w.scrollTop();
    var viewPortBottom = viewPortTop + $w.height() + offset;

    var eTop = $this.offset().top;
    var eBotom = eTop + $this.height();

    return eTop < viewPortBottom //The top of the element is INSIDE (less than) the viewPort bottom limit
    && eBotom > viewPortTop // the element isnt outside of the viewport.
    ;
};
"use strict";

//Fire general codes.

if (typeof svgIcon === "function") {
    //dropdown.
    var iconArrowDown = document.querySelector('.si-icon-down-arrow');
    if (iconArrowDown) new svgIcon(iconArrowDown, svgIconConfig, { easing: mina.elastic, speed: 600, size: { w: 50, h: 80 } });
}

//Ready event.
jQuery(document).ready(function ($) {
    $(window).addClass("dom-ready");

    replace_images();
});

//Load event
jQuery(document).load(function ($) {
    $(window).addClass("dom-loaded");
});