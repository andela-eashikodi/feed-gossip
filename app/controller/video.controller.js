'use strict'
  //set the video elements
function setVideo(elementId, videoElement) {
  var videoParent = document.getElementById(elementId);
  videoParent.innerHTML = "";
  videoParent.appendChild(videoElement);
}

 
App.controller('VtCtrl', ['$scope', 'msgService',  function($scope, msgService) {

  $scope.username = "";
  $scope.friendId = "";
  $scope.activeCall = null;
  $scope.messageArray = [];
  // $scope.myMessage = [];
  $scope.messageText = msgService.getText().txt;

  var callOptions = {
    onLocalMedia: function(evt) {
    setVideo('localVideoSource', evt.element)
    },

    onConnect: function(evt) {
   setVideo('remoteVideoSource', evt.element)
    }
  };

  var appId = "69f1abbe-93d1-40db-aa81-b03858ec98c3";

  $scope.client = respoke.Client({
    appId: appId,
    baseURL: "https://api.respoke.io",
    developmentMode: true
  });

  //connect events
  $scope.client.listen('connect', function () {
      $scope.$apply();
  });

// call events
  $scope.client.listen('call', function(evt) {
   $scope.activeCall = evt.call;

   if ($scope.activeCall.caller !== true) {
   $scope.activeCall.answer(callOptions);
   $scope.activeCall.listen('hangup', function () {
    $scope.activeCall = null;
    $scope.$apply();
    });
   }

    $scope.$apply();
  });

  //to connect the two callers
  $scope.connect = function () {
   $scope.client.connect({
   endpointId: $scope.username
   });
  };

  //to make calls
  $scope.call = function () {
    var recipientEndpoint = $scope.client.getEndpoint({ id: $scope.friendId });
    $scope.activeCall = recipientEndpoint.startVideoCall(callOptions);
  };

  //to hangup calls
  $scope.hangup = function () {
   $scope.activeCall.hangup();
   $scope.activeCall = null;
  };

  //for text connection
  $scope.callClient = respoke.createClient({
    appId: appId,
    developmentMode: true
  });

  //for message
  $scope.callClient.listen('message', function(evt) {
    $scope.$apply(function() {
      $scope.message = evt.message.message;
      $scope.messageArray.push({
        name: $scope.remote,
        message: $scope.message,
        fdlnk: msgService.getText().lnk
      });
    });
  });

  $scope.doLogin = function() {
    console.log($scope.username);
    $scope.callClient.connect({
      endpointId : $scope.username
    });
  }


  $scope.sendMessage = function() {

    var endpoint = $scope.callClient.getEndpoint({id: $scope.remote});
    $scope.messageArray.push({name: $scope.username, message: $scope.messageText, fdlnk: msgService.getText().lnk});

    endpoint.sendMessage({message: $scope.messageText});
    $scope.messageText = "";
  };

}]);
