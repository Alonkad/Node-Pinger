(function () {
    'use strict';

    /* Services */

    window.pingerAdmin.
        factory('Monitor', ['$resource', function ($resource) {
            return $resource('/monitors/:action',
                { },  //paramDefaults
                {  //actions
                    "list": {
                        method: 'POST',
                        isArray: true
                    }
                }
            );
        }]);

})();