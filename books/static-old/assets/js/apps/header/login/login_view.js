ColibriApp.module("HeaderApp.Login", function(Login, ColibriApp, Backbone, Marionette, $, _){
    Login.LoginForm = ColibriApp.Common.Views.Login.extend({

        initialize: function () {
            this.title = "Login ";
        },
        
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