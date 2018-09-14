
var app = angular.module('food', ['ngSanitize']);
app.controller('foodctrl', function($scope, $http) {

    $scope.getCalories = function() {
        //$scope.foodName = document.getElementById("calories").value;

        $http.get('https://api.nutritionix.com/v1_1/search/'+
            $scope.foodName +
            '?results=0:1&fields=*&appId=ddae7824&appKey=c014b6732db3039e04696bdcc879a6a5').success(function(data) {
            console.log(data);
            calories = data.hits[0].fields.nf_calories;
            weight = data.hits[0].fields.nf_serving_weight_grams;
            $scope.outputCalories = {
                html: "Result: "+$scope.foodName+' contains: '+calories+' calories and serving weight in grams is: '+weight+'.'

            }
            $scope.speakOut($scope.foodName+' contains: '+calories+' calories and serving weight in grams is: '+weight);
        })
            .error(function(data, status) {
                console.error('Repos error', status, data);
            })
    }

});

app.controller('watsonctrl', function($scope, $http) {
    $scope.speakOut = function(text) {
        if(text =='' || text == null) {
            text = document.getElementById("text").value;
        }

        watsonUrl = 'https://stream.watsonplatform.net/text-to-speech/api';
        userName = '011eceb2-7708-4d77-bd09-687e09ba9a91';
        password = '4d1VWzft7sHo';
        var url = watsonUrl + "/v1/synthesize?"
            + "username=" + userName
            + "&password=" + password
            + "&text=" + text;
        var output = new Audio( url );
        output.play();
    }
});


