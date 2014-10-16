app.service(
    "subCategoryService",
    function( $http, $rootScope ) {

        return ({
            getSubCategories: getSubCategories,
            addNew: addNew,
            updateCategory: updateCategory,
            filterFor: filterFor
        });

        function addNew (data) {
            var activeCategory = $rootScope.categories.active,
                params = {
                    name: data.name,
                    parent: activeCategory._id
                };

            var request = $http({
                url: location.origin + '/sub_categories',
                method: "POST",
                data: params
            });

            request.success(function(data, status, headers, config) {
                console.log(status, location.origin + '/sub_categories', data);

                if (status == 200) {
                    $rootScope.subCategories.push(config.data);
                    updateCategory();

                }else {
                    alert('Create Failed!');
                }
            });

            request.error(function(data, status, headers, config) {
                console.log('ERROR:   ',  status, location.origin, data);
            });

        }

        function filterFor (id) {

        }

        function getSubCategories() {

            var request = $http({
                url: location.origin + '/sub_categories',
                method: "GET"
            });

            request.success(function(data, status, headers, config) {
                console.log(status, location.origin + '/sub_categories', data);

                if (status == 200) {
                    $rootScope.subCategories = data;
                    updateCategory();

                } else if (status == 204) {
                    alert('You enter wrong email');
                } else {
                    alert('Login Failed!');
                }
            });

            request.error(function(data, status, headers, config) {
                console.log(status, location.origin + 'users/login', data);
            });

        }

        function updateCategory () {
            var categories = $rootScope.categories;

            for (key in categories) {
                categories[key]['childs'] = filterByParent(categories[key]._id);
//                $rootScope.categories[key]['childs'] = filterByParent(categories[key]._id);
            }

            $rootScope.categories = categories;
        }

        function filterByParent (id) {
            return $rootScope.subCategories.filter(function (item) {
                return item.parent == this.id;
            }, {id: id});
        }
    }
);

app.directive("subCategoriesView", function () {
    function link(scope, element, attrs) {
//        debugger
    }

    return {
        link: link,
        restrict: 'A',
        templateUrl: 'components/detailsGrid/subCategories/subCategoriesView.html'
    }
});