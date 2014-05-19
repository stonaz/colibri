ColibriApp.module('BooksApp.Edit', function (Edit, ColibriApp, Backbone, Marionette, $, _) {
    Edit.Controller = {
        editBook: function (id) {
            var loadingView = new ColibriApp.Common.Views.Loading({
                title: "Artificial Loading Delay",
                message: "Loading data to be edited"
            });
            ColibriApp.mainRegion.show(loadingView);

            var fetchingBook = ColibriApp.request("book:entity", id);
            $.when(fetchingBook).done(function (book) {
                var view;
                if (book !== undefined) {
                    view = new Edit.Book({
                        model: book,
                        generateTitle: true
                    });
                    view.on("form:submit", function (data) {
                        console.log('saving book..')
                        if (book.save(data)) {
                            ColibriApp.trigger("book:show", book.get('id'));
                        } else {
                            view.triggerMethod("form:data:invalid", book.validationError);
                        }
                    });
                } else {
                    view = new ColibriApp.BooksApp.Show.MissingBook();
                }

                ColibriApp.mainRegion.show(view);
            });
        }
    };
});