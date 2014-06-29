ColibriApp.module('MyBooksApp.ListBorrowed', function (ListBorrowed, ColibriApp, Backbone, Marionette, $, _) {
    
    var NoBooksView = Marionette.ItemView.extend({
    template: "#book-list-none",
    tagName: "tr",
    className: "danger"
    });
    
    ListBorrowed.NoBooks = Marionette.ItemView.extend({
        template: "#missing-books-view"
        });

    ListBorrowed.Book = Marionette.ItemView.extend({
        tagName: "tr",
        template: "#book-borrowed-list-item",
    });

    ListBorrowed.Books = Marionette.CompositeView.extend({
        //tagName: "table",
        template: "#book-borrowed-list",
        //className: "table table-hover",
        itemView: ListBorrowed.Book,
        itemViewContainer: "tbody",
        
        events: {
                'click #js-back': 'getPreviousPage',
                'click button.js-next': 'getNextPage',
        },
        
        getNextPage: function(e){
        e.preventDefault();
        this.collection.getNextPage();
        },
    
        getPreviousPage: function(e){
        e.preventDefault();
        this.collection.getPreviousPage();
        },
        
        emptyView: NoBooksView

    });
});