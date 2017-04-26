<?php
/**
 * This file contains functions that (usually) are not used directly but through the renders_* functions instead.
 * They are defined so they can be access directly if needed.
 */

/**
 * Function to get the html structure for an image. This can be used to get just the information and build the html code
 * if needed. The function uses the following constant values: <b>THEME_IMG_LAZY_LOAD_CLASS</b>.
 *
 * @param String     $image_id  Image id from what we want to get the custom sources.
 * @param String     $size_sd   Image size name for the low quality image
 * @param String     $size_hd   Image size name for the high quality image
 * @param string     $size_retina Image size name for the retina quality image
 * @param string     $class     Custom class to add to the html object. By default its 'img-responsive'. The function already add the general class for the js code to work properly.
 * @param int        $force_dimensions Indicate if the IMG should have the dimensions forced to the img_hd element.
 * @param bool|FALSE $return_array By default its FALSE, if TRUE its going to return an Array with the 3 img src as index (img_sd, img_hd, img_retina)
 *
 * @return array|string The return type depends on the return_array parameter, if its an Array then this have the indexs: array(img_sd, img_hd, img_retina). For the Html
 *                      string this is ready to be output.
 */
function _get_image($image_id, $size_sd, $size_hd, $size_retina = 'url', $class = "img-responsive", $force_dimensions = 1, $return_array = FALSE)
{
	$html = '';

	// First we retrieve all the img src generated for each image size (sd, hd and retina).
	$t          = wp_get_attachment_image_src( $image_id, $size_sd );
	$img_src_sd = $t[0];

	$t          = wp_get_attachment_image_src( $image_id, $size_hd );
	$img_src_hd = $t[0];
	$img_w = $t[1];
	$img_h = $t[2];

	$img_src_retina = '';
	if ( $size_retina )
	{
		$t              = wp_get_attachment_image_src( $image_id, $size_retina );
		$img_src_retina = $t[0];
	}

	if ( $return_array )
	{
		//this is useful to build the html object 100% custom.
		return array(
			'img_sd' => $img_src_sd,
			'img_hd' => $img_src_hd,
			'img_retina' => $img_src_retina,
		);
	}
	$img_extra = "";
	if ( $force_dimensions )
	{
		$img_extra = " width='$img_w' height='$img_h' ";
	}

	// if it should return an HTML code then we process to build it,
	// to use the data attributes we are going to need for the js

	$obj_class = " $class " . THEME_IMG_LAZY_LOAD_CLASS;

	$html = "<img src='$img_src_sd' class='$obj_class' data-img-hd='$img_src_hd' data-img-retina='$img_src_retina' $img_extra/>";
	return $html;
}


/**
 * Function to get the html structure for a background image. This can be used to get just the information and build the
 * html code if needed. The function uses the following constant values: <b>THEME_IMG_BG_HTML_CLASS</b> y <b>THEME_IMG_BG_LAZY_LOAD_CLASS</b>.
 * If its set to use the html te parent class should have a position relative, since the code return an absolute element,
 * and any sibiling should have a z-index > than the one for the background element
 *
 * @param String     $image_id      Image id from what we want to get the custom sources.
 * @param String     $size_sd       Image size name for the low quality image
 * @param String     $size_hd       Image size name for the high quality image
 * @param string     $size_retina   Image size name for the retina quality image
 * @param string     $class         Custom class to add to the html object. By default its 'bg-element-full'.
 *                                  The function already add the general class for the js code to work properly.
 * @param bool|FALSE $return_array  By default its FALSE, if TRUE its going to return an Array with the 3 img src as index (img_sd, img_hd, img_retina)
 *
 * @return array|string The return type depends on the return_array parameter, if its an Array then this have the indexs: array(img_sd, img_hd, img_retina). For the Html
 *                      string this is ready to be output. Important note is that the object require some CSS rules to work properly.
 *
 * @see wp_get_attachment_image_src
 */
function _get_image_as_background($image_id, $size_sd, $size_hd, $size_retina = 'url', $class = "bg-element-full", $return_array = FALSE)
{
	$html = '';

	// First we retrieve all the img src generated for each image size (sd, hd and retina).
	$t          = wp_get_attachment_image_src( $image_id, $size_sd );
	$img_src_sd = $t[0];

	$t          = wp_get_attachment_image_src( $image_id, $size_hd );
	$img_src_hd = $t[0];

	$img_src_retina = '';
	if ( $size_retina )
	{
		$t              = wp_get_attachment_image_src( $image_id, $size_retina );
		$img_src_retina = $t[0];
	}

	if ( $return_array )
	{
		//this is useful to build the html object 100% custom.
		return array(
			'img_sd'     => $img_src_sd,
			'img_hd'     => $img_src_hd,
			'img_retina' => $img_src_retina,
		);
	}


	// if it should return an HTML code then we process to build it,
	// to use the data attributes we are going to need for the js

	$obj_class = THEME_IMG_BG_HTML_CLASS . " $class " . THEME_IMG_BG_LAZY_LOAD_CLASS;

	$html = "<div class='$obj_class' style=\"background-image: url('$img_src_sd');\" data-img-hd='$img_src_hd' data-img-retina='$img_src_retina'></div>";
	return $html;
}


