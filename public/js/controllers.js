(function () {
    'use strict';

    /* Controllers */

    window.indexCtrl = function($scope, $http, Monitor) {
        /*$http({method:'GET', url:'/api/name'}).
            success(function (data, status, headers, config) {
                $scope.name = data.name;
            }).
            error(function (data, status, headers, config) {
                $scope.name = 'Error!'
            });*/

        Monitor.list();

        $scope.name = 'alon';
    };
})();