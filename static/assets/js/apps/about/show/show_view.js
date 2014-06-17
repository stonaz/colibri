ColibriApp.module("AboutApp.Show", function(Show, ColibriApp, Backbone, Marionette, $, _){
  Show.Message = Marionette.ItemView.extend({
    template: "#about-message"
  });
});