/**
 * Function to get the ordered array of social links from the options page. This function work against the DEFAULT structure and order
 * of the options page.
 *
 * @return array with the information for the link. Each index is an array as follow: array( url=>'', img=>'', img_hover=>'').
 */
function _get_social_list_from_options()
{
	$facebook_link   = get_field( 'facebook', 'option' );
	$facebook_order  = get_field( 'facebook_order', 'option' );
	$twitter_link    = get_field( 'twitter', 'option' );
	$twitter_order   = get_field( 'twitter_order', 'option' );
	$instagram_link  = get_field( 'instagram', 'option' );
	$instagram_order = get_field( 'instagram_order', 'option' );
	$youtube_link    = get_field( 'youtube', 'option' );
	$youtube_order   = get_field( 'youtube_order', 'option' );
	$spotify_link    = get_field( 'spotify', 'option' );
	$spotify_order   = get_field( 'spotify_order', 'option' );
	$google_link     = get_field( 'google', 'option' );
	$google_order    = get_field( 'google_order', 'option' );

	$pinterest_link     = get_field( 'pinterest', 'option' );
	$pinterest_order    = get_field( 'pinterest_order', 'option' );
	$vimeo_link     = get_field( 'vimeo', 'option' );
	$vimeo_order    = get_field( 'vimeo_order', 'option' );
	$snapchat_link     = get_field( 'snapchat', 'option' );
	$snapchat_order    = get_field( 'snapchat_order', 'option' );


	//now we need to build the array in the proper order.
	$social_array = array();


	if ( $facebook_link )
		$social_array[ $facebook_order+1 ] = array(
			"url" => $facebook_link,
			"class" => "fa-facebook-f",
			"img" => "",
			"img_hover" => ""
		);

	if ( $twitter_link )
		$social_array[ $twitter_order+1 ] =  array(
			"url" => $twitter_link,
			"class" => "fa-twitter",
			"img" => "",
			"img_hover" => ""
		);

	if ( $instagram_link )
		$social_array[ $instagram_order+1 ] =  array(
			"url" => $instagram_link,
			"class" => "fa-instagram",
			"img" => "",
			"img_hover" => ""
		);

	if ( $youtube_link )
		$social_array[ $youtube_order+1 ] =  array(
			"url" => $youtube_link,
			"class" => "fa-youtube-play",
			"img" => "",
			"img_hover" => ""
		);

	if ( $spotify_link )
		$social_array[ $spotify_order+1 ] =  array(
			"url" => $spotify_link,
			"class" => "fa-spotify",
			"img" => "",
			"img_hover" => ""
		);

	if ( $google_link )
		$social_array[ $google_order+1 ] =  array(
			"url" => $google_link,
			"class" => "fa-google-plus",
			"img" => "",
			"img_hover" => ""
		);


	if ( $pinterest_link )
		$social_array[ $pinterest_order+1 ] =  array(
			"url" => $pinterest_link,
			"class" => "fa-pinterest-p",
			"img" => "",
			"img_hover" => ""
		);

	if ( $vimeo_link )
		$social_array[ $vimeo_order+1 ] =  array(
			"url" => $vimeo_link,
			"class" => "fa-vimeo",
			"img" => "",
			"img_hover" => ""
		);
	if ( $snapchat_link )
		$social_array[ $snapchat_order+1 ] =  array(
			"url" => $snapchat_link,
			"class" => "fa-snapchat-ghost",
			"img" => "",
			"img_hover" => ""
		);


	ksort($social_array);
	return $social_array;
}



/**
 * @param string $content content to strip. Will be the post->content
 * @param int    $charlength number of char to return.
 * @param string $append String to append at the end.
 *
 * @return string
 */
function _get_excerpt($content, $charlength = 140, $append = "")
{

	$html = $content;

	if ( mb_strlen( $content ) > $charlength )
	{
		$subex = mb_substr( $content, 0, $charlength - 5 );
		$exwords = explode( ' ', $subex );
		$excut = - ( mb_strlen( $exwords[ count( $exwords ) - 1 ] ) );

		$html = $excut < 0 ? mb_substr( $subex, 0, $excut ) : $subex . $append;
	}

	return $html;
}


