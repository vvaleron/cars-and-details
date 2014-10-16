app.service(
    "itemsService",
    function( $http, $rootScope ) {

        return({
            getItems: getItems,
            addNew: addNew
        });

        function addNew (data) {
            var activeCategory = $rootScope.categories.active,
                activeSubCategory = $rootScope.subCategories.active,
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
            debugger
        }
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