ColibriApp.module('Entities', function(Entities, ColibriApp, Backbone, Marionette, $, _){
  Entities.BorrowedBook = Backbone.Model.extend({
    urlRoot: function(){
      return "/api/v1/"+ColibriApp.username+"/borrowed_books/";
    },
    
    defaults: {
              author: '',
              title: '',
              where_is: '',
              owner: '',
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

  Entities.BorrowedBookCollection = Backbone.PageableCollection.extend({
    url: function(){
      //console.log(ColibriApp.username)
      return "/api/v1/"+ColibriApp.username+"/borrowed_books/";
    },
    model: Entities.Book,
    comparator: function(item) { return item.get('book_author').toLowerCase(); },

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
      var books = new Entities.BorrowedBookCollection();
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

    getBookEntity: function(bookId){
      var book = new Entities.BorrowedBook({id: bookId});
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

  ColibriApp.reqres.setHandler("book_borrowed:entities", function(){
    return API.getBookEntities();
  });

  ColibriApp.reqres.setHandler("book_borrowed:entity", function(id){
    return API.getBookEntity(id);
  });
});