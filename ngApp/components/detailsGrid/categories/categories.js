app.service(
    "categoryService",
    function( $http, $rootScope ) {

        return({
            getCategories: getCategories,
            addNew: addNew,
            change: change,
            getCurrent: getCurrent
        });

        function addNew (data) {

            var request = $http({
                url: location.origin + '/categories',
                method: "POST",
                data: data
            });

            request.success(function(data, status, headers, config) {


                if (status == 200) {
                    getCategories();
                    console.log(status, 'POST: /categories', data);
                } else if (status == 204) {
                    alert('You enter wrong email');
                } else {
                    alert('Login Failed!');
                }
            });

            request.error(function(data, status, headers, config) {
                console.log(status, 'POST: /categories', data);
            });

        }

        function change (id) {

        }

        function getCurrent(id) {
            return id ? $rootScope.categories.active._id : $rootScope.categories.active
        }

        function getCategories () {

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

app.directive("categoryView", function () {
    function link(scope, element, attrs) {
//        debugger
    }

    return {
        link: link,
        restrict: 'A',
        templateUrl: 'components/detailsGrid/categories/categoryView.html'
    }
});