angular.module('colibri')
.factory('sendData', ['$http',
function ($http) {
    console.log('services created');
return {
        list: function() {
            
            var url = 'http://localhost:8066';
            return $http.get(url);
            
        },
        login: function(data){
            var url = 'http://localhost:9000/api/v1/account/login/';
            return $http.post(url,data) ;           
        },
        
         getBooks: function() {
            
            var url = 'http://localhost:9000/api/v1/books/';
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
      }
    };
    return service;
}])
.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $httpProvider.defaults.withCredentials = true;
}]);