module.exports = {
    "debug": true,
    "output" : {
        "names" : {
            "css" : {
                "head" : "theme.css",
                "footer" : "theme-footer.css"
            },
            "js" : {
                "head" : "vendors-head.js",
                "headNoMin" : "vendors-head-2.js",
                "footer" : "theme.js",
                "footerVendor" : "vendors-footer.js"
            },
        },
        "directories": {
            "css": "dist/css",
            "js": "dist/js",
            "fonts": "dist/fonts"
        },
    },
    "files": {
        "menus" : {
            "js" : [
                //"scripts/menus/gtma-style.js"
            ],
            "css" : [

            ]
        },
        "footer": {
            "js" : [

            ],
            "css" : [

            ]
        },
        "js": {
            "head": [
                "vendor/components/modernizr/modernizr.js",
                "assets/scripts/conditionizr.min.js",
                "assets/scripts/isMobile.min.js"
            ],
            "headNoMin": [
                "assets/lib/animatedSVGIcons/js/snap.svg-min.js",
            ],
            "footerVendor" : [
                "vendor/twbs/bootstrap-sass/dist/js/bootstrap.min.js",
                "assets/lib/owl-carousel/*.min.js",

                //"assets/scripts/lodash-core.js",
                "assets/scripts/lodash-build.js",

                // "assets/lib/animatedSVGIcons/js/snap.svg.js",
                // "node_modules/",
                "assets/lib/animatedSVGIcons/js/svgicons-config.js",
                "assets/lib/animatedSVGIcons/js/svgicons.js",

                // "assets/lib/slides/js/plugins.js",
                // "assets/lib/slides/js/slides.js",
            ],
            "footer": [
                //the whole bootstrap. We can use the second index to select specifically which parts of bootstrap do we want to load.
                //"vendor/twbs/bootstrap/js/affix.js",
                //"vendor/twbs/bootstrap/js/alert.js",
                //"vendor/twbs/bootstrap/js/button.js",
                //"vendor/twbs/bootstrap/js/carousel.js",
                //"vendor/twbs/bootstrap/js/collapse.js",
                //"vendor/twbs/bootstrap/js/dropdown.js",
                //"vendor/twbs/bootstrap/js/modal.js",
                //"vendor/twbs/bootstrap/js/popover.js",
                //"vendor/twbs/bootstrap/js/scrollspy.js",
                //"vendor/twbs/bootstrap/js/tab.js",
                //"vendor/twbs/bootstrap/js/tooltip.js",
                //"vendor/twbs/bootstrap/js/transition.js"
                "scripts/helpers/jquery.js",
                // "scripts/helpers/vanilla.js",
                "!scripts/_*.js",            // Will be ignore.

                "scripts/*.js"               //ALWAYS LAST!
            ]
        },
        "css": {
            "head": [
                "vendor/twbs/bootstrap/dist/css/bootstrap.min.css",    //the whole bootstrap. This should be optimized/configured.
                "vendor/twbs/bootstrap/dist/css/bootstrap-theme.min.css",
                "vendor/components/font-awesome/css/font-awesome.min.css",
                "assets/lib/owl-carousel/*.css",
                "assets/style/animate.css",

                // "assets/lib/slides/css/slides.css",

                "!assets/style/_*.css",     // Will be ignore.
                "!scss/_*.scss",            // Will be ignore.
                "assets/style/*.css",

                "scss/*.scss"               // ALWAYS LAST.
            ],
            "footer": []
        },
        "fonts": [
            "vendor/twbs/bootstrap/dist/fonts/*",
            "vendor/components/font-awesome/fonts/*",
            "assets/fonts/codropsicons/*",
            "assets/fonts/vicons/*"
        ]
    }
};
