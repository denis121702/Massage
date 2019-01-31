// app module
var app = angular.module('demoApp', ['ngRoute']);

// routes
app.config(function ($routeProvider) {

   $routeProvider
    .when('/',
        {
            controller: 'HomeController',
            templateUrl: 'cms/views/home.html'
        })		   
	.when('/philosophie',
		{
			controller: 'TextController',
			templateUrl: 'cms/views/text.html'
		})
	.when('/tantra',
		{
			controller: 'TextController',
			templateUrl: 'cms/views/text.html'
		})
	.when('/paare',
		{
			controller: 'TextController',
			templateUrl: 'cms/views/text.html'
		})
	.when('/ambiente',
		{
			controller: 'TextController',
			templateUrl: 'cms/views/text.html'
		})
	.when('/regeln',
		{
			controller: 'TextController',
			templateUrl: 'cms/views/text.html'
		})
    .when('/jobs',
		{
		    controller: 'TextController',
		    templateUrl: 'cms/views/text.html'
		})
	.when('/team',
		{
			controller: 'TeamController',
			templateUrl: 'cms/views/team.html'
		})
	.when('/girl',
        {
            controller: 'GirlController',
            templateUrl: 'cms/views/girl.html'
        })
	.when('/girl/:id',
        {
            controller: 'GirlController',
            templateUrl: 'cms/views/girl.html'
        })
    .otherwise({ redirectTo: '/' });

});

var serviceBase = 'http://localhost/WebApplication3/';

app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase    
});

