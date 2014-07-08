ColibriApp.module('BooksApp.List', function (List, ColibriApp, Backbone, Marionette, $, _) {
    
    var NoBooksView = Marionette.ItemView.extend({
        template: "#book-list-none",
        tagName: "tr",
        className: "danger"
        });

    List.Layout = Marionette.Layout.extend({
        template: "#book-list-layout",
        regions: {
            panelRegion: "#panel-region",
            booksRegion: "#books-region"
        }
    });

    List.Panel = Marionette.ItemView.extend({
        template: "#book-all-list-panel",

        templateHelpers: function () {
            return {
                username: ColibriApp.username
            }
        },

        events: {
            'click button.js-search': "searchClicked"
        },
        
        searchClicked: function(){
            var criterion = this.$(".js-search-criterion").val();
            this.trigger("books:search", criterion);
        }
    });

    List.Book = Marionette.ItemView.extend({
        tagName: "tr",
        template: "#book-all-list-item",
        
        events: {
            "click": "highlightName",
                "click td a.js-show": "showClicked",
                "click td a.js-sendmail": "showSendmail",
        },
        flash: function (cssClass) {

            var $view = this.$el;
            $view.hide().toggleClass(cssClass).fadeIn(800, function () {
                setTimeout(function () {
                    $view.toggleClass(cssClass)
                }, 500);
            });
        },

        highlightName: function (e) {
            e.preventDefault();
            this.$el.toggleClass("warning");
        },
        showClicked: function (e) {
            e.preventDefault();
            e.stopPropagation();
            this.trigger("book:take", this.model);
        },
        showSendmail: function (e) {
            e.preventDefault();
            e.stopPropagation();
            this.trigger("book:sendmail", this.model);
        },
    });

    List.Books = Marionette.CompositeView.extend({
        //tagName: "table",
        template: "#book-list",
        //className: "table table-hover",
        itemView: List.Book,
        itemViewContainer: "tbody",
        
        events: {
                'click button.js-back': 'getPreviousPage',
                'click button.js-next': 'getNextPage',
        },
        
        getNextPage: function(e){
        e.preventDefault();
        this.collection.getNextPage();
        console.log(this.collection.state.currentPage)
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
        
        emptyView: NoBooksView

        //initialize: function () {
        //    this.listenTo(this.collection, "reset", function () {
        //        this.appendHtml = function (collectionView, itemView, index) {
        //            collectionView.$el.append(itemView.el);
        //        }
        //    });
        //},
        //
        //onCompositeCollectionRendered: function () {
        //    this.appendHtml = function (collectionView, itemView, index) {
        //        collectionView.$el.prepend(itemView.el);
        //    }
        //}
    });
});