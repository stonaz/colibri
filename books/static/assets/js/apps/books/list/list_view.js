ColibriApp.module('BooksApp.List', function (List, ColibriApp, Backbone, Marionette, $, _) {
  
    List.Layout = Marionette.Layout.extend({
        template: "#book-list-layout",
        regions: {
            panelRegion: "#panel-region",
            booksRegion: "#books-region"
        }
    });

    List.Panel = Marionette.ItemView.extend({
        template: "#book-all-list-panel",
        
        templateHelpers:function(){
            return {
                taker: ColibriApp.user
            }
        },
        
        triggers: {
              'click button.js-new': "book:new"
        }
    });

    List.Book = Marionette.ItemView.extend({
        tagName: "tr",
        template: "#book-all-list-item",
        events: {
            "click": "highlightName",
            "click td a.js-show": "showClicked",
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
    });

    List.Books = Marionette.CompositeView.extend({
        tagName: "table",
        template: "#book-list",
        className: "table table-hover",
        itemView: List.Book,
        itemViewContainer: "tbody",
        
        initialize: function(){
      this.listenTo(this.collection, "reset", function(){
        this.appendHtml = function(collectionView, itemView, index){
          collectionView.$el.append(itemView.el);
        }
      });
    },

    onCompositeCollectionRendered: function(){
      this.appendHtml = function(collectionView, itemView, index){
        collectionView.$el.prepend(itemView.el);
      }
    }
    });
});