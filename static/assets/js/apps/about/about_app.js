ColibriApp.module("AboutApp", function(AboutApp, ColibriApp, Backbone, Marionette, $, _){
  AboutApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "about" : "showAbout"
    }
  });

  var API = {
    showAbout: function(){
      AboutApp.Show.Controller.showAbout();
      ColibriApp.execute("set:active:header", "about");
    }
  };

  ColibriApp.on("about:show", function(){
    ColibriApp.navigate("about");
    API.showAbout();
  });

  ColibriApp.addInitializer(function(){
    new AboutApp.Router({
      controller: API
    });
  });
});
