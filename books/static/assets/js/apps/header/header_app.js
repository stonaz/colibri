ColibriApp.module("HeaderApp", function(Header, ColibriApp, Backbone, Marionette, $, _){
  var API = {
    listHeader: function(){
      Header.List.Controller.listHeader();
    },
      login: function(){
      Header.Login.Controller.login();
    },
      signin: function(){
      Header.Signin.Controller.signin();
    },
    
  };

  ColibriApp.commands.setHandler("set:active:header", function(name){
    ColibriApp.HeaderApp.List.Controller.setActiveHeader(name);
  });

  Header.on("start", function(){
    API.listHeader();
  });
  
  ColibriApp.on("header:login", function(){
    API.login();
    });
  
  ColibriApp.on("header:signin", function(){
    API.signin();
    });
});
