ColibriApp.module('BooksApp.Take', function(Take, ColibriApp,
Backbone, Marionette, $, _){
    Take.MissingBook = Marionette.ItemView.extend({
            template: "#missing-book-view"
            });
    
    Take.Form = Marionette.ItemView.extend({
    

    events: {
      'click button.js-submit': 'submitClicked',
      'click button.js-close': 'closeWindow'
    },

    submitClicked: function(e){
      e.preventDefault();
      var data = Backbone.Syphon.serialize(this);
      //console.log(data)
      this.trigger("form:submit", data);
    },
    
    closeWindow: function(e){
      e.preventDefault();
      //console.log('close')
      this.trigger("dialog:close");
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
    
    Take.Book = ColibriApp.BooksApp.Take.Form.extend({
        
        template: "#book-where-is-form",
        
        templateHelpers:function(){

            return {
                taker: ColibriApp.user
            }
        },

        initialize: function () {
            this.title = "Registra il prestito" ;
        },

        onRender: function () {
           // console.log(this.options)
            //if (this.options.generateTitle) {
            //    console.log('eppure..')
            //    var $title = $('<h3>', {
            //        text: this.title
            //    });
            //    this.$el.prepend($title);
            //}
            this.$(".js-submit").text("Procedi");
            this.$(".js-close").hide();
            
        },
        
        onShowSuccess: function(msg){
            this.$(".book-where-is-form-msg").html(msg).addClass("text-success");
            this.$(".js-submit").hide();
          //  this.$(".js-close").show();
        }

        });
    });