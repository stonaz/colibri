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
            var msg = "Hai già questo libro"
            $.when(fetchingBooks).done(function (books) {
                console.log("Libri trovati: " +books.length)

                var booksListView = new List.Books({
                    collection: books,
                    
                });
                //console.log(booksListView)

                booksListLayout.on("show", function () {
                    booksListLayout.panelRegion.show(booksListPanel);
                    booksListLayout.booksRegion.show(booksListView);
                });

                booksListPanel.on("books:search", function (filterCriterion) {
                    console.log("filter list with criterion ", filterCriterion);
                    var fetchingBooks = ColibriApp.request("book_all:entities:filter", filterCriterion);
                    $.when(fetchingBooks).done(function (books) {
                        var booksListView = new List.Books({
                            collection: books
                        });
                        booksListLayout.booksRegion.show(booksListView);
                        // A DRY method should be implemented
                        booksListView.on("itemview:book:take", function (booksListView, model) {

                            // console.log(ColibriApp.username+model.attributes.where_is)
                            if (ColibriApp.username === model.attributes.where_is) {
                                //var msg = "Already owning this book"
                                //  console.log(ColibriApp.username+model.attributes.where_is)
                                var errorView = new ColibriApp.Common.Views.Error({
                                    title: "Errore",
                                    message: msg,
                                    generateTitle: true
                                });
                                ColibriApp.dialogRegion.show(errorView);
                            } else {
                                ColibriApp.BooksApp.Take.Controller.showBook(model.get('id'), booksListView);
                            }
                        });
                        booksListView.on("itemview:book:sendmail", function (booksListView, model) {

                            // console.log(ColibriApp.username+model.attributes.where_is)
                            if (ColibriApp.username === model.attributes.where_is) {
                                //var msg = "Already owning this book"
                                //  console.log(ColibriApp.username+model.attributes.where_is)
                                var errorView = new ColibriApp.Common.Views.Error({
                                    title: "Errore",
                                    message: msg,
                                    generateTitle: true
                                });
                                ColibriApp.dialogRegion.show(errorView);
                            } else {
                                ColibriApp.BooksApp.Sendmail.Controller.showBook(model.get('id'), booksListView);
                            }
                        });
                    });

                });

                booksListView.on("itemview:book:take", function (booksListView, model) {

                    // console.log(ColibriApp.username+model.attributes.where_is)
                    if (ColibriApp.username === model.attributes.where_is) {
                        //var msg = "Already owning this book"
                        //  console.log(ColibriApp.username+model.attributes.where_is)
                        var errorView = new ColibriApp.Common.Views.Error({
                            title: "Errore",
                            message: msg,
                            generateTitle: true
                        });
                        ColibriApp.dialogRegion.show(errorView);
                    } else {
                        ColibriApp.BooksApp.Take.Controller.showBook(model.get('id'), booksListView);
                    }
                });
                booksListView.on("itemview:book:sendmail", function (booksListView, model) {

                    // console.log(ColibriApp.username+model.attributes.where_is)
                    if (ColibriApp.username === model.attributes.where_is) {
                        //var msg = "Already owning this book"
                        //  console.log(ColibriApp.username+model.attributes.where_is)
                        var errorView = new ColibriApp.Common.Views.Error({
                            title: "Errore",
                            message: msg,
                            generateTitle: true
                        });
                        ColibriApp.dialogRegion.show(errorView);
                    } else {
                        ColibriApp.BooksApp.Sendmail.Controller.showBook(model.get('id'), booksListView);
                    }
                });
                ColibriApp.mainRegion.show(booksListLayout);
            });
        },
    }
});