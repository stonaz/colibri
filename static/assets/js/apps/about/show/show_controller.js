ColibriApp.module("AboutApp.Show", function(Show, ColibriApp, Backbone, Marionette, $, _){
  Show.Controller = {
    showAbout: function(){
      var view = new Show.Message();
      ColibriApp.mainRegion.show(view);
    }
  };
});
