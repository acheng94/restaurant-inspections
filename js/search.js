var app = angular.module('Search',[]);

app.controller('searchController', function($scope, $http) {
  var url = '/show_tables';
  var request = $http.get(url);
  request.success(function(data) {
    $scope.data = data;
  });
               
});
