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
//            parentScope.$watch('categories', function(newVal, oldVal, $scope) {
//
//            });

            $scope.categorySettings = function (event, category) {
                this.$parent.$parent.actionModel = "categorySettings";
                var current = categoryService.getCurrent(),
                    subCategories = subCategoryService.filterFor(current._id);

                console.log(event, category);
            };

            $scope.actionAdd = function () {
                var model = this.actionModel;

                switch (model) {
                    case "categories":
                        categoryService.addNew(this.addNewData.req);
                        break;
                    case "subCategories":
                        subCategoryService.addNew(this.addNewData.req);
                        break;
                    case "items":
                        itemsService.addNew(this.addNewData.req);
                        break;
                }
            };

            $scope.actionChange = function () {
                var model = this.actionModel;

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

            console.log('details-grid-controller', $scope);
        }
    ]);