ColibriApp.module('Entities', function(Entities, ColibriApp, Backbone, Marionette, $, _){
  Entities.BookAll = Backbone.Model.extend({
    urlRoot: "/api/v1/books/",
    
    defaults: {
              author: '',
              title: '',
              where_is: ColibriApp.user,
              owner:ColibriApp.user,
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

  Entities.BookAllCollection = Backbone.PageableCollection.extend({
    url: "/api/v1/books/",
    model: Entities.BookAll,
    comparator: function(item) { return item.get('author').toLowerCase(); },

    
    
    mode: "client",
    
    state: {

    // You can use 0-based or 1-based indices, the default is 1-based.
    // You can set to 0-based by setting ``firstPage`` to 0.
    firstPage: 1,

    // Set this to the initial page index if different from `firstPage`. Can
    // also be 0-based or 1-based.
    currentPage: 1,

    pageSize: 10
  },
  });
  
  // Entities.FilteredBookAllCollection = Backbone.PageableCollection.extend({
  //  url: "/api/v1/books/",
  //  model: Entities.BookAll,
  //  comparator: "author",
  //  
  //  mode: "client",
  //  
  //  state: {
  //
  //  // You can use 0-based or 1-based indices, the default is 1-based.
  //  // You can set to 0-based by setting ``firstPage`` to 0.
  //  firstPage: 1,
  //
  //  // Set this to the initial page index if different from `firstPage`. Can
  //  // also be 0-based or 1-based.
  //  currentPage: 1,
  //
  //  pageSize: 10
  //},
  //});

  //Entities.configureStorage(Entities.BookCollection);

  var API = {
    getBookEntities: function(){
      var books = new Entities.BookAllCollection();
      //books.setPageSize(2)
      var defer = $.Deferred();
      books.fetch({
        success: function(data){          
          defer.resolve(data);
          //console.log(data)
          },
        error: function(data,jqXHR){
          if (jqXHR.status === 403) {
            ColibriApp.trigger('header:login');
          defer.resolve(data);
          //alert('Effettuare prima il login');
          console.log(jqXHR.status)
          }
          else{
            ColibriApp.trigger("about:show");
          }
          
          }
        });             
      var promise = defer.promise();
      return promise;
    
    },
    
    getFilteredBookEntities: function(filter){
      var books = new Entities.BookAllCollection({
        
      });
      books.url="/api/v1/books/?search="+filter
      //console.log(books)
      //books.setPageSize(2)
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
      return promise;
    
    },   

    getBookEntity: function(bookId){
      console.log('Showing book to be taken')
      var book = new Entities.BookAll({id: bookId});
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

  ColibriApp.reqres.setHandler("book_all:entities", function(){
    return API.getBookEntities();
  });
  
  ColibriApp.reqres.setHandler("book_all:entities:filter", function(filter){
    console.log(filter)
    if (filter == "" | filter === undefined) {
      return API.getBookEntities();
    }
    return API.getFilteredBookEntities(filter);
  });

  ColibriApp.reqres.setHandler("book_all:entity", function(id){
    return API.getBookEntity(id);
  });
});