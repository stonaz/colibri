ColibriApp.module("HeaderApp.Login", function (Login, ColibriApp, Backbone, Marionette, $, _) {
    Login.Controller = {

        login: function () {
            newLogin = new ColibriApp.Entities.Login();

            var view = new ColibriApp.HeaderApp.Login.LoginForm({
                model: newLogin,
            });
            view.on("form:submit", function (data) {
                console.log(data)
                newLogin.save(data, {
                    success: function (model, response, options) {
                        console.log(newLogin);
                        var user = newLogin.attributes
                        view.trigger("dialog:close");
                        ColibriApp.user = user.user;
                        ColibriApp.username = user.username;
                        ColibriApp.authenticated=true;
                        //headers.render()
                        ColibriApp.HeaderApp.List.Controller.listHeader();
                    },
                    error: function (model, xhr, options) {
                        console.log(xhr)
                        view.triggerMethod("form:data:invalid", xhr.responseJSON);
                        console.log("Something went wrong while logging in");
                    }
                });
            });
            ColibriApp.dialogRegion.show(view);
        }
    };
});