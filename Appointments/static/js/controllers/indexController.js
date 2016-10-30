app.controller('mapEventsController', function($scope, fetchEvents, $http, NgMap){
  var reqLat, reqLng;
  var vm = this;
  var reclickOnMap = 0;

  NgMap.getMap().then(function(map){
    vm.map = map;
  });
  vm.positions = new Array();
  vm.positions[0] = {lat:37.76, lng:-122.44};
  vm.placeCnt = 1;

  // Initialize all existing event positions.
  vm.initializePositions = function(){
      fetchEvents.success(function(data){
        response = angular.fromJson(data);
        alert(response.length);
        for (var i = 0; i < response.length; i++){
          vm.positions[vm.placeCnt] = {lat:response[i].fields.lat, lng: response[i].fields.lng};
          vm.placeCnt++;
        }
        console.log(vm.positions);
      });

  }

  vm.newEventConfirmation = function(event){
    $("#newEventsCreator").show();
    reclickOnMap += 1;
    if(reclickOnMap > 1){
      vm.setMapOne(null);
    }
    vm.addMarker(event);
    var ll = event.latLng;
    reqLat = ll.lat();
    reqLng = ll.lng();
  };

  vm.addMarker = function(event) {
    vm.positions[vm.placeCnt]={lat:event.latLng.lat(), lng: event.latLng.lng()};
    vm.placeCnt += 1;
  };

  vm.setMapOne = function(map){
    vm.positions[vm.placeCnt - 1] = null;
    vm.placeCnt -= 1;
  }

  vm.confirm = function(){
    var eventName = $scope.event.eventname;
    $scope.event.eventname = "";
    $http.get("/user/event/new/?userid=" + 1 +"&eventname="+ eventName+ "&lat=" + reqLat + "&lng=" + reqLng)
      .then(function(response){
        $scope.confirmationForm.$setPristine();
        $("#newEventsCreator").hide();
      });

    reclickOnMap = 0;
  };

  vm.cancel = function(){
    $scope.event.eventname = "";
    $scope.confirmationForm.$setPristine();
    $("#newEventsCreator").hide();
    vm.setMapOne(null);
    reclickOnMap = 0;
  };
});
