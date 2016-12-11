angular.module('colibri').factory('sendData', ['$http',
function ($http) {
    console.log('services created');
    var message = '';
    var domains = [];

    return {
        list: function() {
            
            var url = 'http://localhost:8066';
            return $http.get(url);
            
        },
        login: function(data){
            var url = 'http://localhost:9000/api/v1/account/login/';
            return $http.post(url,data);
            
        },
        
         getBooks: function() {
            
            var url = 'http://localhost:9000/api/v1/books/';
            return $http.get(url);
            
        },
        
        output: function () {
            return (message);
        },
        send: function (json,endpoint) {
            message = 'loading...';
            $http.post(endpoint, json).
            success(function (data, status, headers, config) {
                console.log(data.length);
                message = data;
            }).
            error(function (data, status, headers, config) {
                console.log(data);
                message = data.Error;
            });
        },
        getXML: function (callback) {
            var url = 'http://localhost:8066/static/data/domains.xml';
            $http.get(url,
                    {transformResponse:function(data) {
                      // convert the data to JSON and provide
                      // it to the success function below
                        var x2js = new X2JS();
                        var json = x2js.xml_str2json( data );
                        return json;
                        }
                    }).
            success(function (data, status, headers, config) {
                callback(data);
                //var x2js = new X2JS();
                //var json = x2js.xml_str2json( data );
                //console.log(json);
                //return json;
            }).
            error(function (data, status, headers, config) {
                console.log(status);
                message = status;
            });
            
            
            return domains;
        },        
        

    };
}])
    .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $httpProvider.defaults.withCredentials = true;
}]);