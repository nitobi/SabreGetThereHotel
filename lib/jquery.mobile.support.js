(function($, undefined ) {

$.extend( $.support, {
	orientation: "orientation" in window,
	touch: "ontouchend" in document,
	cssTransitions: "WebKitTransitionEvent" in window,
	pushState: !!history.pushState,
	eventCapture: ("addEventListener" in document) // This is a weak test. We may want to beef this up later.
});

})( jQuery );