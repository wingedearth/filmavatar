(function() {
  "use strict";

  angular
    .module("app")
    .controller("ChannelsController", ChannelsController);

  ChannelsController.$inject = ["$state", "$scope", "$log", "$http", "channelDataService"];

  function ChannelsController($state, $scope, $log, $http, channelDataService) {

    $scope.channels;
    $scope.getChannels  = getChannels;
    $scope.getChannel   = getChannel;
    getChannels();


    function getChannels() {
      $http.get('/api/channels').then(function(response) {
        $scope.channels = response.data;
      }, function(errRes) {
        console.error('There was an error retrieving the channels index!', errRes);
      });
    }

    function getChannel(id) {
      channelDataService.get(id);
    }

  }
})();
