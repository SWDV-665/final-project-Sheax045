( function( $ ) {
    'use strict';
    $( document ).on( 'click', '[data-role="simple-like-button"]', function() {
        var button = $( this );
        var post_id = button.attr( 'data-post-id' );
        var security = button.attr( 'data-nonce' );

        if ( post_id !== '' ) {
            $.ajax({
                type: 'POST',
                url: WPHaswellSimpleLike.ajaxurl,
                data: {
                    action: 'process_simple_like',
                    post_id: post_id,
                    nonce: security
                },
                beforeSend: function() {
                    button.addClass( 'loading' );
                },  
                success: function( response )
                {
                    console.log( response );
                    button.html( response.count );
                    if ( response.status === 'unliked' )
                    {
                        var like_text = WPHaswellSimpleLike.like;
                        button.prop( 'title', like_text );
                        button.removeClass( 'liked' );
                    }
                    else
                    {
                        var unlike_text = WPHaswellSimpleLike.unlike;
                        button.prop( 'title', unlike_text );
                        button.addClass( 'liked' );
                    }
                    button.removeClass( 'loading' );
                }
            });
            
        }
        return false;
    });
})( jQuery );