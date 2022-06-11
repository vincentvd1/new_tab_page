"use strict";

//globale variable
var fade_time = 250; //fade time objecten
var backupSearchEngine = 'qw';
var searchOptions = {
					sc: ['ssc', 'insertFirst','Swisscows', 'https://swisscows.com', '/web?query=%s'],
					sci: ['ssc', 'insertFirst','Swisscows img', 'https://swisscows.com', '/image?query=%s'],
                    ddg: ['ssc', 'insertFirst','DuckDuckGo', 'https://duckduckgo.com', '/?q=%s'], 
                    gg: ['ssc', 'insertFirst','Google', 'https://www.google.nl', '/search?q=%s'], 
                    ggm: ['ssc', 'insertFirst','Google maps', 'https://www.google.nl', '/maps/place/%s'],
                    ggs: ['ssc', 'insertFirst','Google Scholar', 'https://scholar.google.nl', '/scholar?hl=nl&as_sdt=0%2C5&q=%s'], 
					ggd: ['ssc', 'insertFirst','Google data', 'https://datasetsearch.research.google.com','/search?query=%s'],
                    mas: ['ssc', 'insertFirst','Ms scholar', 'https://academic.microsoft.com', '/search?q=%s&f=&orderBy=0&skip=0&take=10'],
					osm: ['ssc', 'insertFirst','Openstreetmap', 'https://www.openstreetmap.org', '/search?query=%s'], 
                    osmw: ['ssc', 'insertFirst','OSM wiki', 'https://lgms.nl/p/osm/cached-wiki/', '?search=%s&title=Special:Search&fulltext=Search'],
					osmwold: ['ssc', 'insertFirst','OSM wiki source', 'https://wiki.openstreetmap.org', '/w/index.php?search=%s&title=Special%3ASearch&profile=default&fulltext=1'],
					pi: ['ssc', 'insertFirst','Pinterest', 'https://nl.pinterest.com', '/search/pins/?q=%s'], 
                    qw: ['ssc', 'insertFirst','Qwant', 'https://www.qwant.com', '/?q=%s'], 
                    qwi: ['ssc', 'insertFirst','Qwant images', 'https://www.qwant.com', '/?q=%s&t=images'], 
                    qwm: ['ssc', 'insertFirst','Qwant maps', 'https://www.qwant.com', '/maps/?q=%s'], 
                    yt: ['ssc', 'insertFirst','Youtube', 'https://www.youtube.com', '/results?search_query=%s'],
					vf: ['ssc', 'insertFirst', 'Vivaldi Forums', 'https://forum.vivaldi.net/', 'search?term=%s&in=titles&matchWords=all&categories[]=185&categories[]=127&categories[]=128&categories[]=195&categories[]=196&categories[]=194&categories[]=129&categories[]=130&categories[]=131&categories[]=132&categories[]=133&sortBy=relevance&sortDirection=desc&showAs=topics'],
					wub: ['ssc', 'insertFirst', 'WUR bieb', 'https://wur.on.worldcat.org', '/search?queryString=%s' ],
					bl:['ssc','insertFirst', 'Blacklight', 'https://themarkup.org', '/blacklight?url=%s'],
					sp:['ssc','insertFirst', 'Startpage', 'https://www.startpage.com','/sp/search?q=%s'],
					bv:['ssc','insertFirst', 'Brave Search', 'https://search.brave.com', '/search?q=%s'],
					you:['ssc', 'insertFirst', 'You Search', 'https://you.com/', 'search?q=%s'],
					ipfslocal:['ssc', 'insertFirst', 'IPFS local node', 'http://localhost:8080/ipfs/%s', ''],
					ipfsweb:['ssc', 'insertFirst', 'IPFS web', 'https://ipfs.io/ipfs/%s', ''],
					searchFileType: ['so', 'insertAfter', 'Zoek op bestandstype','filetype: '],
					searchInTitle: ['so', 'insertAfter', 'Zoek in paginatitel', 'intitle:'],
					searchOnSite: ['so', 'insertAfter', 'Zoek op website', 'site:'],
					searchExact: ['so', 'replace', 'Zoek exacte tekst', '"%s"'],
					exludeKeyword: ['so', 'insertAfter', 'Zoekwoorden uitsluiten', '-']
                    }
					
