app.controller('registration-controller', ['$scope', '$http', function($scope, $http) {
		$scope.user = {
			name: '', 
			last: '',
			email: '',
			password: '',
			password_verify: ''
		};



		$scope.submitForm = function() {
			if ($scope.userForm.$valid) {
				console.log($scope.user)
				$http({
				    url: location.origin + '/users/new',
				    method: "POST",
				    data: $scope.user
				}).success(function(data, status, headers, config) {
				    $scope.data = data;
				    console.log(status, location.origin + 'users/new', data);
				}).error(function(data, status, headers, config) {
				    $scope.status = status;
				    console.log(status, location.origin + 'users/new', data);
				});
				debugger
			} else {
				alert("This form is not valid");
			}
		};
}]);

app.directive('loginWindow', function() {
   return {
       restrict: 'EA',
       link: function(scope, element, attrs) {
           console.log('loginWindow');
           //scope.getContentUrl = function() {
                // return 'content/excerpts/hymn-' + attrs.ver + '.html';
           // }
       },
       templateUrl: '/components/login/loginWindow.html'
   }
});

app.directive('registrationWindow', function() {
   return {
       restrict: 'EA',
       link: function(scope, element, attrs) {
           console.log('registrationWindow');
           //scope.getContentUrl = function() {
                // return 'content/excerpts/hymn-' + attrs.ver + '.html';
           // }
       },
       templateUrl: '/components/login/registrationWindow.html'
   }
});

app.directive("passwordVerify",function(){
    return {
        require:"ngModel",
        link: function(scope,element,attrs,ctrl){
            ctrl.$parsers.unshift(function(viewValue){
                var origin = scope.$eval(attrs["passwordVerify"]);
                if(origin!==viewValue){
                    ctrl.$setValidity("passwordVerify",false);
                    return undefined;
                }else{
                    ctrl.$setValidity("passwordVerify",true);
                    return viewValue;
                }
            });

        }
    };
});


app.controller('login-controller', ['$scope', function($scope) {

}]);



