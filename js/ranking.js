var app = angular.module('Ranking',[]);

app.controller('rankingController', function($scope, $http) {
  var url = '/show_tables';
  var request = $http.get(url);
  request.success(function(data) {
    $scope.data = data;
  });
               
});
