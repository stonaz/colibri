angular.module('colibri', ['ngRoute']).config(function($routeProvider) {

    $routeProvider.when('/', {
      templateUrl: '/static/partials/home.html'
     // controller: 'TeamListCtrl as teamListCtrl'
    })
    .when('/test', {
       // template: '<h5>This is the second route</h5>'
      templateUrl: '/static/partials/test.html'
    })
    .when('/books', {
       // template: '<h5>This is the second route</h5>'
      templateUrl: '/static/partials/books.html'
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