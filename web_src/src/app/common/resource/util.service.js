(function() {
    'use strict';

    angular.module('app.common.resource').factory('util', util);


    function util($q) {
        var svc = {
            recurse: recurse,
            clear: clear,
            param: param
        };
        return svc;

        /////////////////////////////////////

        function recurse(fn, params) {

            return $q.when(fn(params))
                .then(function(response) {
                    if (angular.isUndefined(response)) {
                        return;
                    }

                    return recurse(fn, response);
                });
        }

        function clear(obj) {
            if (angular.isObject(obj)) {
                for (var prop in obj) {
                    delete obj[prop];
                }
            }

            return obj;
        }

        function param(obj) {

            if (!angular.isObject(obj)) {
                return ((obj === null) ? "" : obj.toString());
            }
            var query = '',
                name, value, fullSubName, subName, subValue, innerObj, i;

            for (name in obj) {

                value = obj[name];
                if (value instanceof Array) {
                    for (i in value) {

                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }

                } else if (value instanceof Object) {
                    for (subName in value) {

                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value !== undefined && value !== null)
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }

            return query.length ? query.substr(0, query.length - 1) : query;
        }

        ////////////////// -- helpers
    }

})();
