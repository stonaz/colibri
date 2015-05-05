ColibriApp.module('BooksApp.Sendmail', function (Sendmail, ColibriApp,
Backbone, Marionette, $, _) {
    Sendmail.Controller = {
        showBook: function (id, view) {
            var loadingView = new ColibriApp.Common.Views.Loading();
            ColibriApp.dialogRegion.show(loadingView);

            var fetchingBook = ColibriApp.request("book_where_is:entity", id);

            var bookWhereIsView
            $.when(fetchingBook).done(function (book_where_is) {

                if (book_where_is !== undefined) {
                    //console.log('not undefined')
                    //console.log(book_where_is)
                    bookWhereIsView = new Sendmail.Book({
                        model: book_where_is,
                        //generateTitle: false
                    });
                    
                    bookWhereIsView.on("form:submit", function (data) {
                        console.log(data)
                        if (data.message === "") {
                            var msg = "Scrivi qualcosa nel messaggio";
                            console.log('msg missing')
                            bookWhereIsView.triggerMethod("show:error", msg);
                            return false;
                            
                        }
                        var csfrtoken= $.cookie('csrftoken')
                        var msg = "Mail inviata"
                        Backbone.ajax({
                            url: "/sendmail/",
                            method: "POST",
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader("X-CSRFToken", csfrtoken);
                            },
                            data: data,
                            success: function (val) {
                                console.log('Mail sent');
                                bookWhereIsView.triggerMethod("show:success", msg);
                                //bookWhereIsView.trigger("dialog:close");

                            },
                            error: function (model, xhr, options) {
                                console.log(xhr)
                                //view.triggerMethod("form:data:invalid", xhr.responseJSON);
                                console.log("Something went wrong with the email");
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