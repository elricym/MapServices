app.factory('fetchEvents', ['$http', function($http) {
  return $http.get('/user/event/?userid='+1) 
            .success(function(data) {
              return data;
            })
            .error(function(err) {
              return err;
            });
}]);
