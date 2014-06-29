ColibriApp.module("Entities", function(Entities, ColibriApp, Backbone, Marionette, $, _){
  Entities.Header = Backbone.Model.extend({
    initialize: function(){
      var selectable = new Backbone.Picky.Selectable(this);
      _.extend(this, selectable);
    }
  });

  Entities.HeaderCollection = Backbone.Collection.extend({
    model: Entities.Header,

    initialize: function(){
      var singleSelect = new Backbone.Picky.SingleSelect(this);
      _.extend(this, singleSelect);
    }
  });

  var initializeHeaders = function(){
    Entities.headers = new Entities.HeaderCollection([
      { name: "Home", url: "about", navigationTrigger: "about:show" },
      //{ name: "Books", url: "books", navigationTrigger: "books:list" },
      //{ name: "MyBooks", url: "mybooks", navigationTrigger: "mybooks:list" },

    ]);
    if (ColibriApp.authenticated) {
      console.log('app auth ok')
      console.log(ColibriApp.authenticated)
      Entities.headers.add({ name: "Books", url: "books", navigationTrigger: "books:list" });
      Entities.headers.add({ name: "MyBooks", url: "mybooks", navigationTrigger: "mybooks:list" });
      Entities.headers.add({ name: "Libri in prestito", url: "borrowedbooks", navigationTrigger: "borrowedbooks:list" });
    }
  };

  var API = {
    getHeaders: function(){
      //if(Entities.headers === undefined){
      //  initializeHeaders();
      //}
      initializeHeaders();
      console.log('initializing headers')
      return Entities.headers;
    }
  };

  ColibriApp.reqres.setHandler("header:entities", function(){
    return API.getHeaders();
  });
});
