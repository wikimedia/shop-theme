$( function () {

	// Toggle
	$( '.navbar-toggle' ).off( 'click' );
	$( '.navbar-toggle' ).on( 'click', function () {
		$( '#site-wrap' ).toggleClass( 'site-shift' );
      	$( '.menu-mask' ).css( 'display', 'block' );
      	$( '#off-navigation' ).toggleClass( 'off-navigation-show' );
	} );
  	
  	$( '.menu-mask' ).off( 'click' );
  	$( '.menu-mask' ).on( 'click touchstart', function() {
      	$( '#site-wrap' ).toggleClass( 'site-shift' );
      	$( '.menu-mask' ).css( 'display', 'none' );
      	$( '#off-navigation' ).toggleClass( 'off-navigation-show' );
    } );

	// Search
	$( '.search-input' ).on( 'focus', function () {
		$( '#menu' ).css( 'background-color', '#fff' );
	} );

	$( '.search-input' ).on( 'blur', function () {
		$( '#menu' ).css( 'background-color', 'rgba( 255, 255, 255, 0.75 )' );
	} );

	// Instagram Feed on Homepage
  	// only effective on Homepage
  	//if ($( '#instagram' ).length != 0)
	var shiftInstaFeed = function () {
		var imgs = $( '#instagram a');
		var heading_left = $( '#instagram_heading' ).position().left;
      	var panelWidth = 0;
		$( '#instagram' ).css( 'margin-left', 0 );

		imgs.each( function () {
			var img_left = $( this ).position().left;
			if ( img_left > heading_left ) {
				$( '#instagram' ).css( 'margin-left', ( heading_left - img_left ) + 'px' );
				return false;
			}
		} );
      	$( '#instagram a:last-child').addClass('last');
	};

	if ( $( '#instagram' ).length !== 0 ) {
		var feed = new Instafeed({
			get: 'user',
			userId: parseInt( $( '#instagram_user_id' ).val() ),
			accessToken: $( '#instagram_access_token' ).val(),
			target: 'instagram',
			resolution: 'standard_resolution',
			after: shiftInstaFeed
		});
		feed.run();
	}
	//}


	// Keep product thumbnails square
	var squareProductThumbnail = function () {
		$( '.product_main' ).height( $( '.product_main' ).width() );


		// Product Page
		var $thumbs = $( '.product_thumb' );
		//var width = ( $( '.product_main' ).width() - 60 ) / 3.0;
      	var width = ( $( '.product_main' ).width() - 40 ) / 3.0;
		
		$thumbs.each( function () {
			$( this )
				.height( width )
				.width( width );
		} );

		// Collection
		$( '.product_grid .product_image' ).each( function () {
			$( this ).height( $( this ).width() );
		} );
	}

	// Extend blue bar till left edge by adding an extra element
	var positionExtraBlue = function () {
		var $navBrand = $( '.navbar-brand' );
		var width = ( $navBrand.position().left  ) + 'px';
		$( '.extra-blue' ).remove();
		var $extraBlue = $( '<div>' )
			.addClass( 'extra-blue' )
			.css( 'width', width )
			.appendTo( $('#menu' ) );
	}

	// Make carousel the take up 3/5th of the page
	var updateHeaderSize = function () {
		var $item = $( '.carousel-inner > .item, .carousel-inner > .item a, .collection_header' );
		var height = $( window ).height() * ( 4.0 / 5.0 );
		$item.height( height );

		var paddingTop = height * ( 4.0 / 5.0 );
		paddingTop -= $( '.carousel-inner > .item .container:visible, .collection_header .container:visible' ).height();
		paddingTop += 'px';

		$( '.carousel-inner > .item .container, .collection_header .container' ).css( 'padding-top', paddingTop );
	}

	$( window ).resize( function () {
		positionExtraBlue();
		updateHeaderSize();
		squareProductThumbnail();
		shiftInstaFeed();
	} );

	positionExtraBlue();
	updateHeaderSize();
	squareProductThumbnail();


	// Product page image switcher
// 	$( '.product_thumb' ).on( 'mouseenter', function () {
// 		var img = $( this ).css( 'background-image' );
// 		var index = $( this ).attr( 'data-index' );
// 		$( '.product_main' ).css( 'background-image', img );
// 		$( '.product_main' ).attr( 'data-index', index );
// 	} );



// 	$( '.product_main' ).on( 'click', function () {

// 		var $this = $( this );
// 		var index = $this.attr( 'data-index' );
// 		var $next = $( '.product_thumb_container div[data-index=' + index + ']').next();
// 		if ( $next.length === 0 ) {
// 			$next = $( '.product_thumb_container div[data-index=1]');
// 		}


// 		$this.css( 'background-image', $next.css( 'background-image' ) );
// 		$this.attr( 'data-index', $next.attr( 'data-index' ) );


// 	} );
	$( '.product_thumb' ).on( 'mouseenter', function () {
		var img = $( this ).css( 'background-image' );
      	img = img.replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '');
		var index = $( this ).attr( 'data-index' );
		$( '.product_main img' ).attr( 'src', img );
		$( '.product_main img' ).attr( 'data-index', index );
	} );
  	



	$( '.product_main' ).on( 'click', function () {
      	var $img = $( '.product_main img' );
		var index = $img.attr( 'data-index' );
		var $next = $( '.product_thumb_container div[data-index=' + index + ']').next();
		if ( $next.length === 0 ) {
			$next = $( '.product_thumb_container div[data-index=1]');
		}
		
      	var img = $next.css( 'background-image' );
      	img = img.replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '');
      	console.log(img);

		$img.attr( 'src', img );
		$img.attr( 'data-index', $next.attr( 'data-index' ) );
	} );

	// Hide .vendor_container if there is no .vendor
	// https://office.wikimedia.org/wiki/Wikimedia_Shop/Theme/Vendor_Details
	if ( $( '.vendor' ).size() === 0 && $( '.vendor_container' ).size() === 1 ) {
		$('.vendor_container').hide();
	}
  	
  	// set min-height for #main when content is too short
  	var setMinHeight = function() {
        var mainHeight = $( '#main' ).height();
        var footerHeight = $( 'footer' ).height();
        var windowHeight = $( window ).height();
        var minHeight = 0;
        if ((mainHeight + footerHeight) < windowHeight) {
            minHeight = windowHeight - footerHeight;
            $( '#main' ).css( 'min-height', minHeight );
        }
    };
    $( document ).ready(function() {
      	setMinHeight();
    });
  	$( window ).resize( function() {
      	setMinHeight();
    });
  	
} );