var app = angular.module('Friendship',[]);

app.controller('friendshipController', function($scope, $http) {
               var request = $http.get('/friendships_table');
               request.success(function(data) {
                               $scope.data = data;
                               });
               request.error(function(data){
                             console.log('err');
                             });
               });
/*
app.controller('familyController', function($scope, $http) {
                               $scope.data = "";
});

function changeFamilyController() {
  var val = document.getElementById("searchforfamily").value;
  var url = '/findfamily/' + '\'' + val + '\'';
  alert(url)
  app.controller('familyController', function($scope, $http) {
               var request = $http.get(url);
               request.success(function(data) {
                               $scope.data = data;
                               });
               request.error(function(data){
                             console.log('err');
                             });
               });
 
}*/

app.controller('familyController', function($scope, $http) {
  $scope.data = "";
  $scope.changeFamilyController = function () {

    var val = document.getElementById("searchforfamily").value;
    var url = '/findfamily/' + '\'' + val + '\'';
    var request = $http.get(url);
    request.success(function(data) {
      $scope.data = data;
    });
  }
});

