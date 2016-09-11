app.directive('newEventConfirmation', function ($compile) {
      return {
        restrict: 'E',
        templateUrl: 'static/js/directives/newEventConfirmation.html',
        // link: function (scope, element, attr) {
        //   scope.$watch('someValue', function (newVal) {
        //       //alert(newVal);
        //       if (newVal) {
        //           $(element).show();
        //       }
        //       else
        //           $(element).hide();
        //   });
        // }
      };
  });
