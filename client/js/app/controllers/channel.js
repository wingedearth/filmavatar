(function() {
  "use strict";

  angular
    .module("app")
    .controller("ChannelController", ChannelController);

  ChannelController.$inject = ["$state", "$scope", "$log", "$http", "channelDataService"];

  function ChannelController($state, $scope, $log, $http, channelDataService) {

    $scope.chan          = channelDataService.currentChannel;
    $scope.deleteChannel = deleteChannel;


    function deleteChannel(id) {
      // $http.delete('/api/channels/' + id)
      channelDataService.delete($scope.chan._id)
      .then(function(response) {
        console.log(response);
      }, function(errRes) {
        console.error('There was an error deleting this channel!', errRes);
      }).then($state.go('channeldeleted'));
    }
  }

})();
