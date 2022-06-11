$(document).ready(function(){
	
	$(document).on('click', '.addTodoBtn', function(){
		var todoVal = $('.addTodoField').val();
		if(todoVal != ''){
			$('.todoList').append('<div class="todoItem widgetListItem" data-text=' + todoVal + ' ><div class="todoText">' + todoVal + '</div><button class="widgetItemHoverAction todoRemoveBtn">-</button></div>');
			
			if(checkVariable("todo") == 1){
				var todoVar = localStorage.getItem("todo");
				var todoVar = todoVar + ' [' + todoVal + ']';
			}else{
				var todoVar = ' [' + todoVal + ']';
			}
			todoVar.replace(/^\s+|\s+$/gm, '');
			localStorage.setItem("todo", todoVar);
			$('.addTodoField').val('');
		}
	});
	
	$(document).on('click','.todoRemoveBtn', function(){
		if(checkVariable("todo") == 1){
			var todoVar = localStorage.getItem("todo");
		
			var todoVal = $(this).parent('.widgetListItem').data('text');
			$(this).parent('.widgetListItem').remove();
			var removeItem = '[' + todoVal + ']';
			
			todoVar = todoVar.replace(removeItem, '');
			todoVar.replace(/^\s+|\s+$/gm, '').replace(/\s+/, '');
			localStorage.setItem("todo", todoVar);
			if(todoVar == ''){
				localStorage.removeItem('todo');
			}
		
		}
	});

});