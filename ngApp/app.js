var app = angular.module('app', ['ngRoute']).

config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
    	templateUrl: 'components/login/loginWindow.html', 
    	controller: 'login-controller'}
    	);

    $routeProvider.when('/registration', {
        templateUrl: 'components/login/registrationWindow.html', 
        controller: 'registration-controller'}
        );
}]);

console.log('app.js started');