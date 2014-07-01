ColibriApp.module('MyBooksApp.List', function (List, ColibriApp, Backbone, Marionette, $, _) {
    
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
        template: "#book-list-panel",
        triggers: {
              'click button.js-new': "book:new"
        }
    });
    
    List.NoBooks = Marionette.ItemView.extend({
        template: "#missing-books-view"
        });

    List.Book = Marionette.ItemView.extend({
        tagName: "tr",
        template: "#book-list-item",

        events: {
            "click": "highlightName",
                "click td a.js-show": "showClicked",
                "click td a.js-edit": "editClicked",
                "click button.js-delete": "deleteClicked",
                "click td a.js-take": "takeClicked"
        },
        flash: function (cssClass) {
            console.log('flash')
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
            this.trigger("mybook:show", this.model);
        },
        takeClicked: function (e) {
            console.log('taking back')
            e.preventDefault();
            e.stopPropagation();
            this.trigger("mybook:take", this.model);
        },
        editClicked: function (e) {
            e.preventDefault();
            e.stopPropagation();
            this.trigger("mybook:edit", this.model);
        },
        deleteClicked: function (e) {
            e.stopPropagation();
            this.trigger("mybook:delete", this.model);
        }
    });

    List.Books = Marionette.CompositeView.extend({
        //tagName: "table",
        template: "#book-list",
        //className: "table table-hover",
        itemView: List.Book,
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
        //onRender: function(){
        //                if (this.collection.length  < 1) {
        //                    console.log('No books to show')
        //        var $title = $('<tr>', {
        //            text: 'No books inserted yet'
        //        });
        //        $title.addClass('bg-danger')
        //        this.$el.append($title);
        //        
        //    }
        //},
        
    //    initialize: function(){
    //  this.listenTo(this.collection, "reset", function(){
    //    this.appendHtml = function(collectionView, itemView, index){
    //      collectionView.$el.append(itemView.el);
    //      this.render()
    //    }
    //  });
    //},
    //
    //onCompositeCollectionRendered: function(){
    //  this.appendHtml = function(collectionView, itemView, index){
    //    collectionView.$el.prepend(itemView.el);
    //  }
    //}
    });
});