var app = angular.module('Detail',[]);

app.controller('detailController', function($scope, $http, $location) {
  $scope.yelpdata = "";
  $scope.inspectiondata = "";

  $scope.dateSubstr = function(datetime) {
    return datetime.substring(0,10)
  }

  /*** Decode id from URL ***/
  $scope.location = $location;
  var val = $scope.location.absUrl().split("?")[1].split("=")[1]

  var noyelpdisp = document.getElementById("noyelpcontainer");
  var noinspdisp = document.getElementById("noinspcontainer");
  var yelpdisp = document.getElementById("yelpcontainer");
  var inspdisp = document.getElementById("inspcontainer");
  var viodisp = document.getElementById("viocontainer");
  
  var yelpurl = 'detail_yelp/' + val;
  var yelprequest = $http.get(yelpurl);
  yelprequest.success(function(yelpdata) {
    $scope.yelpdata = yelpdata;
    noyelpdisp.style.display = $scope.yelpdata == "" ? "block" : "none";
    yelpdisp.style.display = $scope.yelpdata == "" ? "none" : "block";
  });
  
  var inspurl = 'detail_insp/' + val;
  var insprequest = $http.get(inspurl);
  insprequest.success(function(inspdata) {
    $scope.inspdata = inspdata;
    noinspdisp.style.display = $scope.inspdata == "" ? "block" : "none";
    inspdisp.style.display = $scope.inspdata == "" ? "none" : "block";
  });
  
  var viourl = 'detail_vio/' + val;
  var viorequest = $http.get(viourl);
  viorequest.success(function(viodata) {
    $scope.viodata = viodata;
    viodisp.style.display = $scope.viodata == "" ? "none" : "block";
  });
               
});
