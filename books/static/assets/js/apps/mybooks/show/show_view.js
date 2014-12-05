ColibriApp.module('MyBooksApp.Show', function(Show, ColibriApp,Backbone, Marionette, $, _){
    
    Show.Layout = Marionette.Layout.extend({
        template: "#book-view-layout",
        regions: {
           bookRegion: "#book-history-title-region",
            historyRegion: "#history-region"
        }
    });
    
    
    
    
    
    Show.HistoryDetail = Marionette.ItemView.extend({
        tagName: "tr",
        template: "#book-view-history-item",
        templateHelpers: function () {
                return {
                        showDate: function(){
                            var months=['Gennaio',
                                        'Febbraio',
                                        'Marzo',
                                        'Aprile',
                                        'Maggio',
                                        'Giugno',
                                        'Luglio',
                                        'Agosto',
                                        'Settembre',
                                        'Ottobre',
                                        'Novembre',
                                        'Dicembre'
                                        ]
                            var d = new Date(this.created);
                        return d.getUTCDay() + " " + months[d.getUTCMonth()] + " " + d.getUTCFullYear();
                            },

                        
                      };
            }
        });
    
    Show.History = Marionette.CompositeView.extend({
        tagName: "table",
        template: "#book-view-history-list",
        className: "table table-hover table-condensed",
        itemView: Show.HistoryDetail,
        itemViewContainer: "tbody",
        
    });
    
    Show.MissingBook = Marionette.ItemView.extend({
            template: "#missing-book-view"
            });
    
    Show.Book = Marionette.ItemView.extend({
            template: "#book-view",
            tagName: "p"
                    
            });
    });