var app = angular.module('Detail',[]);

app.controller('detailController', function($scope, $http, $location, $window) {
  $scope.yelpdata = "";
  $scope.inspectiondata = "";

  $scope.initialize = function() {
          var map = new google.maps.Map(document.getElementById('map'), {
             center: {lat: -34.397, lng: 150.644},
             zoom: 8
          });
       }

  google.maps.event.addDomListener(window, 'load', $scope.initialize);   

  $scope.dateSubstr = function(datetime) {
    return datetime.substring(0,10)
  }
  
  $scope.vioFormat = function(violations) {
    var vioArr = violations.split(",")
    var vioSet = new Set(vioArr)
    if (vioSet.has("000")) {
      vioSet.delete("000");
    }
    return Array.from(vioSet).join(',')
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
    $scope.latitude = yelpdata.latitude;
    noyelpdisp.style.display = $scope.yelpdata == "" ? "block" : "none";
    yelpdisp.style.display = $scope.yelpdata == "" ? "none" : "block";
    var uluru = {lat: $scope.yelpdata[0].latitude, lng: $scope.yelpdata[0].longitude};
    $window.map = new google.maps.Map(document.getElementById('map'), {
       center: uluru,
       zoom: 15
    });
    var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
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


