ColibriApp.module('Entities', function(Entities, ColibriApp, Backbone, Marionette, $, _){
  Entities.BookWhereIs = Backbone.Model.extend({
    urlRoot: "/api/v1/book_where_is",
    
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

  Entities.BookWhereIsCollection = Backbone.Collection.extend({
    initialize: function(models, options) {
    this.url = "/api/v1/book_where_is" + options.id;
  },
    //url: "/api/v1/book_history/",
    model: Entities.BookWhereIs,
    //comparator: "author"
  });

  //Entities.configureStorage(Entities.BookCollection);

  var API = {
    getBookWhereIsEntities: function(bookID){
      var bookWhereIsList = new Entities.BookWhereIsCollection([], { id: bookID });
      var defer = $.Deferred();
      bookWhereIsList.fetch({
        success: function(data){          
          defer.resolve(data);
          //console.log(data)
          },
        error: function(data){          
          console.log(data);
          }
        });             
      var promise = defer.promise();
      $.when(promise).done(function(bookWhereIsList){
        if(bookWhereIsList.length === 0){
          // if we don't have any books yet, create some for convenience
          var models = [];
          bookWhereIsList.reset(models);
        }
      })
      return promise;
    
    },

    getBookWhereIsEntity: function(bookWhereIsId){
      var bookWhereIsDetail = new Entities.BookWhereIs({id: bookWhereIsId});
      var defer = $.Deferred();
      
        bookWhereIsDetail.fetch({
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

  ColibriApp.reqres.setHandler("book_where_is:entities", function(bookID){
    return API.getBookWhereIsEntities(bookID);
  });

  ColibriApp.reqres.setHandler("book_where_is:entity", function(id){
    return API.getBookWhereIsEntity(id);
  });
});