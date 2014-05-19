ColibriApp.module('BooksApp.New', function (New, ColibriApp,
Backbone, Marionette, $, _) {
    console.log('creating view x new book')
    New.Book = ColibriApp.BooksApp.Common.Views.Form.extend({
        title: "New Book",
        onRender: function () {
            this.$(".js-submit").text("Add book");
        }
    });
})