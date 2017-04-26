
/**
 * Function to replace images on the background or on the image itself. This function should be called on document
 * ready and as a callback of any ajax Call.
 *
 * @param {String} imgClass Class to find and replace the src attribute. Default img-lazy
 * @param {String} imgClassBackground Class to find and replace the background-image Css Attribute. Default img-bg-lazy
 * @param {String} imgClassLoaded Class used to identify elements whom images where replaced.
 */
function replace_images (imgClass, imgClassBackground, imgClassLoaded) {

    if ( !imgClass ) imgClass = "img-lazy";
    if ( !imgClassBackground ) imgClassBackground = "img-bg-lazy";
    if ( !imgClassLoaded ) imgClassLoaded = "img-lazy-loaded";

    /** IMG tag. Replace the image sd with the one with hd quality       **/
    jQuery(`.${imgClass}`).each(function () {
        const $this = jQuery(this);
        const img_hd = $this.data("img-hd");

        if (img_hd && !$this.is(`.${imgClassLoaded}`)) {
            jQuery("<img/>", {
                src: img_hd
            })
                .data("target", $this)
                .load(function () {
                    const $imgAssociated = jQuery(this).data("target");
                    $imgAssociated.attr('src', jQuery(this).attr("src")).addClass(imgClassLoaded);
                })
                .error(function() {
                    const $imgAssociated = jQuery(this).data("target");
                    $imgAssociated.attr('src', jQuery(this).attr("src")).addClass(imgClassLoaded);
                });
        }
    });

    /** replace the background image sd with the one with hd quality **/
    jQuery(`.${imgClassBackground}`).each(function () {
        const $this = jQuery(this);
        const img_hd = $this.data("img-hd");

        if (img_hd && !$this.is(".img-lazy-loaded")) {
            jQuery("<img/>", {
                src: img_hd
            })
                .data("target", $this)
                .load(function () {
                    const $imgAssociated = jQuery(this).data("target");
                    $imgAssociated.css({
                        'backgroundImage': "url('" + jQuery(this).attr("src") + "')"
                    }).addClass(imgClassLoaded);
                })
                .error(function () {
                    const $imgAssociated = jQuery(this).data("target");
                    $imgAssociated.css({
                        'backgroundImage': "url('" + jQuery(this).attr("src") + "')"
                    }).addClass(imgClassLoaded);
                });
        }
    });
}

function jump_to_init(options = {})
{
    const def = {
        animated: true,
        animationSpeed: 400,
    };

    const o = _.assignIn(def, options);

    jQuery("body").on("click", ".jump-to", function () {
        const $this = jQuery(this);
        const $wrapper = $this.parent();
        const animated = !!$this.data("jump-animated");   //todo this or through the options?
        const target = $this.data("target");
        const $target = target === "" ? $wrapper.parent().next() :
            target === "#" ? jQuery("html") : jQuery( target );

        if ( $target.length > 0 )
        {
            $this.addClass("jumped");

            jQuery('html, body').animate({
                    scrollTop: $target.offset().top
                },
                animated ? o.animationSpeed : 0);
        }
    });
}




function init_animate(c = ".animate")
{
    jQuery(c).each(function() {

        const $this = jQuery(this);
        const animation = $this.data("animation");

        if ( $this.is(".animate-hover") )
        {
            $this.hover(function() {
                $this.addClass(`animated ${animation}`);
            }, function() {
                //$this.removeClass(`animated ${animation}`)
            });
        }
        else
        {
            $this.click(function() {
                $this.addClass(`animated ${animation}`);
            })
        }
        $this.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
            $this.removeClass(`animated ${animation}`);
        });
    })

}

/**
 * Plugin to allow the color swap of elements (this function is to be applied to the element that will have the bg swapped)
 *
 * @param options
 */
jQuery.fn.init_color_swapp = function(options = {})
{
    const def = {
        speed : 300,
        offset : -270,
        targetClass : ".set-bg-color",
        targetData : "bg-color",
        animate : "swing",
        onScroll : true,
        onResize : true,
        callback : (e) => {},
        triggerDelay : 10
    };

    const o = _.assignIn(def, options);

    let currentColor = jQuery( jQuery(o.targetClass).get(0) ).data( o.targetData );

    const $target = jQuery(this);
    $target.css("background", currentColor);

    const f = _.debounce(
        () => {

            const el = {
                animationProperty : {},
                object : {}
            };
            const $elements = jQuery(o.targetClass);

            $elements.each(function (i) {
                const $this = jQuery(this);
                const thisColor = $this.data( o.targetData );

                if ( $this.isInViewPort(o.offset)) {
                    //update the current color as well as the animationProperty object.
                    el.animationProperty.backgroundColor = thisColor;
                    el.object = $this;
                }

                if ( $elements.length == i+1)
                {
                    //we only process the animation on the last element. Will use the color set previously...
                    if (currentColor != el.animationProperty.backgroundColor )
                    {
                        $target.animate(el.animationProperty, {
                            duration: o.speed,
                            animation : o.animate,
                            complete: o.callback( el.object ),
                            queue : false
                        });
                    }
                    currentColor = el.animationProperty.backgroundColor
                }

            });
        }, o.triggerDelay, {
            leading: true,
            trailing: false
        });

    if ( o.onScroll ) jQuery(window).scroll(f);
    if ( o.onResize ) jQuery(window).resize(f);
};


jQuery.fn.isInViewPort = function(offset = 0) {
    const $w = jQuery(window);
    const $this = jQuery(this);

    const viewPortTop = $w.scrollTop();
    const viewPortBottom = viewPortTop + $w.height() + offset;

    const eTop = $this.offset().top;
    const eBotom = eTop + $this.height();

    return (
        eTop < viewPortBottom //The top of the element is INSIDE (less than) the viewPort bottom limit
        &&
        eBotom > viewPortTop // the element isnt outside of the viewport.
    );
};