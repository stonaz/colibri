ColibriApp.module('BooksApp', function (BooksApp, ColibriApp, Backbone, Marionette, $, _) {
    BooksApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "books": "listBooks",
            "books/:id": "showBook",
            "books/:id/edit": "editBook"
        }
    });

    var API = {
        
        editBook: function(id){
            BooksApp.Edit.Controller.editBook(id);
        },
        listBooks: function () {
            BooksApp.List.Controller.listBooks();
        },
        showBook: function(id){
            console.log("Trying to show " + id)
            BooksApp.Show.Controller.showBook(id);
        }
    };
    
    ColibriApp.on("books:list", function(){
        ColibriApp.navigate("books");
        API.listBooks();
        });
    ColibriApp.on("book:show", function(id){
        ColibriApp.navigate("books/" + id);
        API.showBook(id);
        });
    ColibriApp.on("book:edit", function(id){
        ColibriApp.navigate("books/" + id + "/edit");
        API.editBook(id);
        });
    

    ColibriApp.addInitializer(function () {
        new BooksApp.Router({
            controller: API
        });
    });
});


