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
                    Mail = Backbone.Model.extend({
                            urlRoot: function () {
                                return "/sendmail/";
                            },
                    
                            defaults: {
                                sender: '',
                                user: '',
                                message: '',
                                
                                
                            }
                        });
                        
                        var mail = new Mail(data);
                        console.log(mail);
                        mail.save(data, {
                            success: function (model, response, options) {
                                // console.log(view)
                                //view.model.collection.fetch({
                                //    success: function () {
                                //        console.log('success');
                                //    },
                                //    error: function () {
                                //        console.log('error');
                                //    }
                                //});
                                var msg = "Mail sent<br>";
                                //bookWhereIsView.triggerMethod("show:success", msg);
                                bookWhereIsView.trigger("dialog:close");
                                //view.flash("success");
                                //console.log("The model has been updated");
                            },
                            error: function (model, xhr, options) {
                                // to review
                                console.log(xhr)
                                // bookWhereIsView.triggerMethod("form:data:invalid", xhr);
                                console.log("Something went wrong while saving the model");
                            }
                        });
                    });

                    bookWhereIsView.on("form:sendmail", function (data) {
                        //console.log(data)
                        Mail = Backbone.Model.extend({
                            urlRoot: function () {
                                return "/api/v1/sendmail/";
                            },
                    
                            defaults: {
                                sender: '',
                                user: '',
                                message: '',
                                
                                //dove_sta:''
                            }
                        });
                        
                        var mail = new Mail();
                        console.log(mail)
                        
                        
                        mail.save(data, {
                            success: function (model, response, options) {
                                // console.log(view)
                                //view.model.collection.fetch({
                                //    success: function () {
                                //        console.log('success');
                                //    },
                                //    error: function () {
                                //        console.log('error');
                                //    }
                                //});
                                var msg = "Mail sent<br>";
                                //bookWhereIsView.triggerMethod("show:success", msg);
                                bookWhereIsView.trigger("dialog:close");
                                //view.flash("success");
                                //console.log("The model has been updated");
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