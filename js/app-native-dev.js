//Tests and all that fun stuff

//Code for hamburger menu and aria stuff. Based on hamburger example by http://heydonworks.com/practical_aria_examples/
(function mobileToggle() {
    var menuToggle = document.getElementById('menu-toggle'),
        searchToggle = document.getElementById('search-toggle');
    //Toggle event for menu
    menuToggle.addEventListener("click", function(event) {
        event.preventDefault();
        //Toggle rotated class
        menuToggle.classList.toggle('is-rotated');
        document.getElementsByClassName('header-box-link-list')[0].classList.toggle('mobile-toggle-hide');
        if (menuToggle.classList.contains('is-rotated')) {
            menuToggle.title = "Click, tap, or press 'Enter' to hide menu.";
            menuToggle.setAttribute('aria-expanded', 'true');
            // console.log("successful menu toggle on"); // Test
        } else {
            menuToggle.title = "Click, tap, or press 'Enter' to show menu.";
            menuToggle.setAttribute('aria-expanded', 'false');
            // console.log("successful menu toggle off");` //Test
        }

    });
    //Toggle event for search
    searchToggle.addEventListener("click", function(event) {
        event.preventDefault();
        //Toggle cancel icon
        searchToggle.classList.toggle('tumblr-icon-cancel');
        document.getElementsByClassName('header-box-form')[0].classList.toggle('mobile-toggle-hide');
        if (searchToggle.classList.contains('tumblr-icon-cancel')) {
            searchToggle.title = "Click, tap, or press 'Enter' to hide search.";
            searchToggle.setAttribute('aria-expanded', 'true');
            // console.log("successful search toggle on"); //Test
        } else {
            searchToggle.title = "Click, tap, or press 'Enter' to show search.";
            searchToggle.setAttribute('aria-expanded', 'false');
            // console.log("successful search toggle off"); //Test
        }
    });
    //Refocus to hamburger icon after cycling through nav with tab
    document.getElementsByClassName('header-box-link-list-item')[document.getElementsByClassName('header-box-link-list-item').length - 1].addEventListener("keydown", function(event) {
        //Make sure event only runs if hamburger icon is visible, preventing obstacle to keyboard nav on higher resolution
        if (getComputedStyle(menuToggle).display === "block") {
          //Make sure user is not cycling backwards with shift+focus
            if (event.keyCode === 9 && !event.shiftKey) {
                event.preventDefault();
                menuToggle.focus();
                // console.log("successful aria hamburger return"); //Test
            }
        }

    });

    //Refocus to hamburger icon after cycling through search with tab
    document.getElementsByClassName('header-box-submit')[0].addEventListener("keydown", function(event) {
        //Make sure event only runs if search icon is visible, preventing obstacle to keyboard nav on higher resolutions
        if (getComputedStyle(searchToggle).display === "block") {
          //Make sure user is not cycling backwards with shift+focus
            if (event.keyCode === 9 && !event.shiftKey) {
                event.preventDefault();
                searchToggle.focus();
                // console.log("successful aria search return"); //Test
            }
        }
    });
}());




//Native photosets function. Based on Jonathan Moore/Style Hatch's photoset-grid. http://stylehatch.github.com/photoset-grid/
(function nativePhotos() {

    //For each function 
    var forEach = function(array, callback, scope) {
        for (var i = 0; i < array.length; i++) {
            callback.call(scope, i, array[i]); // passes back stuff we need
        }
    };

    //Create initial layout for photosets 
    function createLayout() {
        //Grabs all photosets on page
        var photosets = document.querySelectorAll('.photoset-post-photoset');
        forEach(photosets, function(j, photoset) {
            //Convert data-array attribute to array to generate rows
            var rows = photoset.getAttribute('data-layout').split('').map(Number),
                //Set initial index for image at start of row
                imageIndex = 0,
                //Converts photos in photoset to array
                photos = photoset.querySelectorAll('.photoset-post-photoset-cell');
            // console.log(photos); //Test


            // Creates divs for rows and wraps images in rows
            rows.forEach(function(row, jj) {
                // console.log("Row length is " + rows[jj]); //Test
                var rowStart = imageIndex,
                    rowEnd = imageIndex + row,
                    rowEl = document.createElement('div');
                // console.log("Row: " + jj + " Before:" + rowStart); //Test




                //Add class to create widths
                rowEl.classList.add('photoset-post-photoset-row', 'photoset-post-photoset-row-cols-' + row);

                //For loop to append image(s) to row
                for (var k = rowStart; k < rowEnd; k++) {
                    rowEl.appendChild(photos[k]);
                    
                }
                //append row to photoset
                photoset.appendChild(rowEl);
                // if (photoset.querySelectorAll('.photoset-post-photoset-row')[jj]) {
                imageIndex = rowEnd;
              
                // console.log("Row: " + jj + " After:" + imageIndex); //Test

            });
        });




    }



    //Size photorow heights based on shortest image if row has > 1 photo 
    function resizePhotoRows() {
        var photoRows = document.querySelectorAll('.photoset-post-photoset-row:not(.photoset-post-photoset-row-cols-1)');
        forEach(photoRows, function(j, value) {
                //set shortest image as initial image in row 
                var shortestImage = photoRows[j].querySelectorAll('img')[0],
                    photos = photoRows[j].querySelectorAll('img');
                //loop through photos to search for shortest image
                for (var i = 0; i < photos.length; i++) {
                    if (photos[i].height < shortestImage.height) {
                        // console.log(photos[i].height); //Test
                        shortestImage = photos[i];
                    }
                }

                // console.log(shortestImage); //Test
                photoRows[j].style.height = shortestImage.height + "px";
                // console.log(photoRows[j].style.height); //Test
        });
    }

  //Function for doing stuff when window loads;
    function init() {
        createLayout();
        setTimeout(200, resizePhotoRows());
    }

    //'Debounce' function to reduce # of events fired upon resize. By David Walsh http://davidwalsh.name/javascript-debounce-function
    function debounce(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this,
                args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    //Initial loading event
    window.onload = init();

    //Resize window event
    window.addEventListener('resize', debounce(function() {
        resizePhotoRows(document.querySelectorAll('.photoset-post-photoset-row'));
    }, 250));

}());
