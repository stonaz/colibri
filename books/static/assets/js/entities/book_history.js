ColibriApp.module('Entities', function(Entities, ColibriApp, Backbone, Marionette, $, _){
  Entities.BookHistory  = Backbone.Model.extend({
    urlRoot: "/api/v1/book_history/",
    
    defaults: {
        "book": 1, 
        "took_from": 3, 
        "took_from_name": "sara", 
        "given_to": 2, 
        "given_to_name": "stefano",
    },
    
    //validate: function(attrs, options) {
    //  var errors = {}
    //  if (! attrs.author) {
    //    errors.author = "cannott be blank";
    //  }
    //  if (! attrs.title) {
    //    errors.title = "cannott be blank";
    //  }
    //  else{
    //    console.log('not blank')
    //  if (attrs.title.length < 2) {
    //    errors.title = "is too short";
    //  }
    //  }
    //  if( ! _.isEmpty(errors)){
    //    console.log(errors)
    //    return errors;
    //  
    //  }
    //}
  });

  //Entities.configureStorage(Entities.Book);

  Entities.BookHistoryCollection = Backbone.Collection.extend({
    initialize: function(models, options) {
    this.url = "/api/v1/book_history/" + options.id;
  },
    //url: "/api/v1/book_history/",
    model: Entities.BookHistory,
    //comparator: "author"
  });

  //Entities.configureStorage(Entities.BookCollection);

  var API = {
    getBookHistoryEntities: function(bookID){
      var bookHistoryList = new Entities.BookHistoryCollection([], { id: bookID });
      var defer = $.Deferred();
      bookHistoryList.fetch({
        success: function(data){          
          defer.resolve(data);
          //console.log(data)
          },
        error: function(data){          
          console.log(data);
          }
        });             
      var promise = defer.promise();
      $.when(promise).done(function(bookHistoryList){
        if(bookHistoryList.length === 0){
          // if we don't have any books yet, create some for convenience
          var models = [];
          bookHistoryList.reset(models);
        }
      })
      return promise;
    
    },

    getBookHistoryEntity: function(bookHistoryId){
      var bookHistoryDetail = new Entities.BookHistory({id: bookHistoryId});
      var defer = $.Deferred();
      
        bookHistoryDetail.fetch({
          success: function(data){
          defer.resolve(data);
          },
          error: function(data){
          defer.resolve(undefined);
          } 
      });
      
      return defer.promise();
    }
  };

  ColibriApp.reqres.setHandler("book_history:entities", function(bookID){
    return API.getBookHistoryEntities(bookID);
  });

  ColibriApp.reqres.setHandler("book_history:entity", function(id){
    return API.getBookHistoryEntity(id);
  });
});