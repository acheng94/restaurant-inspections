var app = angular.module('Detail',[]);

app.controller('detailController', function($scope, $http) {
  $scope.data = "";
  $scope.changeDetailController = function () {

    var val = document.getElementById("searchid").value;
    var url = '/sql/' + '* FROM business WHERE id=' + '\'' + val + '\'';
    var request = $http.get(url);
    request.success(function(data) {
      $scope.data = data;
    });
  }
               
});
