<?php

/**
 * 1. Definitions.
 * 2. General includes.
 * 3. General filters.
 */

//   1. General definitions.
define("THEME_DOMAIN", "razz-base");    //
define("THEME_VERSION", "0.1");


#### 2. General Includes.
/***   Theme Core Files.   ***/
include_once get_stylesheet_directory() . "/theme-core/functions-core.php";         // Theme Core Definitions.
include_once get_stylesheet_directory() . "/theme-core/ThemeClass.php";
include_once get_stylesheet_directory() . "/theme-core/helpers.php";
include_once get_stylesheet_directory() . "/theme-core/actions.php";
include_once get_stylesheet_directory() . "/theme-core/filters.php";
include_once get_stylesheet_directory() . "/theme-core/renders.php";
include_once get_stylesheet_directory() . "/theme-core/functions-theme.php";
include_once get_stylesheet_directory() . "/theme-core/Slides.php";

/***   Theme Core Files. Libraries   ***/
include_once theme_get_core_directory() . "/lib/sass_watcher/sass_watcher.php";


/***   ACF.   ***/
// 1. customize ACF path
add_filter('acf/settings/path', 'my_acf_settings_path');
function my_acf_settings_path( $path )
{
	// return update path
	return get_stylesheet_directory() . '/acf/';
}


// 2. customize ACF dir
add_filter('acf/settings/dir', 'my_acf_settings_dir');
function my_acf_settings_dir( $dir )
{
	// return update path
	return get_stylesheet_directory_uri() . '/acf/';
}

// 3. Hide ACF field group menu item
//add_filter('acf/settings/show_admin', '__return_false');

// 4. Include ACF
include_once( get_stylesheet_directory() . '/acf/acf.php' );


// 4.1 Include ACF Extensions
include_once( get_stylesheet_directory() . '/acf-location-nav-menu/acf-location-nav-menu.php' );

// 5. Include any ACF field definitions (folder acf-fields).
include_all_from_folder( get_stylesheet_directory() . '/acf-fields');


// CPT.g
theme_get_cpt("example");
include_once( get_stylesheet_directory() . '/cpt/example/Example.php' );


// Shortcodes definitions.
include_all_from_folder( get_stylesheet_directory() . '/code-shortcodes');
include_once( get_stylesheet_directory() . '/theme-shortcodes.php');

// Ajax definitions.
include_all_from_folder( get_stylesheet_directory() . '/code-ajax');
include_once( get_stylesheet_directory() . '/theme-ajax.php');

// Render functions definitions.
include_all_from_folder( get_stylesheet_directory() . '/code-renders');

//
//// 5. Include any ACF field definitions (folder acf-fields).
//foreach (glob( get_stylesheet_directory() . '/acf-fields/*\.php') as $filename)
//	include_once $filename;
//
//
//// CPT.g
//theme_get_cpt("example");
//include_once( get_stylesheet_directory() . '/cpt/example/Example.php' );
//
//
//// Shortcodes definitions.
//foreach (glob( get_stylesheet_directory() . '/code-shortcodes/*\.php') as $filename)
//	include_once $filename;
//include_once( get_stylesheet_directory() . '/theme-shortcodes.php');
//
//// Ajax definitions.
//foreach (glob( get_stylesheet_directory() . '/code-ajax/*\.php') as $filename)
//	include_once $filename;
//include_once( get_stylesheet_directory() . '/theme-ajax.php');



include get_stylesheet_directory() . '/theme-helpers.php';
include get_stylesheet_directory() . '/theme-renders-helpers.php';
include get_stylesheet_directory() . '/theme-renders.php';
include get_stylesheet_directory() . '/theme-actions.php';
include get_stylesheet_directory() . '/theme-filters.php';
