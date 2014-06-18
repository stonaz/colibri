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
      
      headers.on("login:clicked", function(childView){
        console.log('login controller');
        newLogin = new ColibriApp.Entities.Login();

        var view = new ColibriApp.HeaderApp.Login.LoginForm({
                        model: newLogin,
                        //asModal: true
            });
        view.on("form:submit", function (data) {
          console.log(data)
            newLogin.save(data, {
                success: function (model, response, options) {
                    //books.add(newBook);
                    console.log(newLogin);
                    var user = newLogin.attributes
                    view.trigger("dialog:close");
                    //booksListView.children.findByModel(newBook).flash("success");
                    //console.log("Login OK?");
                    ColibriApp.user=user.user;
                    ColibriApp.username=user.username;
                    ColibriApp.HeaderApp.List.Controller.listHeader();
                },
                error: function (model, xhr, options) {
                    console.log(xhr)
                    view.triggerMethod("form:data:invalid", xhr.responseJSON);
                    console.log("Something went wrong while saving the model");
                }
            });
        });

                    ColibriApp.dialogRegion.show(view);
      });

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
