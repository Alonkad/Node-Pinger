(function () {
    'use strict';

    //Declare app level module
    angular.module('pingerAdmin', ['ngResource'])
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            //TODO: Add routes
            $locationProvider.html5Mode(true);
        }]);
})();