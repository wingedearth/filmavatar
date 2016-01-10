(function() {
  "use strict";

  angular
    .module("app")
    .controller("ChannelsController", ChannelsController);

  ChannelsController.$inject = ["$state", "$scope", "$log", "$http", "channelDataService"];

  function ChannelsController($state, $scope, $log, $http, channelDataService) {

    $scope.channels       = channelDataService.allChannels;
    $scope.getChannel     = getChannel;
    $scope.createChannel  = createChannel;
    $scope.channelData;

    function getChannel(id) {
      channelDataService.get(id);
    }

    function createChannel() {
      $scope.message = ''; // clear pre-existing message
      channelDataService.create($scope.channelData)
        .success(function(data) {
          $scope.channelData = {}; // clear channelData for subsequent use
          $scope.message = data.message;
          console.log($scope.message);
        });
        $state.go('channels');
    }

  }
})();
