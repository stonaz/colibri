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
        console.log(errResponse.data);
    });
    self.login_data = {};

    self.login = function(){
        UserService.login(self.login_data).then(function(response){
        self.user = response.data.username;
        console.log(response);
        console.log(self.user);
        $location.path('/books');
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
.controller('booksController', ['sendData', function ( sendData) {
    console.log('Books controller created');
    
     var self=this;
     self.user = angular.module('colibri').user;
        sendData.getBooks().then(function(response){
        self.books = response.data;
        console.log(response);
        return false;
        },
        function(errResponse) {
        console.log(errResponse.data);
    });
    
    console.log(self.user);
}]);

