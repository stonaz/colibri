var cyberFeed = angular.module('cyberFeed', ['cyberFeedServices']);

cyberFeed.controller('cyberFeedController', ['$http', 'sendData', function ($http, sendData) {
    console.log('controller created');
    var self=this;
    self.login_data = {username:'admin',password:'stefano'};
    //sendData.list().then(function(response){
    //    //self.books = response.data;
    //    console.log(response);
    //    return false;
    //    },
    //    function(errResponse) {
    //    console.error(errResponse);
    //});
    self.login = function(){
        sendData.login(self.login_data).then(function(response){
        //self.books = response.data;
        console.log(response);
        return false;
        },
        function(errResponse) {
        console.log(errResponse.data);
    });
    };
    self.getBooks = function(){
        sendData.getBooks().then(function(response){
        self.books = response.data;
        console.log(response);
        return false;
        },
        function(errResponse) {
        console.log(errResponse.data);
    });
    };
    console.log(self.books);
    

}]);

