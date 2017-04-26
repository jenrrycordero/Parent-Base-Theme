<?php
if( function_exists('acf_add_options_page') )
{
	$theme_settings_slug = "theme-general-settings";

	acf_add_options_page(
		array(
			'page_title' => 'Theme General Settings',
			'menu_title' => 'Theme Settings',
			'menu_slug'  => $theme_settings_slug,
			'capability' => 'edit_posts',
			'redirect'   => FALSE,
			'icon_url'   => 'dashicons-admin-settings'
		) );

	acf_add_options_sub_page(
		array(
			'page_title' => 'Theme - Menus',
			'menu_title' => 'Menu',
			'menu_slug'  => $theme_settings_slug . '-menu',
			'capability' => 'edit_posts',
			'redirect'   => FALSE,
			'icon_url'   => 'dashicons-admin-settings',
			'parent_slug' 	=> $theme_settings_slug,
		) );

	acf_add_options_sub_page(
		array(
			'page_title' => 'Theme - Footer',
			'menu_title' => 'Footer',
			'menu_slug'  => $theme_settings_slug . '-footer',
			'capability' => 'edit_posts',
			'redirect'   => FALSE,
			'icon_url'   => 'dashicons-admin-settings',
			'parent_slug' 	=> $theme_settings_slug,
		) );

}