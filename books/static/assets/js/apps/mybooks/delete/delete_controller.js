ColibriApp.module('MyBooksApp.Delete', function (Delete, ColibriApp, Backbone, Marionette, $, _) {
    Delete.Controller = {
        //deleteBook: function (id) {
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

            var deleteBook = function (id, parent_view) {
                console.log(id);
                var fetchingBook = ColibriApp.request("book:entity", id);
                $.when(fetchingBook).done(function (book) {
                        book.destroy( {
                            success: function (model, response, options) {
                                parent_view.model.collection.fetch({
                                    success: function () {
                                        parent_view.render();
                                        bookWhereIsView.trigger("dialog:close");
                                    },
                                    error: function () {
                                        console.log('error');
                                    }
                                });
                            },
                            error: function (model, xhr, options) {
                                console.log(xhr)
                                edit_view.triggerMethod("form:data:invalid", xhr.responseJSON);
                                console.log("Something went wrong while deleting the model");
                            }
                        });
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
                        title: "Conferma eliminazione"
                        //generateTitle: false
                    });
                    bookWhereIsView.on("form:submit", function (data) {
                        console.log(data)
                        //bookWhereIsView.trigger("dialog:close");
                        deleteBook(book_where_is.id, view,bookWhereIsView)
                    });
                } else {
                    bookView = new Take.MissingBook();
                }
                ColibriApp.dialogRegion.show(bookWhereIsView);
            });
        },
    };
});