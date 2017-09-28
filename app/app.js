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
        var converter = new Markdown.Converter();
        $http({
            method: 'GET',
            url: 'http://localhost:8080/templateServer/'
        }).then(function successCallback(response) {
            var h = converter.makeHtml(response.data);
            var element = $('#example3div');
            element.html(h);
            $compile(element.contents())($scope);

        }, function errorCallback(response) {
            if (request.status === 0)
            {
                alert('Not connected. Verify Network.');
            }
            else if (request.status == 404)
            {
                alert('Requested page not found. [404]');
            }
            else if (request.status == 500)
            {
                alert('Internal Server Error [500].');
            }
            else if (exception === 'parsererror')
            {
                alert('Requested JSON parse failed.');
            }
            else if (exception === 'timeout')
            {
                alert('Time out error.');
            }
            else if (exception === 'abort')
            {
                alert('Ajax request aborted.');
            }
            else
            {
                alert('Uncaught Error.n' + jqXHR.responseText);
            }
        });
    });
    $scope.myText = "HEADER 2";
    $scope.data = 5;
    $scope.someValue = 15;
    $scope.myTitle = "BOBCAT OF COURSE";
    $scope.renderdirective = false;
    $rootScope.triggerRelink = function() {
        $rootScope.$broadcast('myEventName')
    }
    }
);

angular.module('myApp').directive('vk', ['$compile', function ($compile) {
    return {
        template: '<div>Content of vk {{someValue}}</div>',
        restrict: 'E',
        link: function(scope, element, attrs){
            console.log('"link" function inside directive vk called, "element" param is: ', element)
        }
    };
}]);

angular.module('myApp')
    .directive('compile', ['$compile', function ($compile) {
        return function(scope, element, attrs) {
            scope.$watch(
                function(scope) {
                    // watch the 'compile' expression for changes
                    return scope.$eval(attrs.compile);
                },
                function(value) {
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
