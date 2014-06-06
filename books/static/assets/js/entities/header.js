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
      { name: "MyBooks", url: "mybooks", navigationTrigger: "mybooks:list" },
      { name: "Books", url: "books", navigationTrigger: "books:list" },
      { name: "About", url: "about", navigationTrigger: "about:show" }
    ]);
  };

  var API = {
    getHeaders: function(){
      if(Entities.headers === undefined){
        initializeHeaders();
      }
      return Entities.headers;
    }
  };

  ColibriApp.reqres.setHandler("header:entities", function(){
    return API.getHeaders();
  });
});
