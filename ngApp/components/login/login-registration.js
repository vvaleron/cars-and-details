app.controller('login-controller', ['$scope', '$http', function($scope, $http) {
    $scope.login = {
        email: '',
        password: ''
    };

    $scope.initLoginForm = function(){
        var user = this.$parent.currentUser;

        (user && user.email) ? $scope.login.email = user.email : null;
    };

    $scope.logIn = function() {
        if ($scope.loginForm.$valid) {
            var loginRequest = $http({
                url: location.origin + '/users/login',
                method: "POST",
                data: $scope.login
            });

            loginRequest.success(function(data, status, headers, config) {
                console.log(status, location.origin + 'users/login', data);

                if (status == 200) {
                    $scope.$parent.currentUser = data;
                    location.href = location.origin + "/#/my-profile";
                } else {
                    alert('You enter wrong email or password');

                }
            });

            loginRequest.error(function(data, status, headers, config) {
                console.log(status, location.origin + 'users/login', data);
            });

        } else {
           alert("This form is not valid");
        }
    }
}]);

app.controller('registration-controller', ['$scope', '$http', function($scope, $http) {
		$scope.user = {
			name: '', 
			last: '',
			email: '',
			password: '',
			password_verify: ''
		};


        $scope.alreadyExist = function (label, value) {
            alert(label + 'with this value: ' + value + 'is already exist.');
        };

		$scope.submitForm = function() {
			if ($scope.userForm.$valid) {
				console.log($scope.user);
				$http({
				    url: location.origin + '/users/new',
				    method: "POST",
				    data: $scope.user
				}).success(function(data, status, headers, config) {

                    console.log(status, location.origin + 'users/new', data);
                    if (status == 204) {
                        $scope.alreadyExist('email', config.data.email);
                    } else {
                        $scope.$parent.currentUser = config.data;
                    location.href = location.origin + "/#/login";
                    }
				}).error(function(data, status, headers, config) {
				    console.log(status, location.origin + 'users/new', data);
				});

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
