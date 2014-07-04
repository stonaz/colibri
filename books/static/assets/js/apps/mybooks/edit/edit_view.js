ColibriApp.module('MyBooksApp.Edit', function (Edit, ColibriApp, Backbone, Marionette, $, _) {
    Edit.Book = ColibriApp.MyBooksApp.Common.Views.Form.extend({

        initialize: function () {
            //this.title = "Edit " + this.model.get('author');
            //this.title += " " + this.model.get('title');
            this.title = "Modifica libro ";
        },

        onRender: function () {
            if (this.options.generateTitle) {
                var $title = $('<h1>', {
                    text: this.title
                });
                this.$el.prepend($title);
            }
            this.$(".js-submit").text("Modifica");
        }

    });
});