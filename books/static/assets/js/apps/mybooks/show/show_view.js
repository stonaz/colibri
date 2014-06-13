ColibriApp.module('MyBooksApp.Show', function(Show, ColibriApp,Backbone, Marionette, $, _){
    
    Show.Layout = Marionette.Layout.extend({
        template: "#book-view-layout",
        regions: {
            bookRegion: "#book-region",
            historyRegion: "#history-region"
        }
    });

    //Show.History = Marionette.ItemView.extend({
    //    onShow: function(){
    //        console.log(this.model)
    //    },
    //    template: "#book-view-history",
    //    //triggers: {
    //    //      'click button.js-new': "book:new"
    //    //}
    //});
    
    Show.HistoryDetail = Marionette.ItemView.extend({
        tagName: "tr",
        template: "#book-view-history-item",
        //events: {
        //        "click a.js-edit": "editClicked"
        //        },
        //editClicked: function(e){
        //        e.preventDefault();
        //        this.trigger("mybook:edit", this.model);
        //        }
                
        });
    
    Show.History = Marionette.CompositeView.extend({
        tagName: "table",
        template: "#book-view-history-list",
        className: "table table-hover",
        itemView: Show.HistoryDetail,
        itemViewContainer: "tbody",
        
    //    initialize: function(){
    //  this.listenTo(this.collection, "reset", function(){
    //    this.appendHtml = function(collectionView, itemView, index){
    //      collectionView.$el.append(itemView.el);
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
    
    Show.MissingBook = Marionette.ItemView.extend({
            template: "#missing-book-view"
            });
    
    Show.Book = Marionette.ItemView.extend({
            template: "#book-view",
            events: {
                    "click a.js-edit": "editClicked"
                    },
            editClicked: function(e){
                    console.log('clicked')
                    e.preventDefault();
                    this.trigger("mybook:edit", this.model);
                    }
                    
            });
    });