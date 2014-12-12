$( function () {

	// Keep product thumbnails square
	var squareProductThumbnail = function () {
		var $thumbs = $( '.product_thumb, .product_grid .product_image' );
		$thumbs.each( function () {
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

		var paddingTop = height - 140;
		paddingTop = ( paddingTop < 0 ) ? 0 : paddingTop;
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

} );
