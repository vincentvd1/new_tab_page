"use strict";

//infotap weergeven
$(document).on('click', '.info', function(){
	$('[data-popup="'+ $(this).data('info') +'"]').addClass('activePopup');
});
$(document).keyup(function(e) {
	 if (e.key === "Escape") { // escape key maps to keycode `27`
	   $('.popup').removeClass('activePopup');
	}
});

