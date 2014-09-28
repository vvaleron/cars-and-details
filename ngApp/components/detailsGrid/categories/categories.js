app.service(
    "categoryService",
    function( $http, $rootScope ) {

        return({
            getCategories: getCategories
        });

        function getCategories() {

            var request = $http({
                url: location.origin + '/categories',
                method: "GET"
            });

            request.success(function(data, status, headers, config) {
                console.log(status, location.origin + '/categories', data);

                if (status == 200) {
                    $rootScope.categories = data;
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