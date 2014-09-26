app.controller('registration-controller', ['$scope', function($scope) {
	$scope.validateRegistration = function(){
		var form = $("#signup");

		// form.validate({
		// 	rules:{
		// 		fname:"required",
		// 		lname:"required",
		// 		email:{
		// 			required:true,
		// 			email: true
		// 		},
		// 		passwd:{
		// 			required:true,
		// 			minlength: 8
		// 		},
		// 		conpasswd:{
		// 			required:true,
		// 			equalTo: "#passwd"
		// 		},
		// 		gender:"required"
		// 	},

		// 	errorClass: "help-inline"

		// });
		
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



