var app = angular.module('Detail',[]);

app.controller('detailController', function($scope, $http) {
  var url = '/show_tables';
  var request = $http.get(url);
  request.success(function(data) {
    $scope.data = data;
  });
               
});
