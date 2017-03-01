app.controller('indexCtrl', function($scope, ModalService, EventService, $http, NgMap) {
    var reqLat, reqLng;
    var vm = this;
    var reclickOnMap = 0;
    var userid = 1;

    NgMap.getMap().then(function(map) {
        vm.map = map;
    });
    vm.positions = [];
    vm.positions[0] = { lat: 37.76, lng: -122.44 };
    vm.placeCnt = 1;

    // Initialize all existing event positions.
    vm.initializePositions = function() {
        EventService.getEvents(userid).then(function(res) {
            console.log(res);

            // for (var i = 0; i < response.length; i++) {
            //     vm.positions[vm.placeCnt] = { lat: response[i].fields.lat, lng: response[i].fields.lng };
            //     vm.placeCnt++;
            // }
        }, function(err) {
            console.log(err);
        });
    }

    vm.newEventConfirmation = function(event) {
        $("#newEventsCreator").show();
        reclickOnMap += 1;
        if (reclickOnMap > 1) {
            vm.setMapOne(null);
        }
        vm.addMarker(event);
        reqLat = event.latLng.lat();
        reqLng = event.latLng.lng();
    };

    vm.addMarker = function(event) {
        vm.positions[vm.placeCnt] = { lat: event.latLng.lat(), lng: event.latLng.lng() };
        vm.placeCnt += 1;
    };

    vm.setMapOne = function(map) {
        vm.positions[vm.placeCnt - 1] = null;
        vm.placeCnt -= 1;
    }

    vm.confirm = function() {
        var data = {
            'userid': userid,
            'eventname': $scope.event.eventname,
            'eventdatetime': $scope.event.datetime,
            'lat': reqLat,
            'lng': reqLng
        };

        EventService.addEvent(data).then(
            function(res) {
                $scope.confirmationForm.$setPristine();
                $("#newEventsCreator").hide();
                console.log('add event', res);
            }
        )

        reclickOnMap = 0;
    };

    vm.cancel = function() {
        $scope.event.eventname = "";
        $scope.confirmationForm.$setPristine();
        $("#newEventsCreator").hide();
        vm.setMapOne(null);
        reclickOnMap = 0;
    };

    // Show login modal for user login.
    $scope.showLoginModal = function() {
        ModalService.showModal({
            templateUrl: "static/js/controllers/login.html",
            controller: "loginController",
            inputs: {
                title: "Login modal page"
            }
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                var data = $.param({
                    username: result.username,
                    password: result.password
                });
                $http.get("/user/login/?username=" + result.username + "&password=" + result.password)
                    .then(function(response) {
                        vm.username = response.data;
                        console.log(vm.users);
                        $("#loginAera").hide();
                        $("#userInformation").show();
                    });
                $scope.complexResult = "Name: " + result.name + ", age: " + result.age;
            });
        });
    };

    // Show register modal for user signing up.
    $scope.showRegisterModal = function() {
        ModalService.showModal({
            templateUrl: "static/js/controllers/login.html",
            controller: "loginController",
            inputs: {
                title: "Register modal page"
            }
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                var data = $.param({
                    username: result.username,
                    password: result.password
                });
                $http.get("/user/register/?username=" + result.username + "&password=" + result.password)
                    .then(function(response) {
                        alert(response);
                    });
                $scope.complexResult = "Name: " + result.name + ", age: " + result.age;
            });
        });
    };
});