<?php


//Basic theme support and images definitions.
add_action( 'after_setup_theme', 'a_theme_core_setup' );
function a_theme_core_setup()
{
	// Add Menu Support
	add_theme_support('menus');

	// Add Thumbnail Theme Support
	add_theme_support('post-thumbnails');

	//TODO: load images sizes dynamically?

	// Images sizes.
	add_image_size('icon', 30, 30, true);
	add_image_size('extra-large', 1500, '', true);
	add_image_size('large', 700, '', true);
	add_image_size('medium', 250, '', true);
	add_image_size('small', 120, '', true);
	add_image_size('square-small', 100, 100, true);
	add_image_size('square-medium', 300, 300, true);

	add_theme_support(
		'html5', array(
			       'search-form',
			       'comment-form',
			       'comment-list',
			       'gallery',
			       'caption',
		       )
	);

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

	// Add Support for Custom Backgrounds - Uncomment below if you're going to use
	/*add_theme_support('custom-background', array(
	'default-color' => 'FFF',
	'default-image' => get_template_directory_uri() . '/img/bg.jpg'
	));*/

	// Add Support for Custom Header - Uncomment below if you're going to use
	/*add_theme_support('custom-header', array(
	'default-image'			=> get_template_directory_uri() . '/img/headers/default.jpg',
	'header-text'			=> false,
	'default-text-color'		=> '000',
	'width'				=> 1000,
	'height'			=> 198,
	'random-default'		=> false,
	'wp-head-callback'		=> $wphead_cb,
	'admin-head-callback'		=> $adminhead_cb,
	'admin-preview-callback'	=> $adminpreview_cb
	));*/

	// Enables post and comment RSS feed links to head
	add_theme_support('automatic-feed-links');

	// Localisation Support
	load_theme_textdomain(THEME_DOMAIN, get_template_directory() . '/languages');
}

// Add Custom Scripts to wp_head
add_action('init', 'a_theme_core_header_scripts');
function a_theme_core_header_scripts()
{
	if ($GLOBALS['pagenow'] != 'wp-login.php' && !is_admin()) {

		//Load of the Critical/Important JS. Modernizr, Conditionizr, isMobile
		wp_register_script('vendors-scripts-head', get_template_directory_uri() . '/dist/js/vendors-head.min.js', array(), THEME_VERSION);
		wp_enqueue_script('vendors-scripts-head'); // Enqueue it!

		$vendorHead2 = get_stylesheet_directory() . '/dist/js/vendors-head-2.min.js';
		if ( is_file($vendorHead2) )
		{
			wp_register_script('vendors-scripts-head-2', get_template_directory_uri() . '/dist/js/vendors-head-2.min.js', array(), THEME_VERSION);
			wp_enqueue_script('vendors-scripts-head-2'); // Enqueue it!
		}

		//Load of the rest of the vendors/external libraries, Bootstrap.
		wp_register_script('vendors-scripts-footer', get_template_directory_uri() . '/dist/js/vendors-footer.min.js', array(), THEME_VERSION, true);
		wp_enqueue_script('vendors-scripts-footer'); // Enqueue it!

		wp_register_script('theme-scripts', get_template_directory_uri() . '/dist/js/theme.min.js', array(), THEME_VERSION, true);
		wp_enqueue_script('theme-scripts'); // Enqueue it!


		//Enqueue Styles.
		$vendorHeadStyle = get_stylesheet_directory() .  '/dist/css/vendors-head.min.css';
		if ( is_file($vendorHeadStyle) )
		{
			wp_enqueue_style( 'vendors-style-head', get_template_directory_uri() . '/dist/css/vendors-head.min.css',
			                  array(), THEME_VERSION );
		}

		wp_enqueue_style('theme-style', get_template_directory_uri() . '/dist/css/theme.min.css', array(), THEME_VERSION);

		//leave this 2 files at the end always.
		wp_enqueue_style('theme-style-override', get_template_directory_uri() . '/assets/style/_custom.css', array(), THEME_VERSION);
		wp_register_script('theme-script-override', get_template_directory_uri() . '/assets/scripts/_custom.js', array('jquery'), THEME_VERSION, true);
		wp_enqueue_script('theme-script-override');

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

add_action('init', 'a_theme_core_menus');
function a_theme_core_menus()
{
	register_nav_menus(
		array( // Using array to specify more menus if needed
		       'header-menu'    => __( 'Header Menu', THEME_DOMAIN ),   // Main Navigation
		       'sidebar-menu'   => __( 'Sidebar Menu', THEME_DOMAIN ),  // Sidebar Navigation
		       'footer-menu'    => __( 'Footer Menu', THEME_DOMAIN )    // Extra Navigation if needed (duplicate as many as you need!)
		)
	);
}


add_action( 'widgets_init', 'a_theme_core_widgets_init' );
/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function a_theme_core_widgets_init()
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
add_action( 'admin_enqueue_scripts', 'a_theme_core_header_scripts_admin' );
function a_theme_core_header_scripts_admin ()
{
	wp_enqueue_style('admin-theme-style', get_template_directory_uri() . '/assets/style/admin/_main.css', array(), THEME_VERSION);
	wp_register_script('admin-theme-script', get_template_directory_uri() . '/assets/scripts/admin/_main.js', array('jquery'), THEME_VERSION);

	$hide_extra_options = get_field("hide_extra_options", 'options');
	if ( !$hide_extra_options )
	{
		wp_register_script('admin-theme-script-override', get_template_directory_uri() . '/assets/scripts/admin/_main_override.js', array('jquery', 'admin-theme-script'), THEME_VERSION);
	}

	wp_enqueue_script('admin-theme-script');
	wp_enqueue_script('admin-theme-script-override');
}