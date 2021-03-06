ColibriApp.module('BooksApp', function (BooksApp, ColibriApp, Backbone, Marionette, $, _) {
    BooksApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "items": "listBooks",
            //"books/:id": "showBook",
        }
    });

    var API = {
        
        listBooks: function () {
           // console.log("Show all books")
            BooksApp.List.Controller.listBooks();
            ColibriApp.execute("set:active:header", "items");
        },
        //showBook: function(id){
        //    console.log("Trying to show " + id)
        //    BooksApp.Take.Controller.showBook(id);
        //}
    };
    
    ColibriApp.on("books:list", function(){
        if (!ColibriApp.user) {
            console.log('not logged in !')
        }
        console.log('User:' +ColibriApp.user)
        ColibriApp.navigate("items");
        API.listBooks();
        });
    //ColibriApp.on("book:take", function(id){
    //    console.log('caught')
    //    ColibriApp.navigate("books/" + id);
    //    API.showBook(id);
    //    });    

    ColibriApp.addInitializer(function () {
        new BooksApp.Router({
            controller: API
        });
    });
});


