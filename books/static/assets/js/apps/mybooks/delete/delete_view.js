ColibriApp.module('MyBooksApp.Delete', function (Delete, ColibriApp, Backbone, Marionette, $, _) {
    Delete.Book = ColibriApp.MyBooksApp.Common.Views.Form.extend({

        initialize: function () {
            //this.title = "Delete " + this.model.get('author');
            //this.title += " " + this.model.get('title');
            this.title = "Elimina libro";
        },

        onRender: function () {
            if (this.options.generateTitle) {
                var $title = $('<h1>', {
                    text: this.title
                });
                this.$el.prepend($title);
            }
            this.$(".js-submit").text("Elimina");
        }

    });
});