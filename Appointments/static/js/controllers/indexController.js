app.controller('mapEventsController', function($scope, $http, NgMap){
  var reqLat, reqLng;
  var vm = this;

  NgMap.getMap().then(function(map){
    vm.map = map;
  });
  vm.positions = new Array();
  vm.positions[0] = {lat:37.76, lng:-122.44};
  vm.placeCnt = 1;

  vm.newEventConfirmation = function(event){
    $("#newEventsCreator").show();
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
    $http.get("/user/event/?userid=" + 1 +"&eventname="+ eventName+ "&lat=" + reqLat + "&lng=" + reqLng)
      .then(function(response){
        $scope.confirmationForm.$setPristine();
        $("#newEventsCreator").hide();
      });
  };

  vm.cancel = function(){
    $scope.event.eventname = "";
    $scope.confirmationForm.$setPristine();
    $("#newEventsCreator").hide();
    vm.setMapOne(null);
  };
});
