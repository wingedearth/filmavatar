(function() {
  "use strict";

  angular
    .module("app")
    .controller("ChannelsController", ChannelsController);

  ChannelsController.$inject = ["$state", "$scope", "$log", "$http", "channelDataService", "authService"];

  function ChannelsController($state, $scope, $log, $http, channelDataService, authService) {

    getChannels();

    // $scope.channels       = channelDataService.allChannels;
    $scope.getChannel     = getChannel;
    $scope.createChannel  = createChannel;
    $scope.isLoggedIn     = authService.isLoggedIn;

    function getChannel(id) {
      channelDataService.get(id);
    }

    function getChannels() {
      $http.get('/api/channels').then(function(response) {
        $scope.channels = response.data;
      }, function(errRes) {
        console.error('Error getting channels!', errRes);
      });
    }

    function createChannel() {
      $scope.message = ''; // clear pre-existing message
      channelDataService.create($scope.channelData)
        .then(function(resp) {
          console.log(resp);
          $log.log(resp);
          // $scope.channels = response;
          // channelDataService.allChannels =
          $scope.channelData = {}; // clear channelData for subsequent use
        })
        .then($state.go('newchannelcreated'));
    }

  }
})();
