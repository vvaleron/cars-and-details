var app = angular.module('app', ['ngRoute', 'ngCookies']).

config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/login', {
    	templateUrl: 'components/login/loginWindow.html', 
    	controller: 'login-controller'}
    );

    $routeProvider.when('/registration', {
        templateUrl: 'components/login/registrationWindow.html', 
        controller: 'registration-controller'}
    );

    $routeProvider.when('/my-profile', {
        templateUrl: 'components/userProfile/userProfile.html',
        controller: 'user-profile-controller'}
    );

    $routeProvider.when('/details-grid', {
        templateUrl: 'components/detailsGrid/detailsGrid.html',
        controller: 'details-grid-controller'}
    );
}]).

run(["$rootScope", "$cookieStore", '$http', function ($rootScope, $cookieStore, $http) {
    var userId = $cookieStore.get('currentUser');
        $rootScope.currentUser = false;
        $rootScope.categories = false;
        $rootScope.subCategories = false;

        if (userId) {
            var loginRequest = $http({
                url: location.origin + '/users/auto-login',
                method: "POST",
                data: {id: userId}
            });

            loginRequest.success(function(data, status, headers, config) {
                $rootScope.currentUser = data;
                location.href = location.origin + "/#/my-profile";

                console.log(status, location.origin + '/users/auto-login', data);
            });

            loginRequest.error(function(data, status, headers, config) {
                console.log(status, location.origin + '/users/auto-login', data);
            });
        } else {
            location.href = location.origin + "/#/login";
        }
}]);