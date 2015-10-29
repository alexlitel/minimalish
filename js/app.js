$(document).ready(function() {


    $('#menu-toggle').on('click touchstart', function(event) {
        event.preventDefault();
        if (!($(this).hasClass('is-rotated'))) {
            $(this).addClass('is-rotated');
            $('.header-box-link-list').removeClass('mobile-toggle-hide');
            $(this).attr('title', 'Click, tap, or press "Enter" to hide menu.');
            console.log("successful menu toggle on");

        } else {
            $('.header-box-link-list').addClass('mobile-toggle-hide');
            $(this).removeClass('is-rotated');
            $(this).attr('title', 'Click, tap, or press "Enter" to show menu.');
             console.log("successful menu toggle off");
        }

    });

    $('#search-toggle').on('click touchstart', function(event) {
        event.preventDefault();
        if (!($(this).hasClass('tumblr-icon-cancel'))) {
            $(this).addClass('tumblr-icon-cancel');
            $('.header-box-form').removeClass('mobile-toggle-hide');
            $(this).attr('title', 'Click, tap, or press "Enter" to hide search.');
             console.log("successful search toggle on");

        } else {
            $('.header-box-form').addClass('mobile-toggle-hide');
         	$(this).removeClass('tumblr-icon-cancel').addClass('tumblr-icon-search');
            $(this).attr('title', 'Click, tap, or press "Enter" to show search.');
             console.log("successful search toggle off");
        }

    });


//Resize photosets    
  function resizePhotosets(){
    var parentWidth = document.body.querySelector('.html_photoset').offsetWidth; 
    var photosets = document.body.querySelectorAll('iframe.photoset');

    for(var i = 0; i < photosets.length; ++i){
        var photoset = photosets[i];
        var iframeContents =  $('iframe.photoset').contents();
        photoset.width = parentWidth;
       iframeContents.find('.photoset_row').css('margin', '10px auto 0');
       iframeContents.find('body').css('box-sizing', 'border-box');
       iframeContents.find('div, a, img').css('box-sizing', 'inherit');
       iframeContents.find('img').css({ 'padding' : '8px', 'margin-top' : 'none'});
    }  


}

    if ($('iframe.photoset').length > 0) {
window.onload = resizePhotosets;
window.onresize = resizePhotosets;
} 




//Change photoset photos to indicate activity
$('iframe.photoset').contents().find('a').on('mouseenter focusin', function() {
    $(this).children('img').css('background-color', 'yellow');
}).on('focusout mouseleave', function() {
    $(this).children('img').css('background-color', 'transparent');
});

});