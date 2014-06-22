ColibriApp.module("HeaderApp.List", function(List, ColibriApp, Backbone, Marionette, $, _){
  List.Header = Marionette.ItemView.extend({
    template: "#header-link",
    
    
    tagName: "li",
    //className:"prova",

    events: {
      "click a": "navigate",
    },
    
    navigate: function(e){
      //e.preventDefault();
      this.trigger("navigate", this.model);
      //$("#_nav-menu ").collapse('hide');
    },

    onRender: function(){
      if(this.model.selected){
        console.log("Headers rendering..")
        // add class so Bootstrap will highlight the active entry in the navbar
        this.$el.addClass("active");
      };
    }
  });

  List.Headers = Marionette.CompositeView.extend({
    template: "#header-template",
    //className: "navbar navbar-inverse navbar-fixed-top",
    className: "nav navbar-nav",
    itemView: List.Header,
    itemViewContainer: "ul",

    events: {
      "click a.brand": "brandClicked",
      "click button.js-login": "login",
      "click button.js-logout": "logout",
      "click button.js-signin": "signin"
    },

    brandClicked: function(e){
      //e.preventDefault();
      console.log('Brand clicked')
      this.trigger("brand:clicked");
    },
    
    login: function(e){
      e.preventDefault();
      this.trigger("login:clicked");
      //$("#_nav-menu ").collapse('hide');
    },
    
    logout: function(e){
      e.preventDefault();
      this.trigger("logout:clicked");
      //$("#_nav-menu ").collapse('hide');
    },
    
    signin: function(e){
      e.preventDefault();
      this.trigger("signin:clicked");
      //$("#_nav-menu ").collapse('hide');
    },
    
  });
});
