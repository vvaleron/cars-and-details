app.controller('details-grid-controller',
    [
        '$scope',
        '$http',
        'categoryService',
        'subCategoryService',
        'itemsService',


        function($scope, $http, categoryService, subCategoryService, itemsService) {
            var parentScope = $scope.$parent;
            categoryService.getCategories();
            debugger

//            parentScope.$watch('categories', function(newVal, oldVal, $scope) {
//
//            });

            console.log('details-grid-controller', $scope);
        }
    ]);