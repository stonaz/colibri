ColibriApp.module('Common.Controllers', function (Controllers, ColibriApp,
Backbone, Marionette, $, _) {

    //Controllers.TakeBook = {
    //    showBook: function (id, view) {
    //
    //        var editBook = function (id, parent_view) {
    //            //console.log(parent_view);
    //            var fetchingBook = ColibriApp.request("book:entity", id);
    //            $.when(fetchingBook).done(function (book) {
    //                var edit_view = new ColibriApp.MyBooksApp.Edit.Book({
    //                    model: book,
    //                });
    //                edit_view.on("form:submit", function (data) {
    //                    book.save(data, {
    //                        success: function (model, response, options) {
    //                            parent_view.model.collection.fetch({
    //                                success: function () {
    //                                    parent_view.render();
    //                                    edit_view.trigger("dialog:close");
    //                                    parent_view.flash("success");
    //                                    //console.log("The model has been updated");
    //                                },
    //                                error: function () {
    //                                    console.log('error');
    //                                }
    //                            });
    //
    //                        },
    //                        error: function (model, xhr, options) {
    //                            console.log(xhr)
    //                            edit_view.triggerMethod("form:data:invalid", xhr.responseJSON);
    //                            console.log("Something went wrong while saving the model");
    //                        }
    //                    });
    //                });
    //                ColibriApp.dialogRegion.show(edit_view);
    //            })
    //        };
    //
    //        var loadingView = new ColibriApp.Common.Views.Loading();
    //        ColibriApp.dialogRegion.show(loadingView);
    //
    //        var fetchingBookWhereIs = ColibriApp.request("book_where_is:entity", id);
    //
    //        var bookWhereIsView
    //        $.when(fetchingBookWhereIs).done(function (book_where_is) {
    //
    //            if (book_where_is !== undefined) {
    //                //console.log('not undefined')
    //                console.log(book_where_is)
    //                bookWhereIsView = new ColibriApp.Common.Views.EditDeleteConfirm({
    //                    model: book_where_is,
    //                    //generateTitle: false
    //                });
    //                bookWhereIsView.on("form:submit", function (data) {
    //                    console.log(data)
    //                    //bookWhereIsView.trigger("dialog:close");
    //                    editBook(book_where_is.id, view)
    //                });
    //            } else {
    //                bookView = new Take.MissingBook();
    //            }
    //            ColibriApp.dialogRegion.show(bookWhereIsView);
    //        });
    //    },
    //
    //}
});