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