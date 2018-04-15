var app = angular.module('Restaurant',[]);

app.controller('restaurantController', function($scope, $http) {
  var url = '/show_tables';
  var request = $http.get(url);
  request.success(function(data) {
    $scope.data = data;
  });
               
});
