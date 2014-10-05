app.service(
    "itemsService",
    function( $http, $rootScope ) {

        return({
            getItems: getItems,
            addNew: addNew
        });

        function addNew () {

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