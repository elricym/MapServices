app.controller('registerController', [
  '$scope', '$element', 'title', 'close', 
  function($scope, $element, title, close) {

  $scope.username = null;
  $scope.password = null;
  $scope.title = title;
  
  //  This close function doesn't need to use jQuery or bootstrap, because
  //  the button has the 'data-dismiss' attribute.
  $scope.close = function() {
 	  close({
      username: $scope.username,
      password: $scope.password
    }, 500); // close, but give 500ms for bootstrap to animate
  };

  //  This cancel function must use the bootstrap, 'modal' function because
  //  the doesn't have the 'data-dismiss' attribute.
  $scope.cancel = function() {

    //  Manually hide the modal.
    $element.modal('hide');
    
    //  Now call close, returning control to the caller.
    close({
      username: $scope.username,
      password: $scope.password
    }, 500); // close, but give 500ms for bootstrap to animate
  };

}]);