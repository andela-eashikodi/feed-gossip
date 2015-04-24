'use strict';

App.controller("FeedCtrl", ['$scope','FeedService', function ($scope,Feed) {  
  $scope.site = '';
  $scope.currentUrl='';
  (localStorage.getItem('savedpost')) ? $scope.saved = angular.fromJson(localStorage.getItem('savedpost')) : $scope.saved = [];
  (localStorage.getItem('allsite')) ? $scope.allfeed = angular.fromJson(localStorage.getItem('allsite')) : $scope.allfeed = [];
  // $scope.allfeed = [];

  $scope.loadFeed=function(e){
    $scope.currentUrl = $scope.site;
    // console.log(e);
    $scope.loading = true; 
    $scope.err = false;
    if($scope.site.substring(0,4)!=="http"){
      $scope.site = 'http://'+$scope.site;
    }
    $scope.currentUrl = $scope.site.substr(7,$scope.site.length);

    Feed.parseFeed($scope.site+"/feed").then(function(res){
    if(res.data.responseData===null){
      $scope.err = true;
    }
    $scope.feeds=res.data.responseData.feed.entries;
    $scope.pageload = true;
    $scope.loading = false;
    $scope.site = '';
    $scope.err = false;
    });

    if($scope.feeds===undefined){
      $scope.loading = false;
      $scope.err = true;
    }
  };

  $scope.arr = function(feed){
    for(var key in $scope.saved){
      if($scope.saved[key].title===feed.title){
        return;
      }
    }
    $scope.saved.unshift({title:feed.title, link: feed.link});
    localStorage.setItem('savedpost', angular.toJson($scope.saved));

  };

  $scope.news = function(itemadd){
    for(var key in $scope.allfeed){
      if($scope.allfeed[key].name===itemadd){
        return;
      }
    }
    $scope.allfeed.unshift({name:itemadd, link:'http://'+itemadd});
    $scope.infeed = '';
    localStorage.setItem('allsite', angular.toJson($scope.allfeed));
  };

  $scope.removeall = function(){
    localStorage.removeItem('allsite');
    $scope.allfeed = [];
  };

  $scope.removesave = function(){
    localStorage.removeItem('savedpost');
    $scope.saved = [];
  };

}]);

App.factory('FeedService',['$http',function($http){
  return {
    parseFeed : function(url){
      return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
    }
  };
}]);