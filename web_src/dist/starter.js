

var app = angular.module('app', ['app.task', 
	
	'ui.router',
	'app.templates',
	'app.common.resource',
	'ngResource',


]);









angular.module('app.task', ['ui.router']);


	
angular.module('app.task')
	.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        
        .state('home', {
            url: '/',
            controller:'TaskController',
            controllerAs:'vm',
            templateUrl: 'templates/task/task.html',

        })
        
        
});


angular.module('app.task').controller('TaskController',TaskController);

function TaskController(Task,util, $http){
	var vm  = this;
	vm.tasks =null;
	vm.task = null;
	getTasks();


	function getTasks(){

		var id={ id:1}

		
		var t = Task.get(id).$promise.then(
			function(response){
				vm.tasks = response;
			}).catch(function(e) {
				console.log("got an error in edit", e);
				
				throw e; // rethrow to not marked as handled, 
				// in $q it's better to `return $q.reject(e)` here
			});
	}

	vm.submit = function(){
		
		
		if(vm.task == null){
			alert('You have to supply a task');
			return;
		}else{
			if(vm.task.task !=null){
				Task.save(vm.task).$promise.then(
					
					function(response){
						getTasks();
						vm.task = null;
					}
				).catch(function(e) {
					console.log("got an error in adding", e);
					
					throw e; 
				});
			}
		}
	}

	vm.delete = function(id){

		if(confirm('Aere you sure you want to remove this?')){
			var id = {id:id}
			Task.delete(id).$promise.then(
				
				function(response){
					getTasks();
				}
			).catch(function(e) {
				console.log("got an error in adding", e);
				throw e; // rethrow to not marked as handled, 
					
			});
		}

	}



	
	

	
}


angular.module('app.templates', []);
angular.module('app.common.resource', []);
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


angular.module('app.common.resource').factory('Task', Task);

function Task($q, apiResource) {
    var actions = getTaskActions();
    var rx = apiResource('', {}, actions);

    return rx;

    function getTaskActions() {
        var list = {};
        list.getAllTask = {
            url: '',
            isArray: true,
            interceptor: {
                response: function(response) {

                    if (response.data.success === false) {
                        return $q.reject(response.data);
                    }

                    return response.data;
                }
            }
        };
       

        list.get = {

            url: "read_tasks.php",
            isArray: true,
            interceptor: {
                response: function(response) {

                    if (response.data.success === false) {
                        return $q.reject(response.data);
                    }

                    return response.data;
                }
            }

        };

        list.delete= {

            method: 'POST',
            url: 'delete_task.php',
             headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        };

        list.save = {
            url: 'create_task.php',
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        };


        return list;

    }

    



    function isNullResponse(response) {
        return !angular.isObject(response) || angular.isUndefined(response.house_id);
    }
}


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

angular.module('app.common.settings', []);



(function() {
	'use strict';

	angular.module('app.common.settings').constant('APP_SETTINGS', {

		//"API_PATH": "https://gmrweb1:444/Sunrise_api/api/",
		//"AUTH_PATH": "https://gmrweb1:444/Sunrise_api/",

		"API_PATH": "http://localhost:8888/tasks/api/",
		"AUTH_PATH": "http://localhost/msdistributorAPI/",

	});

})();