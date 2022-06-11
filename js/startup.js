"use strict";

//draw clock
// function clock(){
    // var dt = new Date();
    // var hours = dt.getHours();
    // var minutes = dt.getMinutes();
    // minutes = ( minutes < 10 ? "0" : "" ) + minutes;
    // var timeString = hours + ":" + minutes;

    // $('.clock').find('p').html('');
    // $('.clock').find('p').append(timeString);
    // setTimeout(clock, 1000);
// }

//load visual settings
function setSettings(){
	if (localStorage.getItem("nodistract") === null) {
	  localStorage.setItem("nodistract", 0);
	}
	var distractionVal = localStorage.getItem('nodistract');
	setSlider($('.noDistractOption'), distractionVal)
	setDistraction(distractionVal);
	
	if (localStorage.getItem("hideObjects") === null) {
	  localStorage.setItem("hideObjects", 1);
	}
	var hideObjectsVal = localStorage.getItem('hideObjects');
	setSlider($('.hideObjects'), hideObjectsVal)
	setHide(hideObjectsVal);
	
	if (localStorage.getItem("pingCheck") === null) {
	  localStorage.setItem("pingCheck", 1);
	}
	var pingCheck = localStorage.getItem('pingCheck');
	setSlider($('.pingCheck'), pingCheck)
}

function setRandomImage() {
  var images = ["wallpaper1.jpg",
				"wallpaper2.jpg",
				"wallpaper3.jpg",
				"wallpaper4.jpg",
				"wallpaper6.jpg",
				"wallpaper7.jpg",
				"wallpaper8.jpg",
				"wallpaper9.jpg",
				"wallpaper10.jpg",
				"wallpaper11.jpg",
				"background1.gif",
				"background2.gif",
				"background5.gif",
				"wallpaper3.png",
				"wallpaper11.png",];

	var rand_img = images[Math.floor(Math.random( ) * images.length)];
	$('body').css("background","url(./img/wallpapers/" + rand_img + ")")
}
setSettings();
//setRandomImage();

//code on load
document.addEventListener('DOMContentLoaded', function() {
    //set focus to search field
	focus();
    
    //zoek script initailizeren;
    initSearch();	
	
	//check if connected to the internet
	if (checkconnection() == 0){
		set_message_banner('Not connected to the internet!', 'warning', 4000);
	}
	
});


