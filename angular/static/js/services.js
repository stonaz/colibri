angular.module('colibri')
.factory('bookService', ['$http',
function ($http) {
    console.log('services created');
return {
        searchBook: function(search) {
            
            var url = '/api/v1/books/?search='+search;
            return $http.get(url) ;
            
        },
        addBook: function(data){
            var url = '/api/v1/books/';
            return $http.post(url,data) ;           
        },
        
        updateBook: function(user,code,data){
            var url = '/api/v1/'+user+'/books/'+code;
            return $http.put(url,data) ;           
        },
        
        deleteBook: function(user,code,data){
            var url = '/api/v1/'+user+'/books/'+code;
            return $http.delete(url,data) ;           
        },
        
        getBooks: function() {
            
            var url = '/api/v1/books/';
            return $http.get(url);           
        },
        getBookDetails: function(user,code) {
            
            var url = '/api/v1/'+user+'/books/'+code;
            return $http.get(url);           
        },
        getMyBooks: function(user) {
            
            var url = '/api/v1/'+user+'/books/';
            return $http.get(url);           
        },
    };
}])
.factory('profileService', ['$http',
function ($http) {
    console.log('profile services created');
return {
        
        
        updateProfile: function(user,data){
            var url = '/api/v1/'+user+'/user_profile/';
            return $http.put(url,data) ;           
        },
        
        
        getProfileDetails: function(user) {
            
            var url = '/api/v1/'+user+'/user_profile/';
            return $http.get(url);           
        },
        
    };
}])
.factory('UserService', ['$http', function($http) {
    var service = {
      isLoggedIn: false,

      session: function() {
        return $http.get('/api/v1/account/session')
              .then(function(response) {
                
          service.isLoggedIn = true;
          service.username = response.data.username;
          console.log (response);
          angular.module('colibri').user= response.data.user;
          angular.module('colibri').username=response.data.username;
          return response;
        });
      },
      
      signin: function(user_data) {
        return $http.post('/api/v1/account/signin/', user_data)
          .then(function(response) {
          //  service.isLoggedIn = true;
          //  service.username = response.data.username;
          //  angular.module('colibri').user= response.data.user;
          //angular.module('colibri').username=response.data.username;
            return response;
        });
      },

      login: function(user) {
        return $http.post('/api/v1/account/login/', user)
          .then(function(response) {
            service.isLoggedIn = true;
            service.username = response.data.username;
            angular.module('colibri').user= response.data.user;
          angular.module('colibri').username=response.data.username;
            return response;
        });
      },
      
      logout: function() {
        console.log('logout');
        return $http.post('/api/v1/account/logout/')
          .then(function(response) {
            service.isLoggedIn = false;
            service.username = '';
            return response;
        });
      },
      resetPassword: function(email) {
        console.log('reset password');
        return $http.post('api/v1/account/password/reset/', email)
          .then(function(response) {
            return response;
        });
      }
    };
    return service;
}])
.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $httpProvider.defaults.withCredentials = true;
}]);