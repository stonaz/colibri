ColibriApp.module('BooksApp.Take', function(Take, ColibriApp,
Backbone, Marionette, $, _){
    Take.MissingBook = Marionette.ItemView.extend({
            template: "#missing-book-view"
            });
    Take.Book = ColibriApp.BooksApp.Common.Views.Form.extend({
        
        template: "#book-where-is-form",

        initialize: function () {
            this.title = "Edit " + this.model.get('book_author');
            this.title += " " + this.model.get('book_title');
        },

        onRender: function () {
            if (this.options.generateTitle) {
                var $title = $('<h1>', {
                    text: this.title
                });
                this.$el.prepend($title);
            }
            this.$(".js-submit").text("Take book");
        }

        });
    });