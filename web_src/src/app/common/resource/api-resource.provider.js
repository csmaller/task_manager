(function() {
    'use strict';

    angular.module('app.common.resource' ,['app.common.settings']).provider('apiResource', apiResourceProvider);

    function apiResourceProvider() {

        /*jshint validthis: true */
        var provider = this;

        provider.$get = /*@ngInject*/ function($resource, APP_SETTINGS){
            function apiResourceFactory(url, paramDefaults, actions, options) {
                url = buildUrl(url);
                
                angular.forEach(actions, function(value, key) {
                    if (angular.isDefined(value.url)) {
                        value.url = buildUrl(value.url);
                    }
                });

                var params = {
                    /* client: settings.CLIENT,
                     client_version: settings.CLIENT_VERSION*/
                };

                paramDefaults = angular.extend({}, paramDefaults, params);
                return $resource(url, paramDefaults, actions, options);
            }

            function buildUrl(path) {
              
                return APP_SETTINGS.API_PATH+ path;
            }

            return apiResourceFactory;
        };

    }

})();