/**
 * Function to get the HTML structure for a simple element.
 *
 * @param string $content Content to display inside the html structure
 * @param string $tag HTML tag to wrap the content in
 * @param string $id ID to use on the element. Default empty (wont be displayed)
 * @param string $class Classes to use on the element. Default empty.
 * @param array $data Any data attribute to add to the object. It should be an associative array.
 *                    the KEY (no include data nor any space will be used as data-key
 *                    the value of each index will be the value of the data.
 *                    If you want to pass an object as value for the data-attribute please use json_encode before calling this function.
 *
 * @return string Return the HTML ready to be used. This WONT render anything.
 */
function _get_field_html($content, $tag, $id = "", $class = "", $data = array() )
{
	$idAttr = "";
	if ( $id ) $idAttr = "id='$id'";

	$data_attr_string = _get_data_attr($data);

	return "<$tag $idAttr class='$class' $data_attr_string>$content</$tag>";
}

/**
 * Transform an array of objects into an string to be used as a sequence of data attributes.
 *
 * @param array $data Any data attribute to add to the object. It should be an associative array.
 *                    the KEY (no include data nor any space will be used as data-key
 *                    the value of each index will be the value of the data.
 *                    If you want to pass an object as value for the data-attribute please use json_encode before calling this function.
 *
 * @return string return an string on the right format to be included on any html tag (data-key='value' data-key2='value2' ...)
 */
function _get_data_attr($data)
{
	$data_attr_string = "";

	if ( !is_array($data) ) return $data_attr_string;


	foreach ( $data as $key => $value )
	{
		//TODO. validation?
		$dataAttrString.= "data-$key='$value' ";
	}

	return $data_attr_string;
}


/**
 * Return an HTML structure for links, built from the $links param.
 *
 * @param array  $links Array where each index is another array with the following indexes:<br/>
 *                      - link : url. You can use # <br/>
 *                      - target : attr target (_blank or empty). <br/>
 *                      - name : name to display on the link. <br/>
 *                      - title : Optional. If empty will be the name. <br/>
 *                      - id : Optional. Id of each link. <br/>
 *                      - class : Optional. Extra class to each link. <br/>
 *                      - attr : Optional. An array of any data attr to add to each link
 * @param string $tag Optional. Default is ul. Determinate the structure to be returned
 * @param boolean $useButtons . Optional. Default is true. Indicate if the links should be have btn class.
 *                              Any btn-primary or so should be provided.
 * @param string $wrapper_class Optional. Class to add to the wrapper.
 * @param string $element_class Optional. Class to add to each link wrapper element.
 *
 * @return string html with the structure of the links.
 */
function _get_link_list($links, $tag="ul", $useButtons=true, $wrapper_class = "", $element_class = "")
{
	if ( !is_array($links) ) return '';

	$html = "";

	$default = array(
		'link'     => "",
		'target'   => "",
		'name'     => "",
		'title'    => "",
		'id'       => "",
		'class'    => "",
		'attr'     => array()
	);

	$default_classes = $useButtons ? "link-list-element btn" : "link-list-element";

	$html = "<$tag class='link-list $wrapper_class'>";

	$tag_e = $tag === "ul" ? "li" : "div";

	foreach ( $links as $link )
	{
		$info = array_merge($default, $link);
		$url = $info['link'];

		if ( !$url ) continue;

		$info['class'] = $default_classes . " " . $info['class'] ;

		$attr_id = $info['id'] ? "id={$info['id']}" : "";
		$attr_data = _get_data_attr($info['attr']);

		$html .= "<$tag_e class='$element_class'>";
		$html .= _get_link($url, $info['name'], $info['target'] === "_blank", $info['id'], $info['class'], $info['title'], $attr_data);
//		$html .= "<a $attr_id class='{$info['class']}' href='$url' target='{$info['target']}' title='{$info['title']}' $attr_data>{$info['name']}</a>";
		$html .= "</$tag_e>";
	}

	$html .= "</$tag>";

	return $html;
}


/**
 * function to get an standard link element.
 *
 * @param string $link
 * @param string $name
 * @param bool   $target_blank
 * @param string $id
 * @param string $class
 * @param string $title
 * @param string $attr_data
 *
 * @return string
 */
function _get_link($link, $name, $target_blank = false, $id = "", $class = "", $title = "", $attr_data = "")
{

	$attr_id = $id ? "id='$id'" : "";
	$target = $target_blank ? "target='_blank'" : "";

	return "<a $attr_id class='$class' href='$link' $target title='$title' $attr_data>$name</a>";
}