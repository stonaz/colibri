ColibriApp.module('MyBooksApp.Show', function(Show, ColibriApp,
Backbone, Marionette, $, _){
    Show.Controller = {
            showBook: function(id){
                var loadingView = new ColibriApp.Common.Views.Loading();
                ColibriApp.mainRegion.show(loadingView);
                
                var fetchingBook = ColibriApp.request("book:entity", id);
                
                
                var bookShowLayout = new Show.Layout();
                //var bookShowHistory = new Show.History();
                
                var bookView
                var bookHistoryView
                $.when(fetchingBook).done(function(book){
                    
                    bookShowLayout.on("show", function () {
                    bookShowLayout.bookRegion.show(bookView);
                    bookShowLayout.historyRegion.show(bookHistoryView);
                });
                    
                    if(book !== undefined) {
                        console.log('not undefined')
                        console.log(book)
                        bookView = new Show.Book({
                            model: book  
                            });
                        
                        var fetchingBookHistory = ColibriApp.request("book_history:entities", id);
                        $.when(fetchingBookHistory).done(function(book_history){
                            console.log(book_history)
                            bookHistoryView = new Show.History({
                                collection: book_history  
                            });
                            ColibriApp.mainRegion.show(bookShowLayout);
                        });
                        
                        
                    bookView.on("mybook:edit", function(book){
                        ColibriApp.trigger("mybook:edit", book.get('id'));
                        });
                    }
                    else {
                        bookView = new Show.MissingBook();
                    }
                
                    //console.log(bookShowLayout)
                    
                });
                
        }
    }
});
