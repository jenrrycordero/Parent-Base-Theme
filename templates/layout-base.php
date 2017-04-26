<?php
/**
 * Template Name: Layout base
 */

get_header();
?>

<?php
if( get_field('layouts') ):
	$layoutIndex = 0;
	while ( has_sub_field('layouts') ) :


		$layoutIndex++;
		include theme_get_template_part("layout/" . get_row_layout(), "layout/404");

	endwhile;
endif;
?>

<?php
get_footer();
