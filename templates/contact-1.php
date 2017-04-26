<?php
/**
 * Template Name: Contact 1
 */


get_header();

$slidesContact = new Slides();

?>

<style>
	.slide .wrap {
		padding: initial;
	}
	.slide .content {
		max-width: 100%;
	}
</style>


<div class="">

</div>
<?php
//Slide #03
$slidesContact->render("03");


// Slide #65
$slidesContact->render("65");

// Slide #55
$slidesContact->render("55");


get_footer();