(function( $ ){
    var waited = 0;

    var waitAgain = function( func ) {
        if( waited > 10 ) {
        // call the func with an error                                                                                                                              
            func( false );
        }
        else {
            try {
          // is the applet there?                                                                                                                                   
                if( document.jqueryHasJava ) {
                    // great we have it, test to see if we can script it                                                                                                    
                    if( 'yes' == document.jqueryHasJava.yes() ) {
                        waited = 11;
                        func( true );
                    }
                }
                else {
                    waited += 1;
                }
            }
            catch( err ) {
                waited += 1;
            }
          // try again                                                                                                                        
            if( waited < 10 ) {
              setTimeout( function() { waitAgain( func ); }, 1000 );
            }
        }
    };

    $.hasJava = function( func, path ) {
        // build a DIV offscreen and check for java                                                                                                                 
        if( !path ) {
            path = 'http://github.com/xrd/JqueryHasJava/raw/master/class/';
        }

        // Create the div                                                                                                                                           
        $('body').append($('<div style="position: absolute; top: -999px; left: -999px; width: 10px; height: 10px;">' +
                           '<applet mayscript="1" name="jqueryHasJava" codebase="' + path + '" code="hasJava.class" width="1" height="1"></applet></div>' ) );
        // wait for it to load up to ten seconds                                                                                                                    
        waitAgain( func );
    };
})( jQuery );
