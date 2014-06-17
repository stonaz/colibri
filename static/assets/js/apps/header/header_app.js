ColibriApp.module("HeaderApp", function(Header, ColibriApp, Backbone, Marionette, $, _){
  var API = {
    listHeader: function(){
      Header.List.Controller.listHeader();
    }
  };

  ColibriApp.commands.setHandler("set:active:header", function(name){
    ColibriApp.HeaderApp.List.Controller.setActiveHeader(name);
  });

  Header.on("start", function(){
    API.listHeader();
  });
});
