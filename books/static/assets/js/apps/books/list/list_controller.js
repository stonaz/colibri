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
                    ColibriApp.BooksApp.Take.Controller.showBook(model.get('id'),booksListView);
                });

                ColibriApp.mainRegion.show(booksListLayout);
            });
        },
    }
});