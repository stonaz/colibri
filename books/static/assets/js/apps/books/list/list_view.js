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
                username: ColibriApp.username
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
        tagName: "table",
        template: "#book-list",
        className: "table table-hover",
        itemView: List.Book,
        itemViewContainer: "tbody",
        
                onRender: function(){
                        if (this.collection.length  < 1) {
                            console.log('No books to show')
                var $title = $('<tr>', {
                    text: 'No books inserted yet'
                });
                $title.addClass('bg-danger')
                this.$el.append($title);
                
            }
        },
        
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