ColibriApp.module('MyBooksApp.List', function (List, ColibriApp,
Backbone, Marionette, $, _) {
    List.Controller = {
        listBooks: function () {
            var loadingView = new ColibriApp.Common.Views.Loading({
                title: "Loading books..",
                msg: "Loading collection..."
            });
            ColibriApp.mainRegion.show(loadingView);

            var fetchingBooks = ColibriApp.request("book:entities");

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

                    var view = new ColibriApp.MyBooksApp.New.Book({
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

                booksListView.on("itemview:mybook:delete", function (childView, model) {
                    model.destroy({
                        error: function (model, response) {
                            console.log(response)
                        },
                        success: function (model, response) {
                            console.log(response)
                        },
                    });
                });

                booksListView.on("itemview:mybook:edit", function (childView, model) {
                    console.log("clicked on edit")
                    console.log(ColibriApp.username)
                    console.log(model.attributes.where_is)
                    var view = new ColibriApp.MyBooksApp.Edit.Book({
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

                booksListView.on("itemview:mybook:show", function (childView, model) {

                    //ColibriApp.MyBooksApp.Show.Controller.showBook(model);
                    ColibriApp.trigger("mybook:show", model.get('id'));
                });

                ColibriApp.mainRegion.show(booksListLayout);
            });
        },
    }
});