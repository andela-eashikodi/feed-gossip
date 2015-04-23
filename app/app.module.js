var myApp = angular.module("myApp", ['ngRoute']);

myApp.config(['$routeProvider',
  function($routeProvider) {
  $routeProvider.
  when('/homeview', {
    templateUrl: 'app/component/home/home.view.html',
    controller: 'homeCtrl'
  }).
    when('/videoandtext', {
    templateUrl: 'app/component/videoandtext/videoandtext.html',
    controller: 'VtCtrl'
  }).
  otherwise({
    redirectTo: '/homeview'
  });
}]);

var homeCtrl = myApp.controller("homeCtrl", function($scope){	
});
