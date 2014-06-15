ColibriApp.module('BooksApp.Take', function (Take, ColibriApp,
Backbone, Marionette, $, _) {
    Take.Controller = {
        showBook: function (id, view) {
            var loadingView = new ColibriApp.Common.Views.Loading();
            ColibriApp.dialogRegion.show(loadingView);

            var fetchingBook = ColibriApp.request("book_where_is:entity", id);

            var bookWhereIsView
            $.when(fetchingBook).done(function (book) {

                if (book !== undefined) {
                    console.log('not undefined')
                    //console.log(book)
                    bookWhereIsView = new Take.Book({
                        model: book,
                        //generateTitle: false
                    });
                    bookWhereIsView.on("form:submit", function (data) {
                        //console.log(data)
                        book.save(data, {
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
                                //childView.flash("success");
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