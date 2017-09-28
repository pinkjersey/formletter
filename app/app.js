'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.version'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.otherwise({redirectTo: '/view1'});
}]).controller('AppCtrl', function AppController($scope, $rootScope, $http, $compile) {
        angular.element(document).ready(function () {
            var converter = new showdown.Converter();
            converter.setOption('tables', 'true');
            var templateText = "<div style=\"text-align: right\">{{name}}</div>\n" +
                "<div style=\"text-align: right\">{{address1}}</div>" +
                "<div style=\"text-align: right\">{{address2}}</div>\n" +
                "{{recipientfirst}} {{recipientsecond}}  \n"+
                "{{recipientaddress1}}  \n" +
                "{{recipientaddress2}}\n\n" +
                "Dear {{msmrs}} {{recipientsecond}},\n\n" +
                "Lorem ipsum dolor sit amet, eu __inani__ _{{data}}_ dolores dissentiunt usu, eu has eius atqui, an cum quot soluta. Cu oportere splendide eam, rebum inermis expetenda id his, eu veritus detraxit delicata vix. At legere definiebas usu. Eam eius erant possit ea. Eripuit habemus deseruisse ne mei, ex civibus molestie vim. Quo ei diam fabellas vivendum. Eu luptatum probatus duo.\n\n" +
                "Per summo commune fabellas ex, saperet mediocrem ex nam, ad graeco docendi honestatis pri. An prima meliore eleifend vim, ea minim voluptaria complectitur mel. Qui nemore essent maiestatis in, eu impedit alienum pro. An mazim suscipiantur contentiones sea. Eu ceteros suscipit qualisque has, odio nominavi erroribus ius in.\n\n" +
                "#HEADING -- TABLE DATA BELOW\n\n" +
                "| Tables        | Are           | Cool  |\n"+
                "| ------------- |:-------------:| -----:|\n"+
                "| **col 3 is**  | right-aligned | $1600 |\n"+
                "| col 2 is      | *centered*    |   $12 |\n"+
                "| zebra stripes | ~~are neat~~  |    $1 |\n"

            ;
            var h = converter.makeHtml(templateText);
            var element = $('#example3div');
            element.html(h);
            $compile(element.contents())($scope);
            $scope.$apply();
        });
        $scope.data = 5;
        $scope.name = "Bob Santos";
        $scope.address1 = "123 Main St.";
        $scope.address2 = "Sometown, NY 10001";
        $scope.recipientfirst = "Sam";
        $scope.recipientsecond = "Tarly";
        $scope.recipientaddress1 = "666 Elm St.";
        $scope.recipientaddress2 = "Someothertown, NJ 07777";
        $scope.msmrs = "Mr.";

    }
);

angular.module('myApp').directive('vk', ['$compile', function ($compile) {
    return {
        template: '<div>Content of vk {{someValue}}</div>',
        restrict: 'E',
        link: function (scope, element, attrs) {
            console.log('"link" function inside directive vk called, "element" param is: ', element)
        }
    };
}]);

angular.module('myApp')
    .directive('compile', ['$compile', function ($compile) {
        return function (scope, element, attrs) {
            scope.$watch(
                function (scope) {
                    // watch the 'compile' expression for changes
                    return scope.$eval(attrs.compile);
                },
                function (value) {
                    // when the 'compile' expression changes
                    // assign it into the current DOM
                    element.html(value);

                    // compile the new DOM and link it to the current
                    // scope.
                    // NOTE: we only compile .childNodes so that
                    // we don't get into infinite loop compiling ourselves
                    $compile(element.contents())(scope);
                }
            );
        };
    }]);
