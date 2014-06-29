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
      
      headers.on("signin:clicked", function(){
        console.log('signin controller');
        ColibriApp.trigger('header:signin');
      });
      
      headers.on("login:clicked", function(){
        console.log('login controller');
        ColibriApp.trigger('header:login');
      });
      
      headers.on("logout:clicked", function(){
        console.log('logging out')
        var csfrtoken= $.cookie('csrftoken')
        var self= this
        Backbone.ajax({
                url: "/api/v1/account/logout/",
                method:"POST",
                beforeSend: function(xhr){
                  xhr.setRequestHeader("X-CSRFToken", csfrtoken);
                  },
                data: "",
                success: function (val) {
                      console.log('happilylogged out');
                      ColibriApp.user=undefined;
                      ColibriApp.username=undefined;
                      ColibriApp.authenticated=false;
                      //self.render()
                      ColibriApp.trigger("about:show")
                      ColibriApp.HeaderApp.List.Controller.listHeader();
                      },
                error: function (model, xhr, options) {
                    console.log(xhr)
                    //view.triggerMethod("form:data:invalid", xhr.responseJSON);
                    console.log("Something went wrong while logging out");
                } 
        });

      })
      

      ColibriApp.headerRegion.show(headers);
    },

    setActiveHeader: function(headerUrl){
      console.log('set active')
      var links = ColibriApp.request("header:entities");
      var headerToSelect = links.find(function(header){ return header.get("url") === headerUrl; });
      console.log(headerToSelect)
      headerToSelect.select();
      links.trigger("reset");
    }
  };
});
