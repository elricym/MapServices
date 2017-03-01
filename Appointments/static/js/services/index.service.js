app.constant('SERVER_URL', 'http://localhost:8080')

.service('EventService', ['$http', 'SERVER_URL', function($http, SERVER_URL) {
    var baseUrl = SERVER_URL;
    return {
        getEvents: function(userid) {
            return $http.get(baseUrl + '/user/event/?userid=' + userid);
        },
        addEvent: function(data) {
            return $http.post(baseUrl + '/user/event/new', data);
        }
    }
}]);