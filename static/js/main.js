function postBook() {
/*
 * post a book
 */
	var title=$("#title").val();
        var author=$("#author").val();
        //var author="tonaz";
        var where_is=$("#where_is").val();
        if (where_is.length < 1 || author.length < 1 || title.length < 1) {
            $("#formError").html("Devi riempire tutti i campi !");
            return false;
        }
        console.log($("#where_is").val().length)
        console.log('where_is '+where_is)
        var ok=confirm("Aggiungere il libro?");
	if (ok==true)
	{
	$.ajax({
		type: "POST",
		url: 'php/insert_book.php',
		data: { "title": title,"author": author,"where_is": where_is},
		dataType: 'json',
		success: function(response){	
			//reloadNodeDiv(nodeSlug)
			alert("Libro aggiunto!");
			}
        
		});
        getBooks();
	  }
}

function updateBook(id,where_is) {
/*
 * update a book
 */
	//var where_is=$("#where_is").val();
        
        //console.log('where_is '+where_is)
        var ok=confirm("Modificare il libro ?");
	if (ok==true)
	{
	$.ajax({
		type: "POST",
		url: 'php/update_book.php',
		data: { "id":id,"where_is": where_is},
		dataType: 'json',
		success: function(response){	
			//reloadNodeDiv(nodeSlug)
			alert("Libro modificato!");
			}
        
		});
        getBooks();
	  }
}

function getBooks()
{
      var url="/api/v1/books";
      var args = {};
      $("#Intestazione").html('');
      $("#Books").html('');
      //cleanScreen();
      //$("#Loading").show();
      args.title=$("#titleSearch").val();
      args.author=$("#authorSearch").val();
      $.ajax({
        async: true, 
        url: url,
        dataType: 'json',
        data:args,
        success: function(response){
         //printVolumi(response,0,args);
         //console.log(response);
       printBooks(response)
      
          }
        
    });
}

function getMyBooks(user)
{
      var url="/api/v1/"+user+"/books";
      var args = {};
      $("#Intestazione").html('');
      $("#Books").html('');
      //cleanScreen();
      //$("#Loading").show();
      $.ajax({
        async: true, 
        url: url,
        dataType: 'json',
        data:args,
        success: function(response){
         //printVolumi(response,0,args);
         //console.log(response);
       printBooks(response)
      
          }
        
    });
}

function printBooks(data)
{

var count;

(data.length === undefined) ? count=0 : count =data.length;
var tmplMarkup = $('#templateBooksCounter').html();
var compiledTmpl = _.template(tmplMarkup, {count : count, item : "Libri trovati: " });
$("#Intestazione").append(compiledTmpl);


   
  // $("#RisultatiCollegati").show();
   var tmplMarkup = $('#templateBook').html();   
   _.each(data, function(b,i){
      
      var buttonID=b.id
      var output = _.template(tmplMarkup, { book : b } );
      $("#Books").append(output);
      $("#"+buttonID).on("click",function(){
        var where_is=$("#where_is_"+buttonID).val();
      updateBook(buttonID,where_is)
      
      });
      

   })
   


//$("#Loading").hide()
}