//Global search option position
var soSearchTypePos = 0;
var soSearchCommandPos = 1;
var soSearchOptionNamePos = 2;

// Search shortcut positions
var soSearchEngineUrlPos = 3;

// Search options positions
var soSearchActionPos = 3;


var topLevelDomains = ['com', 'org','net','nl','nu','io','tv','me','eu','blog','gov', 'app','is','edu', 'xyz'];
var regexIP;
var regexSearchShortcuts; // /^/(shortcut|shortcut2|...) .+/g /
var regexSearchShortcutsWithoutSlash; // /^(shortcut|shortcut2|...) .+/g /
var regexTopLevelDomain; // /(\.ext1|\.ext2|...)/g /
var regexWebsites; //  /^(http:|https:)*.+(\.com|\.org|\.net|\.nl|\.nu|\.io|\.tv|\.me|\.eu|\.blog|\.gov)/.*/
var autoSuggestList = [];
var defaultSearchEngine;

// Read and set the default search engine
// Set qwant as default when the local storage does not exist
if (localStorage.getItem("searchEngine") === null) {
	defaultSearchEngine = backupSearchEngine;
}else{
	defaultSearchEngine = localStorage.getItem('searchEngine');
}

//initialize the seach options and convert to table and regexpattern
function initSearch(){
    var SSClistView = "";
	var SOlistView = "";
	var defaultSearchSelector = "";
    var regexKeyListQC = "";
    var regexKeyListTL = "";
    var searchOptionsListLength = Object.keys(searchOptions).length;
    var topLevelDomainListLength = Object.keys(topLevelDomains).length;
    var indexCounter = 1;
    
	// show the default search engine in the search field
	$('.searchEngineIndicator').find('p').text(searchOptions[defaultSearchEngine][soSearchOptionNamePos]);
	
    //prepare regex search shortcuts
	//prepare default search engine selector
    $.each( searchOptions, function( key, val ) {
        
		// construct the search option table for the advanced search menu 
		// and the regex string for the search shortcuts
		if(val[soSearchTypePos] == 'ssc'){ //if value is Search ShortCut
			SSClistView = SSClistView + '<div class="searchOption" data-type="' + val[soSearchTypePos] + '" data-option="'+ key +'" data-searchCommand="' + val[soSearchCommandPos] + '"><p class="searchOptionName">' + val[soSearchOptionNamePos] +'</p><p class="searchOptionAction">/'+ key +'</p></div>';
			defaultSearchSelector = defaultSearchSelector + "<option value="+ key +">" + val[soSearchOptionNamePos] + "</option>"
			
			// construct the regexpattern for the search script
			if(indexCounter != searchOptionsListLength){
				regexKeyListQC = regexKeyListQC + key + "|";        
			}else{
				regexKeyListQC = regexKeyListQC + key;                    
			}
		}else if(val[0] == 'so'){ // if value is Search Option
			SOlistView = SOlistView + '<div class="searchOption" data-type="' + val[soSearchTypePos] + '" data-option="'+ key +'" data-searchCommand="' + val[soSearchCommandPos] + '"><p class="searchOptionName">' + val[soSearchOptionNamePos] +'</p><p class="searchOptionAction">'+ val[soSearchActionPos] +'</p></div>';
		}
        
        // Loopcounter +1
        indexCounter += 1;
    });
    
    //prepare regex topleveldomains 
    indexCounter = 1;
    $.each( topLevelDomains, function( i ) {
        // construct the regexpattern for the search script
        if(indexCounter != topLevelDomainListLength){
            regexKeyListTL = regexKeyListTL + "\\." + topLevelDomains[i] + "|";        
        }else{
            regexKeyListTL = regexKeyListTL +  "\\." + topLevelDomains[i];                    
        }
        
        // Loopcounter +1
        indexCounter += 1;
    });
    
    // create regex patterns
    var regexSearchShortcutsPattern = "^/(" + regexKeyListQC + ") ";
	var regexSearchShortcutsPatternWithoutSlash = "^(" + regexKeyListQC + ") ";
    var regexTopLevelDomainPattern = "(" + regexKeyListTL + ")";
	var regexWebsitesPattern = "^(^http:\/\/|^https:\/\/)*(www)* {0}\\S*" + regexTopLevelDomainPattern + ".*";
	var regexIpPattern = "([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.{0,1}|[0-9A-Za-z]{0,4}:[0-9A-Za-z]{0,4}:[0-9A-Za-z]{0,4}:[0-9A-Za-z]{0,4}:[0-9A-Za-z]{0,4}:[0-9A-Za-z]{0,4}:[0-9A-Za-z]{0,4}:[0-9A-Za-z]{0,4})";
    
    regexSearchShortcuts = new RegExp(regexSearchShortcutsPattern, 'gi');
	regexSearchShortcutsWithoutSlash = new RegExp(regexSearchShortcutsPatternWithoutSlash, 'gi');
	regexWebsites = new RegExp(regexWebsitesPattern, 'i');
	regexIP = new RegExp(regexIpPattern);
	console.log("Regex for search shortcuts: " + regexSearchShortcuts);
	console.log("Regex for websites: " + regexWebsites);
    	
    // set html table search shortcuts
    $('.searchShortcuts').append(SSClistView + "</br>");
	$('.searchOptions').append(SOlistView);
	$('.defaultSearchSelector').append(defaultSearchSelector);
	$('.defaultSearchSelector').val(defaultSearchEngine);
	
	//preload search engine IP
	$('head').append('<link class="preLoadSearchDefaultEngine" rel="dns-prefetch" href="'+searchOptions[defaultSearchEngine][3]+'"/>');
}

