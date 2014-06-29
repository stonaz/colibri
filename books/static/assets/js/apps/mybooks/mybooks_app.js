ColibriApp.module('MyBooksApp', function (MyBooksApp, ColibriApp, Backbone, Marionette, $, _) {
    MyBooksApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "myitems": "listBooks",
            "borroweditems": "listBorrowedBooks",
            "mybooks/:id": "showBook",
            "mybooks/:id/edit": "editBook"
        }
    });

    var API = {
        
        editBook: function(id){
            MyBooksApp.Edit.Controller.editBook(id);
        },
        listBooks: function () {
            MyBooksApp.List.Controller.listBooks();
            ColibriApp.execute("set:active:header", "myitems");
        },
        listBorrowedBooks: function () {
            MyBooksApp.ListBorrowed.Controller.listBooks();
            ColibriApp.execute("set:active:header", "borroweditems");
        },
        showBook: function(id){
            //console.log("Trying to show " + id)
            MyBooksApp.Show.Controller.showBook(id);
        }
    };
    
    ColibriApp.on("mybooks:list", function(){
        ColibriApp.navigate("myitems");
        API.listBooks();
        });
    ColibriApp.on("borrowedbooks:list", function(){
        ColibriApp.navigate("borroweditems");
        API.listBorrowedBooks();
        });
    ColibriApp.on("mybook:show", function(id){
        ColibriApp.navigate("mybooks/" + id);
        API.showBook(id);
        });
    ColibriApp.on("mybook:edit", function(id){
        ColibriApp.navigate("mybooks/" + id + "/edit");
        API.editBook(id);
        });
    

    ColibriApp.addInitializer(function () {
        new MyBooksApp.Router({
            controller: API
        });
    });
});


