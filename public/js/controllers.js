(function () {
    'use strict';

    /* Controllers */

    angular.module('pingerAdmin').controller('indexCtrl', function($scope, $http, Monitor) {

        Monitor.list(function(data){
            $scope.monitors = data;
        });
    });
})();