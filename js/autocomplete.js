var sites = [
	'outlook.com', 
	'nu.nl', 
	'openstreetmap.org', 
	'onedrive.com', 
	'protonmail.com',
	'deepl.com',
	'linguee.com',
	'netflix.com',
	'youtube.com',
	'coinbase.com',
	'abnamro.nl',
	'paypal.com',
	'coolblue.nl',
	'bol.com',
	'pinterest.com',
	'linkedin.com',
	'tumblr.com',
	'mewe.com',
	'1limburg.nl',
	'rtlnieuws.nl',
	'theverge.com',
	'news360.com',
	'curiosity.com',
	'ziggogo.tv',
	'play.google.com',
	'pdok.nl',
	'Stackoverflow.com'
];

//Autocomplete
function matchPeople(input) {
  var reg = new RegExp(input.split('').join('\\w*').replace(/\W/, ""), 'i');
  return sites.filter(function(sites) {
    if (sites.match(reg)) {
      return sites;
    }
  });
}

function changeInput(val) {
    var autoCompleteResult = matchPeople(val);
    var Autocom = $('.Autocomplete');
    var fade_time = 200;
    Autocom.html("");
    if (autoCompleteResult.length > 0 && val.length > 2 && Autocom.not('.visible')){
        Autocom.slideDown(fade_time);
        Autocom.addClass('visible');
        
        jQuery.each( autoCompleteResult, function( i, val ) {
			if(i < 6){
				Autocom.append( '<p class="AutocompleteItem">' + val + '</p>');
			}else{
				return false;
			}
          
        });
    }else{
        Autocom.slideUp(fade_time);
        Autocom.removeClass('visible');
    }
}

$(document).on('click', '.AutocompleteItem', function(){
    var site = $(this).text();
    $('.SearchField').val(site); 
});

var li = $('p.AutocompleteItem');
var liSelected;
$(document).keydown(function(e) {	
    switch(e.which) {
        case 38: // up
			if($('.Autocomplete').hasClass('visible')){
				if(liSelected){
					liSelected.removeClass('ActiveAutocomplete');
					next = liSelected.prev();
					if(next.length > 0){
						liSelected = next.addClass('ActiveAutocomplete');
					}else{
						liSelected = li.last().addClass('ActiveAutocomplete');
					}
				}else{
					liSelected = li.last().addClass('ActiveAutocomplete');
				}
			}
        break;

        case 40: // down
			if($('.Autocomplete').hasClass('visible')){
				if(liSelected){
					liSelected.removeClass('ActiveAutocomplete');
					next = liSelected.next();
					if(next.length > 0){
						liSelected = next.addClass('ActiveAutocomplete');
					}else{
						liSelected = li.eq(0).addClass('ActiveAutocomplete');
					}
				}else{
					liSelected = li.eq(0).addClass('ActiveAutocomplete');
				}
			}
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});


$(window).keydown(function(e){
    if(e.which === 40 && $('.Autocomplete').hasClass('visible')){
        if(liSelected){
            liSelected.removeClass('ActiveAutocomplete');
            next = liSelected.next();
            if(next.length > 0){
                liSelected = next.addClass('ActiveAutocomplete');
            }else{
                liSelected = li.eq(0).addClass('ActiveAutocomplete');
            }
        }else{
            liSelected = li.eq(0).addClass('ActiveAutocomplete');
        }
    }else if(e.which === 38 && $('.Autocomplete').hasClass('visible')){
        if(liSelected){
            liSelected.removeClass('ActiveAutocomplete');
            next = liSelected.prev();
            if(next.length > 0){
                liSelected = next.addClass('ActiveAutocomplete');
            }else{
                liSelected = li.last().addClass('ActiveAutocomplete');
            }
        }else{
            liSelected = li.last().addClass('ActiveAutocomplete');
        }
    }
});