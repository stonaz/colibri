ColibriApp.module('MyBooksApp.Common.Views', function(Views, ColibriApp, Backbone, Marionette, $, _){
  Views.Form = Marionette.ItemView.extend({
    template: "#book-form",

    events: {
      'click button.js-submit': 'submitClicked'
    },

    submitClicked: function(e){
      e.preventDefault();
      var data = Backbone.Syphon.serialize(this);
      this.trigger("form:submit", data);
    },

    onFormDataInvalid: function(errors){
      //form_errors = errors.split(',')
      console.log(errors)
      var $view = this.$el;

      var clearFormErrors = function(){
        var $form = $view.find("form");
        $form.find(".help-inline.error").each(function(){
          $(this).remove();
        });
        $form.find(".control-group.error").each(function(){
          $(this).removeClass("error");
        });
      }

      var markErrors = function(value, key){
        console.log(value)
        var $controlGroup = $view.find("#book-" + key).parent();
        var $errorEl = $('<span>', { class: "help-inline error", text: value });
        $controlGroup.append($errorEl).addClass("error");
      }

      clearFormErrors();
      _.each(errors, markErrors);
    }
  });
  
      Views.EditDeleteConfirm = Views.Form.extend({
        
        template: "#book-my-where-is-form",
        
        templateHelpers:function(){

            return {
                taker: ColibriApp.user,
                delete_warn : this.delete_warn
            }
        },

        initialize: function () {
            this.title = this.options.title ;
            this.delete_warn = this.options.delete_warn ;
            console.log(this.options)
        },

        onRender: function () {
            console.log(this.options)
            //if (this.options.generateTitle) {
            //    console.log('eppure..')
            //    var $title = $('<h3>', {
            //        text: this.title
            //    });
            //    this.$el.prepend($title);
            //}
            this.$(".js-submit").text("Procedi ugualmente");
        },
        
        onShowSuccess: function(msg){
            console.log('ok')
            this.$(".book-where-is-form-msg").html(msg).addClass("text-success");
        }

        });
});