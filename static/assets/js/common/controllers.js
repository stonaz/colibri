ColibriApp.module('Common.Controllers', function (Controllers, ColibriApp,
Backbone, Marionette, $, _) {
    Controller.TakeBook = {
        showBook: function (id, view) {
            var loadingView = new ColibriApp.Common.Views.Loading();
            ColibriApp.dialogRegion.show(loadingView);

            var fetchingBook = ColibriApp.request("book_where_is:entity", id);

            var bookWhereIsView
            $.when(fetchingBook).done(function (book_where_is) {

                if (book_where_is !== undefined) {
                    //console.log('not undefined')
                    //console.log(book_where_is)
                    bookWhereIsView = new ColibriApp.Common.Views.WhereIsBook({
                        model: book_where_is,
                        //generateTitle: false
                    });
                    bookWhereIsView.on("form:submit", function (data) {
                        //console.log(data)
                        book_where_is.save(data, {
                            success: function (model, response, options) {
                               // console.log(view)
                                view.model.collection.fetch({
                                    success: function () {
                                        view.render();
                                    },
                                    error: function () {
                                        console.log('error');
                                    }
                                });
                                var msg = "You are now owning this book<br>";
                                msg += "An email has been sent to the previous owner"
                                bookWhereIsView.triggerMethod("show:success", msg);
                                //bookWhereIsView.trigger("dialog:close");
                                view.flash("success");
                                console.log("The model has been updated");
                            },
                            error: function (model, xhr, options) {
                                // to review
                                console.log(xhr)
                               // bookWhereIsView.triggerMethod("form:data:invalid", xhr);
                                console.log("Something went wrong while saving the model");
                            }
                        });
                    });
                } else {
                    bookView = new Take.MissingBook();
                }
                ColibriApp.dialogRegion.show(bookWhereIsView);
            });
        }
    }
});