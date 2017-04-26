<?php


//Basic theme support and images definitions.
add_action( 'after_setup_theme', 'a_theme_setup' );
function a_theme_setup()
{

	// Images sizes.
	add_image_size('icon', 30, 30, true);
	add_image_size('extra-large', 1500, '', true);
	add_image_size('large', 700, '', true);
	add_image_size('medium', 250, '', true);
	add_image_size('small', 120, '', true);
	add_image_size('square-small', 100, 100, true);
	add_image_size('square-medium', 300, 300, true);

	/*
	 * TODO: develop code to support the different-specific type of post-types.
	 * Enable support for Post Formats.
	 * See https://developer.wordpress.org/themes/functionality/post-formats/
	 */
	add_theme_support(
		'post-formats', array(
			              'aside',
			              'image',
			              'video'
		              )
	);

	// Localisation Support
	load_theme_textdomain(THEME_DOMAIN, get_template_directory() . '/languages');
}

// Add Custom Scripts to wp_head
add_action('init', 'a_theme_header_scripts');
function a_theme_header_scripts()
{
	if ($GLOBALS['pagenow'] != 'wp-login.php' && !is_admin()) {


//		wp_enqueue_style( 'jquery-ajaxform', get_template_directory_uri() . '/js/lib/jquery.ajaxform.min.js', array('jquery'), '3.3' );
//		wp_enqueue_script('jquery-ajaxform');


		/*
		wp_localize_script( 'scripts', 'ajaxObj', array(
			// URL to wp-admin/admin-ajax.php to process the request
			'ajaxurl'          => admin_url( 'admin-ajax.php' ),
		));
		*/
	}
}

add_action('init', 'a_theme_menus');
function a_theme_menus()
{
//	register_nav_menus(
//		array( // Using array to specify more menus if needed
//		       'header-menu'    => __( 'Header Menu', THEME_DOMAIN ),   // Main Navigation
//		       'sidebar-menu'   => __( 'Sidebar Menu', THEME_DOMAIN ),  // Sidebar Navigation
//		       'footer-menu'    => __( 'Footer Menu', THEME_DOMAIN )    // Extra Navigation if needed (duplicate as many as you need!)
//		)
//	);
}


add_action( 'widgets_init', 'a_theme_widgets_init' );
/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function a_theme_widgets_init()
{
//	register_sidebar(
//		array(
//			'name'          => esc_html__( 'Sidebar', 'universal-musica' ),
//			'id'            => 'sidebar-1',
//			'description'   => '',
//			'before_widget' => '<section id="%1$s" class="widget %2$s">',
//			'after_widget'  => '</section>',
//			'before_title'  => '<h2 class="widget-title">',
//			'after_title'   => '</h2>',
//		) );
}




// ###############################     ADMIN ACTIONS     ############################ //
add_action( 'admin_enqueue_scripts', 'a_theme_header_scripts_admin' );
function a_theme_header_scripts_admin ()
{

}