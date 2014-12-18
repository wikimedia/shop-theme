$( function () {

	// Keep product thumbnails square
	var squareProductThumbnail = function () {
		$( '.product_main' ).height( $( '.product_main' ).width() );


		// Product Page
		var $thumbs = $( '.product_thumb' );
		var width = ( $( '.product_main' ).width() - 60 ) / 3.0;

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
			.appendTo( document.body );
	}

	// Make carousel the take up 3/5th of the page
	var updateHeaderSize = function () {
		var $item = $( '.carousel-inner > .item, .carousel-inner > .item a, .collection_header' );
		var height = $( window ).height() * ( 4.0 / 5.0 );
		$item.height( height );

		var paddingTop = height * ( 4.0 / 5.0 );
		paddingTop -= $( '.carousel-inner > .item .container, .collection_header .container' ).height();
		paddingTop += 'px';

		$( '.carousel-inner > .item .container, .collection_header .container' ).css( 'padding-top', paddingTop );
	}

	$( window ).resize( function () {
		positionExtraBlue();
		updateHeaderSize();
		squareProductThumbnail();
	} );

	positionExtraBlue();
	updateHeaderSize();
	squareProductThumbnail();


	// Product page image switcher
	$( '.product_thumb' ).on( 'mouseenter', function () {
		var img = $( this ).css( 'background-image' );
		var index = $( this ).attr( 'data-index' );
		$( '.product_main' ).css( 'background-image', img );
		$( '.product_main' ).attr( 'data-index', index );
	} );



	$( '.product_main' ).on( 'click', function () {

		var $this = $( this );
		var index = $this.attr( 'data-index' );
		var $next = $( '.product_thumb_container div[data-index=' + index + ']').next();
		if ( $next.length === 0 ) {
			$next = $( '.product_thumb_container div[data-index=1]');
		}


		$this.css( 'background-image', $next.css( 'background-image' ) );
		$this.attr( 'data-index', $next.attr( 'data-index' ) );


	} );

} );
