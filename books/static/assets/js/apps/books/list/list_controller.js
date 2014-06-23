ColibriApp.module('BooksApp.List', function (List, ColibriApp,
Backbone, Marionette, $, _) {
    List.Controller = {
        listBooks: function () {
            var loadingView = new ColibriApp.Common.Views.Loading({
                title: "Loading books..",
                msg: "Loading collection..."
            });
            ColibriApp.mainRegion.show(loadingView);

            var fetchingBooks = ColibriApp.request("book_all:entities");

            var booksListLayout = new List.Layout();
            var booksListPanel = new List.Panel();

            $.when(fetchingBooks).done(function (books) {

                var booksListView = new List.Books({
                    collection: books
                });

                booksListLayout.on("show", function () {
                    booksListLayout.panelRegion.show(booksListPanel);
                    booksListLayout.booksRegion.show(booksListView);
                });

                booksListView.on("itemview:book:take", function (booksListView, model) {
                    
                   // console.log(ColibriApp.username+model.attributes.where_is)
                    if (ColibriApp.username===model.attributes.where_is) {
                        var msg = "Already owning this book"
                      //  console.log(ColibriApp.username+model.attributes.where_is)
                        var errorView = new ColibriApp.Common.Views.Error({
                title: "Errore",
                message: msg,
                generateTitle: true
            });
            ColibriApp.dialogRegion.show(errorView);
                    }
                    else {
                        ColibriApp.BooksApp.Take.Controller.showBook(model.get('id'),booksListView);
                    }
                });

                ColibriApp.mainRegion.show(booksListLayout);
            });
        },
    }
});