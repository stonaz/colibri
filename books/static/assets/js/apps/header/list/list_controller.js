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
      
      headers.on("login:clicked", function(){
        console.log('login controller');
        ColibriApp.trigger('header:login');
        //newLogin = new ColibriApp.Entities.Login();
        //
        //var view = new ColibriApp.HeaderApp.Login.LoginForm({
        //                model: newLogin,
        //    });
        //view.on("form:submit", function (data) {
        //  console.log(data)
        //    newLogin.save(data, {
        //        success: function (model, response, options) {
        //            console.log(newLogin);
        //            var user = newLogin.attributes
        //            view.trigger("dialog:close");
        //            ColibriApp.user=user.user;
        //            ColibriApp.username=user.username;
        //            headers.render()
        //            ColibriApp.HeaderApp.List.Controller.listHeader();
        //        },
        //        error: function (model, xhr, options) {
        //            console.log(xhr)
        //            view.triggerMethod("form:data:invalid", xhr.responseJSON);
        //            console.log("Something went wrong while logging in");
        //        }
        //    });
        //});
        //
        //            ColibriApp.dialogRegion.show(view);
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
      var links = ColibriApp.request("header:entities");
      var headerToSelect = links.find(function(header){ return header.get("url") === headerUrl; });
      headerToSelect.select();
      links.trigger("reset");
    }
  };
});
