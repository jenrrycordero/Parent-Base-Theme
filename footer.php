<?php

?>

	</div><!-- #content-wrapper -->

<?php

if ( get_field("use_custom_footer_info", "options") ) :
	$footer = get_field("footer_style", "options");

	include ( theme_get_template_part("footer/$footer"));
else :
	// Default footer behavior.

	$footer_extra_class = "";

	$footer_copy = get_field('copyright', 'option');
	$siteBy_label = get_field('site_by_label', 'option');
	?>

	<?php if ( get_field('social_display_on_footer', 'option') ) : ?>

<?php endif; ?>

    <footer id="colophon" class="site-footer page-wrap text-center <?php echo $footer_extra_class?>" role="contentinfo">
        <div class="site-info">
			<?php do_shortcode($footer_copy); ?>
        </div>
        <div class="site-by">
			<?php render_site_by($siteBy_label); ?>
        </div>
    </footer><!-- #colophon -->
	<?php
	if ( get_field("display_back_to_top", "option") ) render_back_top();
endif;


the_field('custom_js_footer',       'option');
?>
<?php wp_footer(); ?>
</body>
</html>