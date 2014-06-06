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

                booksListPanel.on("book:new", function () {
                    newBook = new ColibriApp.Entities.Book();
                    console.log('BOOK: ' + newBook)

                    var view = new ColibriApp.BooksApp.New.Book({
                        model: newBook,
                        //asModal: true
                    });
                    view.on("form:submit", function (data) {
                        newBook.save(data, {
                            success: function (model, response, options) {
                                books.add(newBook);
                                view.trigger("dialog:close");
                                booksListView.children.findByModel(newBook).flash("success");
                                console.log("The model has been saved to the server");
                            },
                            error: function (model, xhr, options) {
                                console.log(xhr)
                                view.triggerMethod("form:data:invalid", xhr.responseJSON);
                                console.log("Something went wrong while saving the model");
                            }
                        });
                    });

                    ColibriApp.dialogRegion.show(view);
                });

                booksListView.on("itemview:book:delete", function (childView, model) {
                    model.destroy({
                        error: function (model, response) {
                            console.log(response)
                        },
                        success: function (model, response) {
                            console.log(response)
                        },
                    });
                });

                booksListView.on("itemview:book:edit", function (childView, model) {
                    var view = new ColibriApp.BooksApp.Edit.Book({
                        model: model,
                        //asModal: true
                    })
                    view.on("form:submit", function (data) {
                        model.save(data, {
                            success: function (model, response, options) {
                                childView.render();
                                view.trigger("dialog:close");
                                childView.flash("success");
                                console.log("The model has been updated");
                            },
                            error: function (model, xhr, options) {
                                console.log(xhr)
                                view.triggerMethod("form:data:invalid", xhr.responseJSON);
                                console.log("Something went wrong while saving the model");
                            }
                        });
                    });
                    ColibriApp.dialogRegion.show(view);
                });

                booksListView.on("itemview:book:show", function (childView, model) {

                    //ColibriApp.BooksApp.Show.Controller.showBook(model);
                    ColibriApp.trigger("book:show", model.get('id'));
                });

                ColibriApp.mainRegion.show(booksListLayout);
            });
        },
    }
});