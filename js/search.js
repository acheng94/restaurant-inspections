var app = angular.module('Search',[]);

app.controller('searchController', function($scope, $http) {
  var searchdisp = document.getElementById("searchcontainer");
  $scope.loadData = function () {
        var request = $http.get("/get_cuisine/" + $scope.searchCuisine + "/" + $scope.searchNeighborhood);
        request.success(function(data) {
            $scope.data = data;
            searchdisp.style.display = $scope.data == "" ? "none" : "block";
        });
        request.error(function(data){
            $scope.data = '';
            console.log('err');
        });
    };             
});
