ColibriApp.module('MyBooksApp.Edit', function (Edit, ColibriApp, Backbone, Marionette, $, _) {
    Edit.Controller = {
        //editBook: function (id) {
        //    var loadingView = new ColibriApp.Common.Views.Loading({
        //        title: "Artificial Loading Delay",
        //        message: "Loading data to be edited"
        //    });
        //    ColibriApp.mainRegion.show(loadingView);
        //
        //    var fetchingBook = ColibriApp.request("book:entity", id);
        //    $.when(fetchingBook).done(function (book) {
        //        var view;
        //        if (book !== undefined) {
        //            view = new Edit.Book({
        //                model: book,
        //                generateTitle: true
        //            });
        //            view.on("form:submit", function (data) {
        //                console.log('saving book..')
        //                if (book.save(data)) {
        //                    ColibriApp.trigger("mybook:show", book.get('id'));
        //                } else {
        //                    view.triggerMethod("form:data:invalid", book.validationError);
        //                }
        //            });
        //        } else {
        //            view = new ColibriApp.MyBooksApp.Show.MissingBook();
        //        }
        //
        //        ColibriApp.mainRegion.show(view);
        //    });
        //},
        
        showBook: function (id, view) {

            var editBook = function (id, parent_view) {
                //console.log(parent_view);
                var fetchingBook = ColibriApp.request("book:entity", id);
                $.when(fetchingBook).done(function (book) {
                    var edit_view = new ColibriApp.MyBooksApp.Edit.Book({
                        model: book,
                    });
                    edit_view.on("form:submit", function (data) {
                        book.save(data, {
                            success: function (model, response, options) {
                                parent_view.model.collection.fetch({
                                    success: function () {
                                        parent_view.render();
                                        edit_view.trigger("dialog:close");
                                        parent_view.flash("success");
                                        //console.log("The model has been updated");
                                    },
                                    error: function () {
                                        console.log('error');
                                    }
                                });

                            },
                            error: function (model, xhr, options) {
                                console.log(xhr)
                                edit_view.triggerMethod("form:data:invalid", xhr.responseJSON);
                                console.log("Something went wrong while saving the model");
                            }
                        });
                    });
                    ColibriApp.dialogRegion.show(edit_view);
                })
            };

            var loadingView = new ColibriApp.Common.Views.Loading();
            ColibriApp.dialogRegion.show(loadingView);

            var fetchingBookWhereIs = ColibriApp.request("book_where_is:entity", id);

            var bookWhereIsView
            $.when(fetchingBookWhereIs).done(function (book_where_is) {

                if (book_where_is !== undefined) {
                    //console.log('not undefined')
                    console.log(book_where_is)
                    bookWhereIsView = new ColibriApp.MyBooksApp.Common.Views.EditDeleteConfirm({
                        model: book_where_is,
                        title: "Conferma modifica",
                        delete_warn: ""
                        //generateTitle: false
                    });
                    bookWhereIsView.on("form:submit", function (data) {
                        console.log(data)
                        //bookWhereIsView.trigger("dialog:close");
                        editBook(book_where_is.id, view)
                    });
                } else {
                    bookView = new Take.MissingBook();
                }
                ColibriApp.dialogRegion.show(bookWhereIsView);
            });
        },
    };
});