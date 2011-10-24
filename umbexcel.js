/*
 * umbexcle ('Какие TD обрабатываем','Какой класс выставляем в случае выделения','функция, вызываемая каждый раз после выделения')
 * 
 */
function umbexcel(TABLE, TDCLASS, CLASS, FUNC){
  this.a = new Array(); // массивы id выделенных ячеек
  var a = this.a;
  
  this.clear = function (){
    $('.'+TDCLASS).each(function(i,o){
		     $(o).removeClass(CLASS);
		   });
    a = new Array();
  };
  var clear = this.clear;


  this.__set_class = function() {
    for (var i=0;i<a.length;i++){
      if ($('#'+a[i]).hasClass(TDCLASS)){
        $('#'+a[i]).addClass(CLASS);
      }
    }
  }
  var __set_class = this.__set_class;
  
  this.check = function (ev){
    var new_cell = $(this).prop('cellIndex');
    var new_row = $(this).parent().prop('rowIndex');
  
    if (ev.shiftKey){
      // выделение от первой выделенной (a[0] до этой)
      window.getSelection().removeAllRanges(); // снимаем выделение
      if (a[0] == this.id){
	// та же ячейка
	clear();
      }else{
	//var begin = a[0].split('-');
	//var end = this.id.split('-');
	var first_cell = $('#'+a[0]).prop('cellIndex');
	var first_row = $('#'+a[0]).parent().prop('rowIndex');

	//alert('first_cell='+first_cell+',first_row='+first_row+",new_cell="+new_cell+',new_row='+new_row);
	if (first_cell*1 > new_cell*1){
	  var tmp = first_cell;
	  first_cell = new_cell;
	  new_cell = tmp;
	}
	if (first_row*1 > new_row*1){
	  var tmp = first_row;
	  first_row = new_row;
	  new_row = tmp;
	}
	clear();
	var s = '';
	for (var i=first_row*1;i<=new_row*1;i++){
	  for (var j=first_cell*1;j<=new_cell*1;j++){
	    //TK  тут надо заменить ID на получение по номерам
	    a.push($('#'+TABLE).find("tr:eq("+i+")").find("td:eq("+j+")").prop("id"));
	  }
	}
      }
    }else if (ev.ctrlKey){
      alert('ctrl');
    }else{
      // отметка или снятие отметки с какой-либо ячейки (снятие м.б. и сомноих)
      if ($('#'+this.id).hasClass(CLASS)){
	clear();
      }else{
	clear();
	a.push (this.id);
      }
    }
    __set_class();
    FUNC();
  };
  var check = this.check;

  this.get_a = function(){
    return a;
  };
  var get_a = this.get_a;
  
  //MAIN
  //$('.'+TDCLASS).live('click',{ev:event},this.check);;
  $('.'+TDCLASS).live('click',this.check);;
}
