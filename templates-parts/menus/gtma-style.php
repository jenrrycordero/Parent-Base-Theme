<?php
/**
 * This menu is intended to use everything from the theme-options page: Menu Settings. It will use
 * customized links with icons and work as a clean menu, closed by default, that will open
 * on click to reveal the menu itself.
 */

$main_logo = get_field("main_logo", "option");
$main_logo_2 = get_field("main_logo_dark", "option");



//Menu specific options.

$menu = get_field( "menu_pages", "option") ?: array();
$menu_css = str_replace(array("<style>", "</style>"), "", get_field("menu_custom_css", "option"));
$menu_js = str_replace(array("<script>", "</script>"), "", get_field("menu_custom_js", "option"));

?>
<style><?php echo $menu_css;?></style>

<header id="masthead" class="site-header menu-closed container-fluid no-padding " role="banner">

    <div class="page-wrap site-header-top-bar">
        <div id="site-navigation-menu-toggle" class="">
            <span class="si-icon si-icon-hamburger-cross" data-icon-name="hamburgerCross"></span>
        </div>

        <div class="site-branding">
            <a href="<?php echo home_url();?>" rel="index" title="<?php echo get_bloginfo('name');?>">
				<?php render_image($main_logo, 'sd', 'full', 'url', 'img-responsive site-logo logo-menu-closed');?>
				<?php render_image($main_logo_2, 'sd', 'full', 'url', 'img-responsive site-logo logo-menu-open ');?>
            </a>
        </div><!-- .site-branding -->

        <!-- TODO: Phone -->
    </div>

	<?php
	$menu_name = 'header-menu';
	$locations = get_nav_menu_locations();
	$menu_id = $locations[ $menu_name ] ;
	$menu_elements = wp_get_nav_menu_items( $menu_id );

	if ( $menu_elements && count($menu_elements) > 0) :
		?>

        <nav id="site-navigation-main-wrapper" class="main-navigation-wrapper " role="navigation">
            <div id="site-navigation-menu-wrapper" class="page-wrap">
                <ul id="site-navigation-main" class="main-navigation nav-menu">
					<?php
					/*
					[ID]
					[db_id] => 95
					[menu_item_parent] => 0
					[object] => page
					[type] => post_type
					[url] => http://gtma.local/sample-page/
					[title] => Sample Page
					[target] =>
					[attr_title] =>
					[description] =>
					[classes] => Array
					(
						[0] => ""
					)
					[xfn] => ""
					 */
					foreach ($menu_elements as $index => $element) :

						$menu_ID    = $element->db_id;
						$classes_a  = implode( "", $element->classes );
						$classes_li = "menu-item menu-item-type-{$element->type} menu-item-type-{$element->object} menu-item-$menu_ID menu-pos-$index";

						if ( $index === 0 ) $classes_li .= " menu-item-first";
						if ( $index === count($menu_elements)-1) $classes_li .= " menu-item-last";

						$menu_img       = get_field( "menu_main_image", $menu_ID );
						$menu_img_hover = get_field( "menu_main_image_hover", $menu_ID );
						$menu_video     = get_field( "video_hover", $menu_ID );


						?>
                        <li id="menu-item-<?php echo $menu_ID?>" class="menu-item-wrapper <?php echo $classes_li;?>">
                            <a class="<?php echo $classes_a?>" target="<?php echo $element->target?>" rel="<?php echo $element->xfn?>" title="<?php echo $element->attr_title?>"
                               href="<?php echo $element->url?>">
                                <div class="icon-wrapper">
									<?php render_menu_icon($menu_img, $menu_img_hover, $menu_video, "icon for {$element->title}"); ?>
                                </div>
                                <div class="menu-title"><?php echo $element->title;?></div>
                            </a>
                        </li>
						<?php
					endforeach;
					?>
                </ul> <!-- #site-navigation-main -->
            </div>

			<?php
			$display_social_header = true;
			if ( $display_social_header ) :
				render_social_list_from_options("header-social-list-wrapper","social-list-element");
			endif;
			?>
        </nav><!-- #site-navigation-main-wrapper -->

	<?php endif; ?>

</header><!-- #masthead -->

<script><?php echo $menu_js;?></script>
<script>
    /**
     * navigation.js
     *
     * Handles toggling the navigation menu for small screens
     */
    ( function() {
        var container, button, menu, links, subMenus;

        container = document.getElementById('masthead');
        if ( ! container ) {
            return;
        }

        button = document.getElementById('site-navigation-menu-toggle');
        if ( typeof button == 'undefined' ) {
            return;
        }

        menu = document.getElementById('site-navigation-main');
        // Hide menu toggle button if menu is empty and return early.
        if ( typeof menu === 'undefined'  ) {
            button.style.display = 'none';
            return;
        }

        menu.setAttribute( 'aria-expanded', 'false' );
        if ( menu.className.indexOf( 'nav-menu' ) === -1 ) {
            menu.className += ' nav-menu';
        }

        button.onclick = function() {
            if ( container.className.indexOf( 'toggled' ) !== -1 ) {
                container.className = container.className.replace( ' toggled menu-open', '' );
                button.setAttribute( 'aria-expanded', 'false' );
                menu.setAttribute( 'aria-expanded', 'false' );
            }
            else {
                container.className += ' toggled menu-open';
                button.setAttribute( 'aria-expanded', 'true' );
                menu.setAttribute( 'aria-expanded', 'true' );
            }
        };

    } )();

</script>