ColibriApp.module('BooksApp.Sendmail', function(Sendmail, ColibriApp,
Backbone, Marionette, $, _){
    Sendmail.MissingBook = Marionette.ItemView.extend({
            template: "#missing-book-view"
            });
    
    Sendmail.Form = Marionette.ItemView.extend({
    

    events: {
      'click button.js-submit': 'submitClicked',
    },

    submitClicked: function(e){
      e.preventDefault();
      var data = Backbone.Syphon.serialize(this);
      console.log(data)
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
    Sendmail.Book = ColibriApp.BooksApp.Sendmail.Form.extend({
        
        template: "#book-where-is-form-sendmail",
        
        templateHelpers:function(){

            return {
                taker: ColibriApp.user
            }
        },

        initialize: function () {
            this.title = "Contatta chi ha questo libro" ;
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
            this.$(".js-submit").text("Invia mail");
        },
        
        onShowSuccess: function(msg){
            console.log('ok')
            this.$(".book-where-is-form-msg").html(msg).removeClass("text-danger").addClass("text-success");
            this.$(".js-submit").hide();
        },
        
        onShowError: function(msg){
            console.log('ko')
            this.$(".book-where-is-form-msg").html(msg).addClass("text-danger");
            //this.$(".js-submit").hide();
        }

        });
    });