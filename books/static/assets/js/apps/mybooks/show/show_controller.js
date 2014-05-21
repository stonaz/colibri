ColibriApp.module('MyBooksApp.Show', function(Show, ColibriApp,
Backbone, Marionette, $, _){
    Show.Controller = {
            showBook: function(id){
                var loadingView = new ColibriApp.Common.Views.Loading();
                ColibriApp.mainRegion.show(loadingView);
                
                var fetchingBook = ColibriApp.request("book:entity", id);
                
                var bookView
                $.when(fetchingBook).done(function(book){
                    
                    if(book !== undefined) {
                        console.log('not undefined')
                        console.log(book)
                        bookView = new Show.Book({
                            model: book  
                            });
                    bookView.on("mybook:edit", function(book){
                        ColibriApp.trigger("mybook:edit", book.get('id'));
                        });
                    }
                    else {
                        bookView = new Show.MissingBook();
                    }
                    ColibriApp.mainRegion.show(bookView);
                });            
        }
    }
});
