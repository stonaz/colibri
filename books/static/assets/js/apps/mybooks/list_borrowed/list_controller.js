ColibriApp.module('MyBooksApp.ListBorrowed', function (ListBorrowed, ColibriApp,
Backbone, Marionette, $, _) {
    ListBorrowed.Controller = {
        listBooks: function () {
            var loadingView = new ColibriApp.Common.Views.Loading({
                title: "Loading books..",
                msg: "Loading collection..."
            });
            ColibriApp.mainRegion.show(loadingView);

            var fetchingBooks = ColibriApp.request("book_borrowed:entities");

            $.when(fetchingBooks).done(function (books) {

                var booksListBorrowedView = new ListBorrowed.Books({
                    collection: books
                });
                ColibriApp.mainRegion.show(booksListBorrowedView);
            });
        },
    }
});