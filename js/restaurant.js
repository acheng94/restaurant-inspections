var app = angular.module('Restaurant',[]);

app.controller('restaurantController', function($scope, $http) {
  $scope.loadData = function () {
        var request = $http.get("/get_restaurants/" + $scope.searchName);
        request.success(function(data) {
            $scope.data = data;
        });
        request.error(function(data){
            $scope.data = '';
            console.log('err');
        });
    };
});
