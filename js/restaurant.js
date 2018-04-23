var app = angular.module('Restaurant',[]);

app.controller('restaurantController', function($scope, $http) {
  var restdisp = document.getElementById("restcontainer");
  $scope.loadData = function () {
        var request = $http.get("/get_restaurants/" + $scope.searchName);
        request.success(function(data) {
            $scope.data = data;
            restdisp.style.display = $scope.data == "" ? "none" : "block";
        });
        request.error(function(data){
            $scope.data = '';
            console.log('err');
        });
    };
});
