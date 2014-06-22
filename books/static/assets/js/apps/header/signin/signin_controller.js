ColibriApp.module("HeaderApp.Signin", function (Signin, ColibriApp, Backbone, Marionette, $, _) {
    Signin.Controller = {

        signin: function () {
            newSignin = new ColibriApp.Entities.Signin();
            
            var view = new ColibriApp.HeaderApp.Signin.SigninForm({
                model: newSignin,
            });
            view.on("form:submit", function (data) {
                console.log(data)
                newSignin.save(data, {
                    success: function (model, response, options) {
                        console.log(model);
                        var login = new ColibriApp.Entities.Login({
                            "username": model.username,
                            "password": model.password_confirmation
                        });
                        console.log(login)
                        login.save(data, {
                            success: function (model, response, options) {
                                var user = model.attributes
                                view.trigger("dialog:close");
                                ColibriApp.user = user.user;
                                ColibriApp.username = user.username;
                                ColibriApp.authenticated = true;
                                ColibriApp.HeaderApp.List.Controller.listHeader();
                                ColibriApp.trigger("books:list")
                            },
                            error: function (model, xhr, options) {
                                console.log(xhr)
                                view.triggerMethod("form:data:invalid", xhr.responseJSON);
                                console.log("Something went wrong while logging in");
                            }
                        });
                    },
                    error: function (model, xhr, options) {
                        console.log(xhr)
                        view.triggerMethod("form:data:invalid", xhr.responseJSON);
                        console.log("Something went wrong while siging in");
                    }
                });
            });
            ColibriApp.dialogRegion.show(view);
        }
    };
});