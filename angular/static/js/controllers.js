angular.module('colibri')
.controller('userController', [ 'UserService','$location', function ( UserService,$location) {
    console.log('User controller created');
      var self = this;
      self.userService = UserService;
      self.user = angular.module('colibri').user;

      // Check if the user is logged in when the application
      // loads
      // User Service will automatically update isLoggedIn
      // after this call finishes
      UserService.session().then(function(response){
        self.user = response.data.username;
        $location.path('/books');
        console.log(response);
        return false;
        },
        function(errResponse) {
        console.log(errResponse);
    });
    self.login_data = {};

    self.login = function(){
        self.loading = true;
        UserService.login(self.login_data).then(function(response){
        self.user = response.data.username;
        console.log(response);
        console.log(self.user);
        self.loading = false;
        $location.path('/books');
        return false;
        },
        function(errResponse) {
             self.error = errResponse.data['non_field_errors'];
        console.log(errResponse.data);
    });
    };    
}])
.controller('lostPasswordController', ['UserService',function ( UserService) {
    console.log('lost controller created');
    
     var self=this;
    self.request = {}; 
    self.resetPassword = function(){
        console.log(self.request);
        self.errResponse = '';
        self.response="";
        UserService.resetPassword(self.request).then(function(response){     
        console.log(response);
        self.response="Ti è stata spedita una mail con le istruzioni per il reset della password";
       // $location.path('/mybooks');
        return false;
        },
        function(errResponse) {
        console.log(errResponse.data);
                var keys = Object.keys(errResponse.data);

for (var i = 0; i < keys.length; i++) {
    var val = errResponse.data[keys[i]];
    console.log(val[0]);
    self.errResponse += val[0] + '\n';
}
        
    });
    };
}])
.controller('profileController', ['profileService','$location', function ( profileService,$location) {
    console.log('Profile controller created');
    
     var self=this;
     self.user = angular.module('colibri').user;
     self.username = angular.module('colibri').username;
     self.profile_data = {};
     
    
        profileService.getProfileDetails(self.username).then(function(response){     
        console.log(response);
        self.profile_data=response.data;
        return false;
        },
        function(errResponse) {
        console.log(errResponse.data);
    });
    self.updateprofile = function(){
        self.errResponse = '';
        self.response="";
        console.log(self.profile_data);
        self.profile_data.owner = self.user;
        profileService.updateProfile(self.username,self.profile_data).then(function(response){     
        console.log(response);
        self.response="Modifica profilo effettuata";
       // $location.path('/mybooks');
        return false;
        },
        function(errResponse) {
        console.log(errResponse.data);
                var keys = Object.keys(errResponse.data);

for (var i = 0; i < keys.length; i++) {
    var val = errResponse.data[keys[i]];
    console.log(val[0]);
    self.errResponse += val[0] + '\n';
}
        
    });
    };
}])
.controller('signinController', [ 'UserService','$location', function ( UserService,$location) {
    console.log('Signin controller created');
    var self=this;
    
    self.signin_data = {};
    self.signin = function(){
        self.showLogin=false;
        self.errResponse = '';
        console.log('trying to sign in');
        UserService.signin(self.signin_data).then(function(response){
            
            self.user = response.data.username;
            console.log(self.user);
        console.log(response);
        self.showLogin=true;
        console.log(self.showLogin);
       // $location.path('/books');
        return false;
        },
        function(errResponse) {
        self.errResponse = '';   
        console.log(errResponse.data);
        var keys = Object.keys(errResponse.data);

for (var i = 0; i < keys.length; i++) {
    var val = errResponse.data[keys[i]];
  //  console.log(val[0]);
    self.errResponse += val[0] + '\n';
}
    });
     };   
     
}])
.controller('logoutController', [ 'UserService','$location', function ( UserService,$location) {
    console.log('Logout controller created');
    var self=this;
        UserService.logout().then(function(response){
        console.log(response);
        $location.path('/');
        return false;
        },
        function(errResponse) {
        console.log(errResponse.data);
    });
     
}])
.controller('addBookController', ['bookService','$location', function ( bookService,$location) {
    console.log('Add Books controller created');
    
     var self=this;
     self.user = angular.module('colibri').user;
     self.username = angular.module('colibri').username;
     self.book_data = {};

    self.addbook = function(){
        //console.log(self.book_data);
        self.book_data.owner = self.user;
        bookService.addBook(self.book_data).then(function(response){     
        console.log(response);
        self.response="Il libro '" + self.book_data.title +"' è stato aggiunto ai tuoi libri";
        self.book_data = {};
       // $location.path('/mybooks');
        return false;
        },
        function(errResponse) {
        console.log(errResponse.data);
    });
    };
    
    console.log(self.user);
}])
.controller('updateBookController', ['bookService','$routeParams','$location', function ( bookService,$routeParams,$location) {
    console.log('Update Books controller created');
    
     var self=this;
     self.user = angular.module('colibri').user;
     self.username = angular.module('colibri').username;
     self.book_data = {};
     
    
        bookService.getBookDetails(self.username,$routeParams.code).then(function(response){     
        console.log(response);
        self.book_data=response.data;
        return false;
        },
        function(errResponse) {
        console.log(errResponse.data);
    });
    self.updatebook = function(){
        console.log(self.book_data);
        self.book_data.owner = self.user;
        bookService.updateBook(self.username,$routeParams.code,self.book_data).then(function(response){     
        console.log(response);
        self.response="Modifica effettuata";
       // $location.path('/mybooks');
        return false;
        },
        function(errResponse) {
        console.log(errResponse.data);
    });
    };
    
    
    console.log(self.user);
}])
.controller('deleteBookController', ['bookService','$routeParams','$location', function ( bookService,$routeParams,$location) {
    console.log('Update Books controller created');
    
     var self=this;
     self.user = angular.module('colibri').user;
     self.username = angular.module('colibri').username;
     self.book_data = {};
     
    
        bookService.getBookDetails(self.username,$routeParams.code).then(function(response){     
        console.log(response);
        self.book_data=response.data;
        return false;
        },
        function(errResponse) {
        console.log(errResponse.data);
    });
    self.deletebook = function(){
        console.log(self.book_data);
        self.book_data.owner = self.user;
        bookService.deleteBook(self.username,$routeParams.code,self.book_data).then(function(response){     
        console.log(response);
        $location.path('/mybooks');
        return false;
        },
        function(errResponse) {
        console.log(errResponse.data);
    });
    };
    
    
    console.log(self.user);
}])
.controller('booksController', ['bookService','profileService', function ( bookService, profileService) {
    console.log('Books controller created');
    
     var self=this;
     self.viewuser=[];
     self.viewOwnerDetails = [];
     self.loading = true;
     self.user = angular.module('colibri').user;
     self.username = angular.module('colibri').username;
        bookService.getBooks().then(function(response){
        self.books = response.data;
        console.log(response);
        self.loading = false;
        return false;
        },
        function(errResponse) {
        console.log(errResponse.data);
    });
    self.searchbook = function(){
        self.loading = true;
        console.log(self.search_data);
        bookService.searchBook(self.search_data).then(function(response){     
        console.log(response);
        self.books = response.data;
        self.loading = false;
        return false;
        },
        function(errResponse) {
        console.log(errResponse.data);
    });
    };
    self.showOwner = function(id,user){
        console.log(id);
        console.log(user);
        profileService.getProfileDetails(user).then(function(response){     
        console.log(response);
     
        //console.log(response.data.email);
        //console.log(response.data.publish_email);
        //console.log(response.data.publish_phone);
        //console.log(response.data.phone);
        self.viewOwnerDetails[id] ={};
        if (response.data.publish_email === false){
            self.viewOwnerDetails[id].email = 'Non disponibile';
        }
        else{
            self.viewOwnerDetails[id].email = response.data.email;
        }
        if (response.data.publish_phone === false|| response.data.phone === ''){
            self.viewOwnerDetails[id].phone = 'Non disponibile';
        }
        else{
            self.viewOwnerDetails[id].phone = response.data.phone;
        }
        return false;
        },
        function(errResponse) {
        console.log(errResponse.data);
    });
        self.viewuser[id]=true;
    };
    self.hideOwner = function(id){
        console.log(id);
        self.viewuser[id]=false;
    };
    console.log(self.user);
}])
.controller('myBooksController', ['bookService', function ( bookService) {
    console.log('My Books controller created');
    
     var self=this;
     self.user = angular.module('colibri').user;
     self.username = angular.module('colibri').username;
        bookService.getMyBooks(self.username).then(function(response){
        self.books = response.data;
        console.log(response);
        return false;
        },
        function(errResponse) {
        console.log(errResponse.data);
    });
    
    console.log(self.username);
}]);

