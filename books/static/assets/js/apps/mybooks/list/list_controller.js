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
                console.log(books.length)

                var booksListView = new List.Books({
                    collection: books
                });

                booksListLayout.on("show", function () {
                    booksListLayout.panelRegion.show(booksListPanel);
                    booksListLayout.booksRegion.show(booksListView);
                });

                booksListPanel.on("book:new", function () {
                    newBook = new ColibriApp.Entities.Book({
                        author: '',
                        title: '',
                        where_is: ColibriApp.user,
                        owner: ColibriApp.user,

                    });

                    var view = new ColibriApp.MyBooksApp.New.Book({
                        model: newBook,
                    });
                    view.on("form:submit", function (data) {
                        console.log(data)
                        newBook.save(data, {

                            success: function (model, response, options) {
                                books.add(newBook);
                                view.trigger("dialog:close");
                                booksListView.render()
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
                    var user = ColibriApp.username
                    var where_is = model.attributes.where_is
                    if (user !== where_is) {
                        ColibriApp.MyBooksApp.Delete.Controller.showBook(model.get('id'), childView);
                    }
                    else{
                        var view = new ColibriApp.MyBooksApp.Delete.Book({
                            model: model,
                            //asModal: true
                        });
                    view.on("form:submit", function (data) {
                            model.destroy( {
                                success: function (model, response, options) {
                                    childView.render();
                                    view.trigger("dialog:close");
                                    //childView.flash("success");
                                    console.log("The model has been deleted");
                                },
                                error: function (model, xhr, options) {
                                    console.log(xhr)
                                    view.triggerMethod("form:data:invalid", xhr.responseJSON);
                                    console.log("Something went wrong while deleting the model");
                                }
                            });
                        });
                    ColibriApp.dialogRegion.show(view);
                    }
                    
                });

                booksListView.on("itemview:mybook:edit", function (childView, model) {
                    //console.log(model)
                    //console.log("clicked on edit")
                    var user = ColibriApp.username
                    var where_is = model.attributes.where_is
                    if (user !== where_is) {
                        ColibriApp.MyBooksApp.Edit.Controller.showBook(model.get('id'), childView);
                    } else {
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
                    }
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