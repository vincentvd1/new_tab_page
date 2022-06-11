var animate_time = 200;
var message_offset = 100;

//searchfield focus
    function focus(){
        $('.SearchField').focus();
    }

// function to hide or show an object by sliding down or up
// Based on a visibility class
function slideObjectVisibility(object, visibilityClass, action="none", time=animate_time){
    
	var ASSelector = $('.' + object);
    if(action == "show"){
		ASSelector.slideDown(time);
		ASSelector.addClass(visibilityClass);
	}else if (action == "hide"){
		ASSelector.slideUp(time);
		ASSelector.removeClass(visibilityClass);
	}else{
		if(ASSelector.hasClass(visibilityClass)){//hide part
			ASSelector.slideUp(time);
			ASSelector.removeClass(visibilityClass);
		}else{//show part  
			ASSelector.slideDown(time);
			ASSelector.addClass(visibilityClass);
		}
	}
}

function checkVariable(varName){
	var response;
	if (localStorage.getItem(varName) === null) {
		response = 0;
	}else{
		response = 1;
	}
	
	return response;
}

//Message banner functions
    //Message show
    function message_show(){
        $('.message_banner').animate({'top':'0px'},animate_time);
    };

    //Message hide
    function message_hide(){
        $('.message_banner').animate({'top':-message_offset},animate_time);
    };

    //message set
    function set_message_banner(text, error_type, duration=5000){
        var obj = $('.message_banner');
        var messageText;
        if( error_type == 'loading'){
            messageText = '<img src="img/symbols/loading.svg" style="height:12px;margin-right:7px;"/>' + text;
        }else if( error_type == "error"){
            messageText = '<img src="img/symbols/error.svg" style="height:16px;margin-right:7px;"/>' + text;
        }else if( error_type == "warning"){
            messageText = '<img src="img/symbols/warning.svg" style="height:16px;margin-right:7px;"/>' + text;
        }else if( error_type == "success"){
            messageText = '<img src="img/symbols/success.svg" style="height:16px;margin-right:7px;"/>' + text;
        }else{
            messageText = text;
        }
        obj.html('');
        obj.html('<p>' + messageText + '</p>');
        message_show();
        if(duration != 0){
            setTimeout(message_hide, duration)
        }
    }

//Check internet connection
function checkconnection() {
    var status = navigator.onLine;
    if (!status) {
		return 0
    }else{
		return 1
	}
}

//Apply settings
	//Apply distraction rule
	function setDistraction(value){
		if(value == 1){
			$('.distract').addClass('distractHide');
		}else{
			$('.distract').removeClass('distractHide');
		}
	}
	
	//Apply hide settings
	function setHide(value){
		if(value == 1){
			$('.hide').hide();
		}else{
			$('.hide').show();
		}
	}

//slider functions
	//animate slider
	function setSlider(obj, val){
		var sliderWidth = obj.width();
		var sliderButtonWidth = obj.find('.sliderButton').width();
		var slideTime = 200;
		
		if(val == 1){
			obj.find('.sliderButton').stop().animate({'margin-left': sliderWidth - sliderButtonWidth}, slideTime);
			obj.find('.sliderButton').addClass('sliderOn');
		}else{
			obj.find('.sliderButton').stop().animate({'margin-left': '0px'}, slideTime);
			obj.find('.sliderButton').removeClass('sliderOn');
		}
	}

	//determine and set new value
	function changeSliderValue(obj){
		var curVal = obj.data('value');
		var onVal = 1
		var offVal = 0
		var storageName = obj.data('storage');
		var newVal;
		
		if(curVal == onVal){
			newVal = offVal;
		}else if(curVal == offVal){
			newVal = onVal;
		}else{
			newVal = offVal;
		}
		
		obj.data('value', newVal);
		localStorage.setItem(storageName, newVal);
		
		setSlider(obj, newVal);
		return newVal
	}

//replace a value in a string
function stringReplacement(oldValue, string, newValue){
    return string.replace(oldValue, newValue);
}


