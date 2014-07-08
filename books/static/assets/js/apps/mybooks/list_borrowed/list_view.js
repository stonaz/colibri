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
                'click button.js-back': 'getPreviousPage',
                'click button.js-next': 'getNextPage',
        },
        
        getNextPage: function(e){
        e.preventDefault();
        this.collection.getNextPage();
        this.pageCheck();
        },
    
        getPreviousPage: function(e){
        e.preventDefault();
        this.collection.getPreviousPage();
        this.pageCheck();
        },
        
        pageCheck: function(){
            var pageProperties = this.collection.state
            console.log(pageProperties.currentPage)
            console.log(pageProperties.totalPages)
            if (pageProperties.currentPage == pageProperties.totalPages) {
                console.log('hide next button');
                this.$(".js-next").addClass('disabled');
            }
            else{
                this.$(".js-next").removeClass('disabled');
            }
            if (pageProperties.currentPage == pageProperties.firstPage) {
                console.log('hide prev button');
                this.$(".js-back").addClass('disabled');
            }
            else{
                this.$(".js-back").removeClass('disabled');
            }
        },
        
        onRender: function () {
            this.pageCheck();
            
            //if (this.collection.length < 1) {
            //    console.log('No books to show')
            //    var $title = $('<tr>', {
            //        text: 'No books inserted yet'
            //    });
            //    $title.addClass('bg-danger')
            //    this.$el.append($title);
            //
            //}           
        },
        
        emptyView: NoBooksView,
        
        

    });
});