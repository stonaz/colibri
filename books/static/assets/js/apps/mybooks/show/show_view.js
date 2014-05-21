ColibriApp.module('MyBooksApp.Show', function(Show, ColibriApp,
Backbone, Marionette, $, _){
    Show.MissingBook = Marionette.ItemView.extend({
            template: "#missing-book-view"
            });
    Show.Book = Marionette.ItemView.extend({
            template: "#book-view",
            events: {
                    "click a.js-edit": "editClicked"
                    },
            editClicked: function(e){
                    e.preventDefault();
                    this.trigger("mybook:edit", this.model);
                    }
                    
            });
    });