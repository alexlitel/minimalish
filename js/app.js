$(document).ready(function() {

$('#menu-toggle').on('click', function() {
	$(this).toggleClass('is-rotated');
	$('.header-box-link-list').toggleClass('mobile-toggle-hide').slideDown();

	

	$(this).attr('title', 'Click, tap, or press "Enter" to hide menu.');
		console.log("success");
});



});

