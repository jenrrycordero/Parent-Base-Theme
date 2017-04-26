<?php

/**
 * Footer 1: 2 Columns with social on top
 */


$footer_top_class = get_field('footer_1_stop_back_to_top_on_social_list', 'option') ? "attach-back-to-top" : "";
?>
    <div class="footer-top-block <?php echo $footer_top_class ?> bg-white">
		<?php render_social_list_from_options( "footer-social-wrapper", 'social-link footer-social-link-wrapper',
		                                       'footer-social-link' ); ?>
		<?php
		if ( get_field( 'footer_1_add_phone_to_the_social_list', 'option' ) ) :
			?>
            <div class="text-center container-text">
				<?php render_phone( "", "", "P. " ); ?>
            </div>
			<?php
		endif;
		?>
    </div>
<?php
$extra_space = get_field('footer_1_columns_space', 'option');
?>
	<style>
		.footer-columns {
			padding: <?php echo $extra_space; ?>px 0;
		}
		@media (max-width: 1200px) {
			.footer-columns {
				padding: <?php echo $extra_space*0.8; ?>px 0;
			}
		}
		@media (max-width: 991px) {
			.footer-columns {
				padding: <?php echo $extra_space*0.6; ?>px 0;
			}
		}
		@media (max-width: 767px) {
			.footer-columns {
				padding: <?php echo $extra_space*0.5; ?>px 0;
			}
		}
		@media (max-width: 480px) {
			.footer-columns {
				padding: <?php echo $extra_space*0.4; ?>px 0;
			}
		}
	</style>

<?php

//Left column
$link = get_field('footer_1_left_column_link', 'option');
$target_new_tab = get_field('footer_1_left_column_link_new_tab', 'option');
$link_name = get_field('footer_1_left_column_link_name', 'option');

$left_column_info = array(
	'img'           => get_field('footer_1_left_column_bg_image', 'option'),
	'overlay'       => 0.7, //: Number, 0-1 opacity of the overlay
	'overlay_color' => get_field('footer_1_left_column_overlay_color', 'option'), //: Number, 0-1 opacity of the overlay
	'title'         => _get_field_html(get_field('footer_1_left_column_title', 'option'), "h3", "", "footer-title title"), //Title
	'subtitle'      => "", //Subtitle
	'wrapper_id'    => "footer-left-column-wrapper", //ID of the whole container
	'wrapper_class' => "col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center footer-columns", //Class to add to the whole container
	'content-wrapper-class' => '',
	'jump_next'     => FALSE, //True|False to display an arrow for jump next block.
	'append_html'   => "<div class='columns-link-wrapper'>"._get_link($link, $link_name, $target_new_tab, "", "button button--aylen button--aylen-left button--border-thick button--inverted")."</div>"
);

// Right column.
$link = get_field('footer_1_right_column_link', 'option');
$target_new_tab = get_field('footer_1_right_column_link_new_tab', 'option');
$link_name = get_field('footer_1_right_column_link_name', 'option');

$right_column_info = array(
	'img'           => get_field('footer_1_right_column_bg_image', 'option'),
	'overlay'       => 0.7, //: Number, 0-1 opacity of the overlay
	'overlay_color' => get_field('footer_1_right_column_overlay_color', 'option'), //: Number, 0-1 opacity of the overlay
	'title'         => _get_field_html(get_field('footer_1_right_column_title', 'option'), "h3", "", "footer-title title"), //Title
	'subtitle'      => "", //Subtitle
	'wrapper_id'    => "footer-right-column-wrapper", //ID of the whole container
	'wrapper_class' => "col-lg-6 col-md-6 col-sm-6 col-xs-12 text-center footer-columns", //Class to add to the whole container
	'content-wrapper-class' => '',
	'jump_next'     => FALSE, //True|False to display an arrow for jump next block.
	'append_html'   => "<div class='columns-link-wrapper'>"._get_link($link, $link_name, $target_new_tab, "", "button button--aylen button--aylen-left button--border-thick button--inverted")."</div>"
);
?>
    <div class="container-fluid footer-bottom-block ">
        <div class="row">
			<?php
            render_img_block( $left_column_info );
			render_img_block( $right_column_info );
			?>
        </div>
    </div>
<?php

$footer_extra_class = "";

$footer_copy = get_field('f_copyright', 'option');
$siteBy_label = get_field('f_site_by_label', 'option');
?>
    <footer id="colophon" class="site-footer page-wrap text-center bg-white <?php echo $footer_extra_class ?>"
            role="contentinfo">
        <div class="site-info">
			<?php echo do_shortcode( $footer_copy ); ?>
        </div>
        <div class="site-by">
			<?php render_site_by( $siteBy_label,false ); ?>
        </div>
    </footer><!-- #colophon -->

<?php if ( get_field("f_display_back_to_top", "option") ) render_back_top();