<?php

// Field definitions.

$bg_image = get_sub_field( 'background_image' );                // Image
$bg_overlay = get_sub_field( 'background_overlay' );            // Number
$use_video = get_sub_field( 'use_video' );                      // True / False
$video_url = get_sub_field( 'video_url' );                      // Url
$title = get_sub_field( 'title' );                              // Text
$subtitle = get_sub_field( 'subtitle' );                        // Text
$description = get_sub_field( 'description' );                  // Text Area
$text_placement = get_sub_field( 'text_content_placement' );    // Select
$text_content_class = get_sub_field( 'text_content_class' );    // Text
$display_buttons = get_sub_field( 'display_buttons' );          // True / False
$display_arrow = get_sub_field( 'display_jump_down_arrow' );    // True / False
$arrow_distance_menu = get_sub_field( 'distance_menu' );        // True / False
$arrow_distance_extra = get_sub_field( 'distance_extra' );      // Number
$arrow_animation = get_sub_field( 'arrow_animation' );          // Select
$arrow_icon_class = get_sub_field( 'icon_class' );              // Text
$arrow_icon_image = get_sub_field( 'arrow_icon' );              // Image

$extra_class = get_sub_field( 'extra_class' );                  // text

if ( $use_video ) $extra_class .= " video-bg-wrapper";
$extra_class .= " bg-wrapper ";

?>

<div class="full-height <?php echo $extra_class;?>" style="height: 100vh;">
	<div class='example'>
		<div id='padding-box' class="relative">
			<h1 class="testing-title"><?php echo $title; ?> - Padding</h1>
		</div>
		<div id='border-box'>
			<h1 class="testing-title"><?php echo $title; ?> - Border</h1>
		</div>
	</div>
</div>
