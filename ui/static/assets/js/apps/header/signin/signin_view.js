ColibriApp.module("HeaderApp.Signin", function(Signin, ColibriApp, Backbone, Marionette, $, _){
    Signin.SigninForm = ColibriApp.Common.Views.Signin.extend({
        template: "#signin-form",

        initialize: function () {
            this.title = "Sign in ";
        },
        //
        //onRender: function () {
        //    if (this.options.generateTitle) {
        //        var $title = $('<h1>', {
        //            text: this.title
        //        });
        //        this.$el.prepend($title);
        //    }
        //    this.$(".js-submit").text("Update book");
        //}

    });
});