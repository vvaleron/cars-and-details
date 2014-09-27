app.controller('registration-controller', ['$scope', function($scope) {
		$scope.user = {
			name: '', 
			last: '',
			email: '',
			password: '',
			password2: ''
		};

		$scope.submitForm = function() {
			if ($scope.userForm.$valid) {
				console.log($scope.user)
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


app.controller('login-controller', ['$scope', function($scope) {

}]);



