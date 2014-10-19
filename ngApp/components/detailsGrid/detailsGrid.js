app.service(
    "detailsService",
    function( $http, $rootScope ) {

        return({
            transform: transform
        });

        function transform (cat, subCat) {

        }


    }
);

app.controller('details-grid-controller',
    [
        '$scope',
        '$http',
        'detailsService',
        'categoryService',
        'subCategoryService',
        'itemsService',


        function($scope, $http, detailsService, categoryService, subCategoryService, itemsService) {
             categoryService.getCategories();
             subCategoryService.getSubCategories();
             itemsService.getItems();
//            parentScope.$watch('categories', function(newVal, oldVal, $scope) {
//
//            });

            $scope.categorySettings = function (event, category) {
                $scope.actionModel = "categorySettings";
            };

            $scope.catSettingsWin = {
                activeView: 'list'
            };

            $scope.actionAdd = function (type) {

                switch (type) {
                    case "categories":
                        categoryService.addNew(this.addNewData.req);
                        break;
                    case "subCategories":
                        subCategoryService.addNew(this.addNewData.req);
                        subCategoryService.updateCategory();
                        break;
                    case "items":
                        itemsService.addNew(this.addNewData.req);
                        break;
                }
            };

            $scope.actionChange = function (model) {
                switch (model) {
                    case "categories":
                        var id = categoryService.getCurrent(true);
                        categoryService.change(id);
                        break;
                    case "subCategories":
                        subCategoryService.getCurrent();
                        break;
                    case "items":
                        itemsService.getCurrent();
                        break;
                }
            };

            $scope.kill = function (model) {
                switch (model) {
                    case "categories": 
                        categoryService.kill();
                        break;
                    case "subCategories":
                        subCategoryService.kill();
                        break;
                    case "items":
                        itemsService.kill();
                        break;
                }
            };

            $scope.subCatClick = function ($event, subCategory) {
                subCategoryService.setActiveSubCategory(subCategory);
                console.log(subCategory, "ACTIVE SUBCATEGORY");
            };
        }
    ]);