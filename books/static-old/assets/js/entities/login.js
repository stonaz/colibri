ColibriApp.module("Entities", function(Entities, ColibriApp, Backbone, Marionette, $, _){
  Entities.Login = Backbone.Model.extend({
    url: "/api/v1/account/login/",
    defaults: {
              user: '',
              password: '',
    },
    
  });

});
