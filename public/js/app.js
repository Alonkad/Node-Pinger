(function () {
    'use strict';

    //Declare app level module
    window.pingerAdmin = angular.module('pingerAdmin', ['ngResource']);

    window.pingerAdmin.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
    }]);
})();