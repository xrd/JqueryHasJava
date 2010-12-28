(function( $ ){
    var waited = 0;

    function waitAgain( func ) {
        if( waited < 10 ) {
            // is the applet there?
            if( edocument.jqueryHasJava ) {
                func( true );
            }
            else {
                waited += 1;
                setTimeout( function() { waitAgain( func ); }, 1000 );
            }
        }
        else {
            // call the func with an error
            func( false );
        }

    }

    $.fn.hasJava = function( func, path ) {
        // build a DIV offscreen and check for java
        if( !path ) {
            // use the path with the .class
            path = 'https://github.com/xrd/JqueryHasJava/raw/master/class/hasJava.class';
        }

        // Create the div
        $('<div style="position: absolute; top: -999px; left: -999px; width: 10px; height: 10px;">' +
          '<applet mayscript="1" name="jqueryHasJava" code="' + path + '" width="1" height="1"></applet></div>' );

        // wait for it to load up to ten seconds
        setTimeout( waitAgain, 1000 );
    };
})( jQuery );
