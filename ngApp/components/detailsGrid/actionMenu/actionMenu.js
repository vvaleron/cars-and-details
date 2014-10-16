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

app.directive("itemsActions", function () {
    function link(scope, element, attrs) {
        console.log(scope, element, attrs, "itemsActions");
    }

    return {
        link: link,
        restrict: 'A',
        templateUrl: 'components/detailsGrid/actionMenu/itemsActions.html'
    }
});