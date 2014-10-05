app.directive("actionMenuView", function () {
    function link(scope, element, attrs) {
        console.log(scope, element, attrs, "actionMenuView");
    }

    return {
        link: link,
        restrict: 'A',
        templateUrl: 'components/detailsGrid/actionMenu/actionMenuView.html'
    }
});