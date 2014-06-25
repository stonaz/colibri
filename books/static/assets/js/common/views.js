ColibriApp.module('Common.Views', function(Views, ColibriApp, Backbone, Marionette, $, _){
  Views.Loading = Marionette.ItemView.extend({
    template: "#loading-view",
    
    serializeData: function(){
      return {
        title: this.options.title || "Loading Data",
        message: this.options.message || "Please wait, data is loading."
      }
    },
    onShow: function(){
      var opts = {
        lines: 9, // The number of lines to draw
        length: 5, // The length of each line
        width: 8, // The line thickness
        radius: 8, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#000', // #rgb or #rrggbb
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: '30px', // Top position relative to parent in px
        left: 'auto' // Left position relative to parent in px
      };
      $('#spinner').spin(opts);
    }
  });
  
    Views.Error = Marionette.ItemView.extend({
    template: "#error-view",
    
    initialize: function () {
            this.title = "Ooops";
        },
    
    serializeData: function(){
      return {
        //title: this.options.title || "Error",
        message: this.options.message || "Error."
      }
    },
    onShow: function(){
      this.$el.addClass("text-error");
    },
    
    //onRender: function () {
    //        if (this.options.generateTitle) {
    //          console.log('gen title')
    //            var $title = $('<h1>', {
    //                text: this.title
    //            });
    //            //this.$el.prepend($title);
    //        }
    //        this.$(".js-submit").text("Update book");
    //    }
  });
    
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
          $(this).removeClass("bg-danger");
        });
      }

      var markErrors = function(value, key){
        console.log(value)
        var $controlGroup = $view.find("#book-" + key).parent();
        var $errorEl = $('<span>', { class: "help-inline error", text: value });
        $controlGroup.append($errorEl).addClass("bg-danger");
      }

      clearFormErrors();
      _.each(errors, markErrors);
    }
  });
    

    Views.Login = Marionette.ItemView.extend({
    template: "#login-form",

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
        var $errorEl = $('<span>', { class: "help-inline bg-danger", text: value });
        $view.append($errorEl);
      }

      clearFormErrors();
      _.each(errors, markErrors);
    }
  });   
    
    Views.MissingBook = Marionette.ItemView.extend({
            template: "#missing-book-view"
            });
    
    //Views.EditDeleteConfirm = Views.Form.extend({
    //    
    //    template: "#book-my-where-is-form",
    //    
    //    templateHelpers:function(){
    //
    //        return {
    //            taker: ColibriApp.user
    //        }
    //    },
    //
    //    initialize: function () {
    //        this.title = "Conferma modifica" ;
    //    },
    //
    //    onRender: function () {
    //        console.log(this.options)
    //        //if (this.options.generateTitle) {
    //        //    console.log('eppure..')
    //        //    var $title = $('<h3>', {
    //        //        text: this.title
    //        //    });
    //        //    this.$el.prepend($title);
    //        //}
    //        this.$(".js-submit").text("Procedi ugualmente");
    //    },
    //    
    //    onShowSuccess: function(msg){
    //        console.log('ok')
    //        this.$(".book-where-is-form-msg").html(msg).addClass("text-success");
    //    }
    //
    //    });
    
            
    Views.Signin = Marionette.ItemView.extend({
    //template: "#book-form",

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
          $(this).removeClass("bg-danger");
        });
      }

      var markErrors = function(value, key){
        console.log(value)
        var $controlGroup = $view.find("#signin-" + key).parent();
        var $errorEl = $('<span>', { class: "help-inline error", text: value });
        $controlGroup.append($errorEl).addClass("text-danger");
      }

      clearFormErrors();
      _.each(errors, markErrors);
    }
  });
  
    
});

    