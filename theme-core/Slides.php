<?php

class Slides
{
	private $prefix;
	private $allowedSlides;

	public function __construct($prefix = "")
	{
		$this->prefix = $prefix;

		$this->allowedSlides = array(
			"03" => "block",
			"65" => "block",

			"55" => "form"
		);
	}


	public function render($slide, $postId = "", $isSubfield = false, $overridePrefix = "")
	{
		$prefix = $overridePrefix ?: $this->prefix;

		if ( !isset($this->allowedSlides[ $slide ] ) ) return "";


		if ( method_exists($this, "_$slide") )
			call_user_func_array( array( $this, "_$slide" ), array($postId, $isSubfield, $prefix) );
	}
	// Render specific functions.




	// -------------         BLOCKS.


	private function _03($postId, $isSubfield, $prefix)
	{
		//First you need to initialize all the variables that the PHP is going to use.\
		include "slides/slide-03.php";
	}

	private function _65($postId, $isSubfield, $prefix)
	{
		//First you need to initialize all the variables that the PHP is going to use.

		include "slides/slide-65.php";
	}




	// -------------         FORMS.

	private function _55($postId, $isSubfield, $prefix)
	{

		//First you need to initialize all the variables that the PHP is going to use.

		include "slides/slide-55.php";
	}
}