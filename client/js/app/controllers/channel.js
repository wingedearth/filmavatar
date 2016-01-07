(function() {
  "use strict";

  angular
    .module("app")
    .controller("ChannelController", ChannelController);

  ChannelController.$inject = ["$state", "$scope", "$log", "$http", "channelDataService"];

  function ChannelController($state, $scope, $log, $http, channelDataService) {

    $scope.chan = channelDataService.currentChannel;
  }

})();
