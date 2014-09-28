app.service(
    "subCategoryService",
    function( $http, $rootScope ) {

        return({
            getSubCategories: getSubCategories
        });

        function getSubCategories() {

            var request = $http({
                url: location.origin + '/sub_categories',
                method: "GET"
            });

            request.success(function(data, status, headers, config) {
                console.log(status, location.origin + '/sub_categories', data);

                if (status == 200) {
                    $rootScope.subCategories = data;
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
    }
);

app.directive("subCategoriesView", function () {
    function link(scope, element, attrs) {
        debugger
    }

    return {
        link: link,
        restrict: 'A',
        templateUrl: 'components/detailsGrid/subCategories/subCategoriesView.html'
    }
});