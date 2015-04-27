'use strict';

describe('FeedCtrl', function() {

  beforeEach(module('myApp'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));


  describe('$scope.site', function() {
    it('confirms the value of current site is null', function() {
      var $scope = {};
      var controller = $controller('FeedCtrl', { $scope: $scope });
      expect($scope.site).toEqual('');
    });
  });
});