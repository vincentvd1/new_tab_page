// https://hacker-news.firebaseio.com/v0/topstories.json
// https://hacker-news.firebaseio.com/v0/item/24329900.json?print=pretty
$(document).ready(function() {
	var newStoryCount = 15;
	
	var pingCheckTime = localStorage.getItem('newsCheckTime');
	var time = new Date();
	var currTime = time.getTime();
	var timeDiff = currTime - pingCheckTime
	var timeDiffThreshold = 1000 * 120;
	
	if (timeDiff > timeDiffThreshold){		
		console.log("Fresh news feed");
		var fetchHackersNews = $.getJSON( 'https://hacker-news.firebaseio.com/v0/topstories.json', function( data ) {
			console.log('Hackers news successfully contacted');
			var stories = [];
			
			var i;
			for (i = 0; i < newStoryCount; ++i) {
				stories.push( data[i]);
			}
			
			var counter = 0; 
			var storiesAsHTML = '';
			var newsItemHtml;
			while(counter < newStoryCount){
				var storyNumber = stories[counter];
				$.getJSON( 'https://hacker-news.firebaseio.com/v0/item/' + storyNumber + '.json', function( data ) {
					url = data.url;
					newsTitle = data.title
					hnItem = 'https://news.ycombinator.com/item?id=' + data.id;
					
					if(url == "undefined"){
						console.log('empty url' + url)
						url = hnItem;
					}
					
					newsItemHtml = '<div class="newsFeedItem widgetListItem" ><div class="newsFeedItemArticle href" data-href="' + url + '">' + newsTitle + '</div><img class="widgetItemHoverAction newsFeedItemSource href" data-href="'+ hnItem + '" src="./img/symbols/External_link.png"/></div>';
					$('.newsFeedList').append(newsItemHtml);
					
					storiesAsHTML = storiesAsHTML + newsItemHtml;
					localStorage.setItem('newsFeed', storiesAsHTML);
				});
				
				counter = counter + 1;
			}
			
			localStorage.setItem('newsFeed', storiesAsHTML);
			localStorage.setItem('newsCheckTime', currTime);	
		
		}).fail(function(){
			console.log('failed to contact hackers news');
		});		
	
	}else{
		console.log("news feed from cache");
		var newsFeed = localStorage.getItem('newsFeed');
		$('.newsFeedList').append(newsFeed);
	}
	
	  
});

function stopHackernewsFetch(){
	if (typeof fetchHackersNews !== 'undefined') {
		fetchHackersNews.abort();
	}
}
