ColibriApp.module('Entities', function(Entities, ColibriApp, Backbone, Marionette, $, _){
  Entities.Book = Backbone.Model.extend({
    urlRoot: "/api/v1/"+ColibriApp.username+"/books/",
    
    defaults: {
              author: '',
              title: '',
              where_is: ColibriApp.user,
              owner:ColibriApp.user,
              //dove_sta:''
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

  Entities.BookCollection = Backbone.Collection.extend({
    url: "/api/v1/"+ColibriApp.username+"/books/",
    model: Entities.Book,
    comparator: "author"
  });

  //Entities.configureStorage(Entities.BookCollection);

  var initializeBooks = function(){
    var books = new Entities.BookCollection([
      { id: 1, author: 'Alice', title: 'Arten', phoneNumber: '555-0184' },
      { id: 2, author: 'Bob', title: 'Brigham', phoneNumber: '555-0163' },
      { id: 3, author: 'Charlie', title: 'Campbell', phoneNumber: '555-0129' }
    ]);
    books.forEach(function(book){
      book.save();
    });
    return books.models;
  };

  var API = {
    getBookEntities: function(){
      var books = new Entities.BookCollection();
      var defer = $.Deferred();
      books.fetch({
        success: function(data){          
          defer.resolve(data);
          //console.log(data)
          },
        error: function(data){          
          alert(data);
          }
        });             
      var promise = defer.promise();
      $.when(promise).done(function(books){
        if(books.length === 0){
          // if we don't have any books yet, create some for convenience
          var models = initializeBooks();
          books.reset(models);
        }
      })
      return promise;
    
    },

    getBookEntity: function(bookId){
      var book = new Entities.Book({id: bookId});
      var defer = $.Deferred();
      
        book.fetch({
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

  ColibriApp.reqres.setHandler("book:entities", function(){
    return API.getBookEntities();
  });

  ColibriApp.reqres.setHandler("book:entity", function(id){
    return API.getBookEntity(id);
  });
});