app.controller('user-profile-controller', ['$scope', '$http', function($scope, $http) {
    $scope.initUserProfile = function () {

        $scope.currentUser = this.$parent.currentUser;

        function createCategoriesView () {

        }

        function createSubCategoriesView () {

        }

        createCategoriesView();
        createSubCategoriesView();
    };
}]);