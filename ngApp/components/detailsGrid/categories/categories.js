app.service(
    "categoryService",
    function( $http, $rootScope ) {

        return({
            categorySettings: categorySettings,
            getCategories: getCategories,
            addNew: addNew,
            change: change,
            kill: kill,
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
                    $rootScope.categories.push(config.data);
//                    getCategories();
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
            // AJAX in Ext.js
            
        // changeCategory:function(form,window){
        //     var me = this,
        //         _id = MD.activeCategoryId;
        //     form.getForm().submit({
        //         url             : '/categories/'+_id,
        //         method          : 'PUT',
        //         params          : form.getValues(),
        //         success: function(form, action) {
        //             var result = Ext.JSON.decode(action.response.responseText);
        //             console.log(result);
        //             Ext.getStore('Categories').reload();
        //             window.close();
        //         },
        //         failure: function(form, action) {
        //             switch (action.failureType) {
        //                 case Ext.form.action.Action.CLIENT_INVALID:
        //                     //                            console.log('Failure', 'CLIENT_INVALID');
        //                     break;
        //                 case Ext.form.action.Action.CONNECT_FAILURE:
        //                     //                            console.log('Failure', 'AJAX CONNECT_INVALID');
        //                     break;
        //                 case Ext.form.action.Action.SERVER_INVALID:
        //                 //                            console.log('Failure', 'SERVER_INVALID', action.result.msg);
        //             }
        //         }
        //     })
        // },
            debugger
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

        function categorySettings () {
            $rootScope
        }

        function kill () {
            var id = this.getCurrent()._id;
            
            var request = $http({
                url: location.origin + '/categories/' + id,
                method: "DELETE"
            });

            request.success(function(data, status, headers, config) {


                if (status == 200) {
                    var categories = $rootScope.categories;
                    categories.forEach(function(item, index, arr){
                        if (item._id == id) {
                            delete arr[index];
                        }
                    });
                    $rootScope.categories = categories;
                    console.log(status, 'DELETE: /categories' + id, arguments);
                } else {
                    alert('DELETE response parsing Failed!');
                }
            });

            request.error(function(data, status, headers, config) {
                console.log(status, '!!!!ERROR!!!! DELETE: /categories' + id, arguments);
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