ColibriApp.module("HeaderApp.List", function(List, ColibriApp, Backbone, Marionette, $, _){
  List.Controller = {
    listHeader: function(){
      var links = ColibriApp.request("header:entities");
      var headers = new List.Headers({collection: links});

      headers.on("brand:clicked", function(){
        ColibriApp.trigger("mybooks:list");
      });

      headers.on("itemview:navigate", function(childView, model){
        var trigger = model.get("navigationTrigger");
        ColibriApp.trigger(trigger);
      });

      ColibriApp.headerRegion.show(headers);
    },

    setActiveHeader: function(headerUrl){
      var links = ColibriApp.request("header:entities");
      var headerToSelect = links.find(function(header){ return header.get("url") === headerUrl; });
      headerToSelect.select();
      links.trigger("reset");
    }
  };
});
