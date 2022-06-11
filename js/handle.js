"use strict";

var show_time = 200;
var resize_size = 600;
var slide_threshold = 100;

//positie bepaling link groups
function mlink_pos(objectMlink){
    var objectMlinkGroup = objectMlink.children('.Mlink-group');
    var linkHeight = objectMlink.height();
    var position = objectMlink.offset();
    var windowHeight = $(window).height();
	var linkGroupHeightEffective = objectMlinkGroup.height() - linkHeight;
	
    //set left, right top or bottom position
    var bottom = windowHeight - (position.top + linkHeight);

    if(bottom < linkGroupHeightEffective){
        objectMlinkGroup.css('bottom','0px');
    }else{
        objectMlinkGroup.css('top','0px');
    }
		
	console.log('bottom space: ' + bottom);
	console.log('Linkgroup height: ' + objectMlinkGroup.height());
	console.log('link height: ' + linkHeight);
	console.log('Effective overlap: ' + linkGroupHeightEffective);
	console.log('top position: ' + position.top);
	console.log('window height: ' + windowHeight);
	console.log('boolean: ' + bottom < linkGroupHeightEffective);
};

//Toggle functie voor het cat menuba
function CatMenuToggle(command){
	var position = $('.sidebar').offset();
	var catMenuPosLeft = position.left;
	var windowWidth = $(document).width();
	
	if(command == 'show' ){
		$('.sidebar').animate({"margin-left": 0}, show_time);
	}else if(command == 'hide'){
		$('.sidebar').animate({"margin-left": -windowWidth}, show_time);
	}else{
		if(catMenuPosLeft > slide_threshold){
			$('.sidebar').animate({"margin-left": 0}, show_time);
		}else if (catMenuPosLeft < -slide_threshold){
			$('.sidebar').animate({"margin-left": -windowWidth}, show_time);
		}
	}
	
}

//setting functions
	function noDistraction(obj){ //obj = slider class name
		var obje = $('.' + obj);
		var val = changeSliderValue(obje);
		setDistraction(val);
	}

	function hideObjects(obj){ //obj = slider class name
		var obje = $('.' + obj);
		var value = changeSliderValue(obje);
		setHide(value);
	}

	function pingCheck(obj){ //obj = slider class name
		var obje = $('.' + obj);
		var value = changeSliderValue(obje);
	}

$(document).ready(function(){
	
	//Searchfield functions
		$('.searchField').focus(function(){
			$('.focusBar').animate({"height":"2px"}, 200);
		});
		
		$('.searchField').focusout(function(){
			$('.focusBar').animate({"height":"0px"}, 200);
		});
	
	//linkgroup functions
		//linkgroup show
		$(document).on('click', '.Mlink', function() {
			mlink_pos($(this));
			
			if($(this).find('.Mlink-group').css('display') != 'block'){
				$(this).find('.Mlink-group').slideDown(show_time);
			}
		});

		//linkgroup hide
		$(document).on('mouseleave', '.Mlink', function() {
			$(this).find('.Mlink-group').slideUp(show_time);
		});
		$(document).on('click','.CloseBar', function(){
			$(this).parent().slideUp(show_time).removeAttr('style');
		});
		
		//when click on link group header hide the linkgroup
		$(document).on('click', '.Mlink-group > p', function() {
			$(this).parent().stop().animate({'opacity':'0'},show_time).hide(0);
		});

	//CatogryBar functions
		//settings show
		$(document).on('click', '.catBarSettingsButton', function() {
			$('.settings').toggle();
		});
			
		//change linkcatogory
		$(document).on('click', '.catOption', function(){
			$('.active').removeAttr('style').removeClass('active');
			$('.CategoryBarItemActive').removeClass('CategoryBarItemActive');
			$(this).addClass('CategoryBarItemActive');
			$('[data-type="'+ $(this).data('link') +'"]').addClass('active');
			
			if($(document).width() < resize_size){
				CatMenuToggle("hide");
			}
		});
		
		//show or hide menu dependend on slide
		$(document).mousedown(function(event){
			if($(document).width() < resize_size){
				var xPosStart = event.pageX;
				//console.log("down " + xPosStart);
							
				$(document).mouseup(function(event){
					var xPosEnd = event.pageX;
					//console.log("up " + xPosEnd);
					
					var dist = xPosStart - xPosEnd;
					//console.log(dist);
					
					if(dist > slide_threshold){
						CatMenuToggle("hide");
					}else if(dist < -slide_threshold){
						CatMenuToggle("show");
					}
					$(document).unbind('mouseup');
				});
			
			}
		});
			
	//Resize functions
		$(window).resize(function(){ 

			//formaat specifieke instellingen
			if($(document).width() < resize_size){
				$('.sidebar').css('margin-left','-100%');
			}else{
				$('.sidebar').css('margin-left','0px');
			}
			
			//algemene instellingen
			$('.settings').hide(0);
		});
		
});
	

