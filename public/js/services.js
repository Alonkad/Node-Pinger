(function () {
    'use strict';

    /* Services */

    angular.module('pingerAdmin').factory('Monitor', ['$resource', function ($resource) {
        return $resource('/monitors/:action',
            { },  //paramDefaults
            {  //actions
                "list": {
                    method: 'GET',
                    isArray: true,
                    params:{ action:'list' }
                }
            }
        );
    }]);

})();