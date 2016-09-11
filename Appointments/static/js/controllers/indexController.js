app.controller('newEventConfirmation', ['$scope', function($scope){
  $scope.confirm = function(lat, lng){
      alert($scope.event.eventname)
      newEventRequest(1, $scope.event.eventname, lat, lng);
  };

  $scope.cancel = function(){
    $("#newEventsCreator").hide();
  };
}]);

app.controller('mapEventsController', ['$scope', function($scope){
  var currentLocation;
  $scope.newEventConfirmation = function(event){
    $("#newEventsCreator").show();
  };
}]);
