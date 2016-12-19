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
        $location.path('/mybooks');
        console.log(response);
        return false;
        },
        function(errResponse) {
        console.log(errResponse);
    });
    self.login_data = {};

    self.login = function(){
        UserService.login(self.login_data).then(function(response){
        self.user = response.data.username;
        console.log(response);
        console.log(self.user);
        $location.path('/mybooks');
        return false;
        },
        function(errResponse) {
        console.log(errResponse.data);
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
        console.log(self.book_data);
        self.book_data.owner = self.user;
        bookService.addBook(self.book_data).then(function(response){     
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
        $location.path('/mybooks');
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
.controller('booksController', ['bookService', function ( bookService) {
    console.log('Books controller created');
    
     var self=this;
     self.user = angular.module('colibri').user;
     self.username = angular.module('colibri').username;
        bookService.getBooks().then(function(response){
        self.books = response.data;
        console.log(response);
        return false;
        },
        function(errResponse) {
        console.log(errResponse.data);
    });
    
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

