var app = angular.module('Worst',[]);
    
app.controller('badrankingController', function($scope, $http) {
  var worstdisp = document.getElementById("worstcontainer");
  var topviorequest = $http.get('get_rankings_most_vio');
  topviorequest.success(function(topviodata) {
    $scope.topviodata = topviodata;
    worstdisp.style.display = $scope.inspdata == "" ? "none" : "block";
  });
});