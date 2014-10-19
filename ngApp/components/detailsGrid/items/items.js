app.filter(
    "testFilter",
    function ( data ) {
        debugger
    }
);

app.service(
    "itemsService",
    function( $http, $rootScope ) {

        return({
            getItems: getItems,
            addNew: addNew
        });

        function addNew (data) {
            var activeCategory = $rootScope.categories.active,
                activeSubCategory = $rootScope.subCategories.active._id,
                params = {
                    name: data.name,
                    categoryId: activeCategory._id,
                    subCategoryId   : activeSubCategory ? activeSubCategory : null
                };


            var request = $http({
                url: location.origin + '/items',
                method: "POST",
                data: params
            });

            request.success(function(data, status, headers, config) {
                console.log(status, location.origin + '/items', data);

                if (status == 200) {
                    console.log(config);
                    $rootScope.Items.push(config.data);
                    updateItems();

                }else {
                    alert('Create Failed!');
                }
            });

            request.error(function(data, status, headers, config) {
                console.log('ERROR:   ',  status, location.origin, data);
            });
        }

        function getItems() {

            var request = $http({
                url: location.origin + '/items',
                method: "GET"
            });

            request.success(function(data, status, headers, config) {
                console.log(status, location.origin + '/items', data);

                if (status == 200) {
                    $rootScope.Items = data;
                    updateItems();
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

        function updateItems () {
           var subCategories = $rootScope.subCategories;

//            TODO: use $filterProvider for custom filters
//            $filter('filter')(subCategories, filterBySubcategory, true);
//            console.log($filter, "$filter");

//           for (key in subCategories) {
//               subCategories[key]["items"] = filterBySubcategory(subCategories[key]._id);
//           }
        }

        function filterBySubcategory (item) {
            debugger
        }

//        function filterBySubcategory (id) {
//            return $rootScope.Items.filter(function (item, index, arr) {
//                return item.subCategoryId == this.id;
//            }, {id: id});
//        }

    }
);

app.directive("itemsView", function () {
    function link(scope, element, attrs) {
//        debugger
    }

    return {
        link: link,
        restrict: 'A',
        templateUrl: 'components/detailsGrid/items/itemsView.html'
    }
});