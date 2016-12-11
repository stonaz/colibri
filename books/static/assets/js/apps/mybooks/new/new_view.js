ColibriApp.module('MyBooksApp.New', function (New, ColibriApp,
Backbone, Marionette, $, _) {
    New.Book = ColibriApp.MyBooksApp.Common.Views.Form.extend({
        title: "New Book",
        onRender: function () {
            this.$(".js-submit").text("Inserisci il libro");
        }
    });
})