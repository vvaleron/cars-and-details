app.controller('details-grid-controller', ['$scope', '$http', 'categoryService', function($scope, $http, categoryService) {
    var parentScope = $scope.$parent;
    categoryService.getCategories();

    parentScope.$watch('categories', function(newVal, oldVal, $scope) {

    });

    console.log('details-grid-controller', $scope);
}]);