var app = angular.module('Ranking',[]);

app.controller('rankingController', function($scope, $http) {
  var rankdisp = document.getElementById("rankcontainer");
  $scope.loadData = function () {
        var request = $http.get("/get_rankings/" + $scope.searchName);
        request.success(function(data) {
            $scope.data = data;
            rankdisp.style.display = $scope.data == "" ? "none" : "block";
        });
        request.error(function(data){
            $scope.data = '';
            console.log('err');
        });
    };
});
