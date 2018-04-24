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
    
app.controller('badrankingController', function($scope, $http) {
  var topviorequest = $http.get('get_rankings_most_vio');
  topviorequest.success(function(topviodata) {
    $scope.topviodata = topviodata;
    noinspdisp.style.display = $scope.inspdata == "" ? "block" : "none";
    inspdisp.style.display = $scope.inspdata == "" ? "none" : "block";
  });
});