//search script
function search(){
	var value = $('.Searchfield').val();
    var websiteSearch = $('.SearchFieldwebsite').val();
    var newURL;	

    if(value != ""){
		if(value.match(regexWebsites) && !value.match( /site:/gi) || value.match(regexIP) && !value.match( /site:/gi)){ //check if a webadress is entered
			console.log("website detected");
			if(value.match(/^(http:|https:)/i)){ 
				newURL = value;
			}else{
				newURL = "http://" + value;
			}
        }else if(value.match(regexSearchShortcuts)){ // check if a search shortcut is used
			console.log("search shortcut detected");
            var command = regexSearchShortcuts.exec(value);
            var searchType = command[1].toLowerCase();
            var rawURL = searchOptions[searchType][soSearchEngineUrlPos] + searchOptions[searchType][soSearchEngineUrlPos + 1];
            value = value.replace("/" + command[1] + " ", "");
            newURL = stringReplacement('%s', rawURL, value);
        }else{ // do a regular search on the default search engine
			console.log("Plain search query");
			console.log(defaultSearchEngine);
            var rawURL = searchOptions[defaultSearchEngine][soSearchEngineUrlPos] + searchOptions[defaultSearchEngine][soSearchEngineUrlPos + 1];
            newURL = stringReplacement('%s', rawURL, value);    
        }
		
        //logging
        console.log("URL: " + newURL);

        //execute URL
		stopHackernewsFetch()
        window.location = newURL;		
    }
}


// Change default search engine
function changeSearchEngine(){
	var selectedVal = $('.defaultSearchSelector').val();
	localStorage.setItem('searchEngine', selectedVal);
}



