ColibriApp.module("Entities", function(Entities, ColibriApp, Backbone, Marionette, $, _){
  Entities.Signin = Backbone.Model.extend({
    url: "/api/v1/account/signin/",
    defaults: {
              user: '',
              email: '',
              password: '',
              password_repeat: '',
    },
    
  });

});
