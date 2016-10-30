var app = angular.module('Appointments', ['ngMap', 'angularModalService'])
  .config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});