//event handlers
$(document).ready(function(){
    
	//live check if a specific search shortcut is beeing types
	//if yes, dns fetch that search engine
	//Show that search engine name near the search field
	$(document).on('keyup', ".Searchfield", function(event) { 
		var value = $('.Searchfield').val();
		var searchEngineIndicatorObject = $('.searchEngineIndicator').find('p');
		if(value.match(regexSearchShortcuts)){
			var command = regexSearchShortcuts.exec(value);
            var searchType = command[1].toLowerCase();
			if(!$('.preLoadSearch'+ searchType).length){
				$('.preLoadSearch').remove();
				$('head').append('<link class="preLoadSearch'+searchType+' preLoadSearch" rel="preconnect" href="'+searchOptions[searchType][soSearchEngineUrlPos]+'"/>');
				if(searchEngineIndicatorObject.text() != searchOptions[searchType][soSearchOptionNamePos]){
					searchEngineIndicatorObject.text(searchOptions[searchType][soSearchOptionNamePos]);
				}
			}
			slideObjectVisibility('searchOptionsSuggestion', 'SOSvisible', 'hide');
		}else if(value.match(regexSearchShortcutsWithoutSlash)){
			var command = regexSearchShortcutsWithoutSlash.exec(value);
            var searchType = command[1].toLowerCase();
			var val = searchOptions[searchType]
			$('.searchOptionsSuggestion').html("");
			$('.searchOptionsSuggestion').html('<div class="searchOption" data-type="' + val[soSearchTypePos] + '" data-option="'+ searchType +'" data-searchCommand="replacePart" data-replaceold="' + searchType + ' " data-replacenew="/' + searchType + ' "><p>Zoeksnelkoppeling: /' + searchType + '</p></div>');
			
			if(!$('.searchOptionsSuggestion').hasClass("SOSvisible")){
				slideObjectVisibility('searchOptionsSuggestion', 'SOSvisible', 'show');
			}
		}else{
			slideObjectVisibility('searchOptionsSuggestion', 'SOSvisible', 'hide');
			$('.preLoadSearch').remove();
			if(searchEngineIndicatorObject.text() != searchOptions[defaultSearchEngine][soSearchOptionNamePos]){
				searchEngineIndicatorObject.text(searchOptions[defaultSearchEngine][soSearchOptionNamePos]);
			}
		}        
	});
	
    //add search shortcut on click
    $(document).on('click', '.searchOption', function(){
		var searchOptionType = $(this).data('type'); 
		var searchOption = $(this).data('option'); 
		var searchOptionCommand = $(this).data("searchcommand");
        var FieldVal = $('.Searchfield').val();
		if(searchOptionCommand == "insertFirst"){
			if(searchOptionType == "ssc"){
				var valNew = "/" + searchOption + " " + FieldVal;
			}
		}else if(searchOptionCommand == "insertAfter"){
			if(searchOptionType == "so"){
				var valNew = FieldVal + " " + searchOptions[searchOption][soSearchActionPos];
			}
		}else if(searchOptionCommand == "replace"){
			if(searchOptionType == "so"){
				var valNew = stringReplacement('%s', searchOptions[searchOption][soSearchActionPos], FieldVal);
			}
		}else if(searchOptionCommand == "replacePart"){
			var oldString = $(this).data('replaceold');
			var newString = $(this).data('replacenew');
			var valNew = stringReplacement(oldString, FieldVal, newString );	
			console.log("new val: " + valNew);	
			console.log("old string: " + oldString);	
			console.log("new string: " + newString);				
		}
		
        $('.Searchfield').val(valNew);
        focus();
    });
    
    //hide/show search advanced search menu
	$('.searchEngineIndicator').click(function() {
		slideObjectVisibility('AdvancedSearch', 'asvisible');	
	});

	//preform search on enter press
	$(document).keypress(function(e) {
		if(e.which == 13) {
			search();
		}
	});

	//preform search on search button press
	$(document).on('click', '.SearchButton', function(){
		search();
	});

	//hide advanced search menu on click outside the menu
	$(document).on('click', document, function(event) { 
	  var target = $(event.target);
	  if(!target.closest('.AdvancedSearch, .SearchMenu, .searchEngineIndicator').length && $('.AdvancedSearch').is(":visible")) {
		slideObjectVisibility('AdvancedSearch', 'asvisible');
	  }        
	});
	
	//dns-prefetch on link hover
		//set dns-prefetch
		// $(document).on('mouseenter', '.href', function() {
			// var url = $(this).data('href');
			// $('head').append('<link class="preLoad" rel="dns-prefetch" href="'+url+'"/>');
			// // $('head').append('<link class="preLoad" rel="preconnect" href="' + url + '"/>');
		// });
		
		// //remove dns-prefetch
		// $(document).on('mouseleave', '.href', function() {
			// clearTimeout()
			// $('.preLoad').remove();
		// });
	
	//link click
	$(document).on('click', '.href', function() {
		var link = $(this).data('href');
		stopHackernewsFetch()
		window.location.href = link;
        
	});
	
});

