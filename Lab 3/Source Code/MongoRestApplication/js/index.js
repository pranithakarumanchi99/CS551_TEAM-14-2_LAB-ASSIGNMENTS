/**
 * Created by user on 23/10/2016.
 */
var myapp = angular.module('demoMongo',[]);


myapp.run(function ($http) {
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['dataType'] = 'json'
});
myapp.controller('MongoRestController',function($scope,$http){
    $scope.Users = new Array();

    $scope.insertData = function(){
        console.log($scope.formData.plate);
        console.log($scope.formData.stolen);
        console.log($scope.formData.crash);

        var dataParams = {
            'plate' : $scope.plate,
            'stolen' : $scope.stolen,
            'crash' : $scope.crash

        };
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        var req = $http.post('https://quiet-brushlands-99331.herokuapp.com/add',$scope.formData);
        req.success(function(data, status, headers, config) {
           alert("Cars "+$scope.formdata.plate+" added!")
            console.log(data);
        });
        req.error(function(data, status, headers, config) {
        });
    };

    $scope.search = function () {
        console.log($scope.searchData.majorSearch);
        var dataParams = {
            'plate': $scope.searchData.majorSearch
        }
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        var req = $http.get('https://quiet-brushlands-99331.herokuapp.com/search' +
            "?plate=" + $scope.searchData.majorSearch);
        req.success(function(data) {

            console.log("Status "+data.toString());
            for(var i = 0; i<data.length; i++){
$scope.Users[i]={
    Plate:data[i].plate,
    Stolen: data[i].stolen,
    Crash:data[i].crash
   }
 }
        });
        req.error(function(data, status, headers, config) {
            console.log("failure message: " + JSON.stringify({data: data}));
        });
    }

    $scope.delete = function () {
        console.log($scope.searchData.majorSearch);
        var dataParams = {
            'plate': $scope.searchData.majorSearch
        }
        var config = {
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }
        var req = $http.get('https://quiet-brushlands-99331.herokuapp.com/delete' +
            "?plate=" + $scope.searchData.majorSearch);
        req.success(function(data) {
            console.log("Status "+data.toString());
        });
        req.error(function(data, status, headers, config) {
            console.log("failure message: " + JSON.stringify({data: data}));
        });
    }
});