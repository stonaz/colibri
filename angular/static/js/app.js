angular.module('colibri', ['ngRoute','angularUtils.directives.dirPagination']).config(function($routeProvider) {

    $routeProvider.when('/', {
      templateUrl: '/static/partials/home.html',
     controller: 'signinController as signinCtrl'
    })
    .when('/login', {
      templateUrl: '/static/partials/login.html',
      controller: 'userController as loginCtrl'
    })
    .when('/logout', {
     templateUrl: '/static/partials/home.html',
      controller: 'logoutController as logoutCtrl'
    })
    .when('/lostpassword', {
     templateUrl: '/static/partials/lostpassword.html',
      controller: 'lostPasswordController as lostpasswordCtrl'
    })
    .when('/myprofile', {
      templateUrl: '/static/partials/myprofile.html',
      controller: 'profileController as profileCtrl'
    })
    .when('/books', {
      templateUrl: '/static/partials/books.html',
      controller: 'booksController as bookCtrl',
      resolve: {
        auth: ['$q', '$location', 'UserService',
          function($q, $location, UserService) {
             return UserService.session().then(
               function(success) {},
               function(err) {
                  $location.path('/login');
                  $location.replace();
                  return $q.reject(err);
             });
        }]
      }
    })
    .when('/mybooks', {
      templateUrl: '/static/partials/mybooks.html',
      controller: 'myBooksController as myBookCtrl'
    })
    .when('/addbook', {
      templateUrl: '/static/partials/addbook.html',
      controller: 'addBookController as addBookCtrl'
    })
    .when('/updatebook/:code', {
      templateUrl: '/static/partials/updatebook.html',
      controller: 'updateBookController as updateBookCtrl'
    })
    .when('/deletebook/:code', {
      templateUrl: '/static/partials/deletebook.html',
      controller: 'deleteBookController as deleteBookCtrl'
    })
    .when('/team/:code', {
      templateUrl: 'views/team_details.html',
      controller:'TeamDetailsCtrl as teamDetailsCtrl',
      resolve: {
        auth: ['$q', '$location', 'UserService',
          function($q, $location, UserService) {
             return UserService.session().then(
               function(success) {},
               function(err) {
                  $location.path('/login');
                  $location.replace();
                  return $q.reject(err);
             });
        }]
      }
    });
    //$routeProvider.otherwise({
    //    
    //  redirectTo: '/'
    //});
});
console.log('app started');