ColibriApp.module('BooksApp.Take', function(Take, ColibriApp,
Backbone, Marionette, $, _){
    Take.MissingBook = Marionette.ItemView.extend({
            template: "#missing-book-view"
            });
    Take.Book = ColibriApp.BooksApp.Common.Views.Form.extend({
        
        template: "#book-where-is-form",
        
        templateHelpers:function(){

            return {
                taker: ColibriApp.user
            }
        },

        initialize: function () {
            this.title = "Take book" ;
        },

        onRender: function () {
            console.log(this.options)
            //if (this.options.generateTitle) {
            //    console.log('eppure..')
            //    var $title = $('<h3>', {
            //        text: this.title
            //    });
            //    this.$el.prepend($title);
            //}
            this.$(".js-submit").text("Take book");
        },
        
        onShowSuccess: function(msg){
            console.log('ok')
            this.$(".book-where-is-form-msg").html(msg).addClass("text-success");
        }

        });
    });