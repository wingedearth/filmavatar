(function() {
  "use strict";

  angular
    .module("app")
    .controller("ChannelsController", ChannelsController);

  ChannelsController.$inject = ["$state", "$scope", "$log", "$http", "channelDataService"];

  function ChannelsController($state, $scope, $log, $http, channelDataService) {

    $scope.channels     = channelDataService.allChannels;
    $scope.getChannel   = getChannel;

    function getChannel(id) {
      channelDataService.get(id);
    }

  }
})();
