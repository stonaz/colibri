ColibriApp.module("HeaderApp.List", function(List, ColibriApp, Backbone, Marionette, $, _){
  List.Header = Marionette.ItemView.extend({
    template: "#header-link",
    tagName: "li",
    //className:"prova",

    events: {
      "click a": "navigate"
    },

    navigate: function(e){
      //e.preventDefault();
      this.trigger("navigate", this.model);
      //$("#_nav-menu ").collapse('hide');
    },

    onRender: function(){
      if(this.model.selected){
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
      "click a.brand": "brandClicked"
    },

    brandClicked: function(e){
      e.preventDefault();
      this.trigger("brand:clicked");
    }
  });
});
