(function() {
  "use strict";

  angular
    .module("app")
    .controller("ChannelController", ChannelController);

  ChannelController.$inject = ["$state", "$scope", "$log", "$http", "channelDataService"];

  function ChannelController($state, $scope, $log, $http, channelDataService) {

    $scope.chan          = channelDataService.currentChannel;
    $scope.deleteChannel = deleteChannel;
    $scope.videos        = $scope.chan.videos;
    $scope.getVideo      = getVideo;

    function deleteChannel(id) {
      channelDataService.delete($scope.chan._id)
      .then(function(response) {
        console.log(response);
      }, function(errRes) {
        console.error('There was an error deleting this channel!', errRes);
      }).then($state.go('channeldeleted'));
    }

    function getVideos() {
      $http.get('/api/channels' + $scope.chan._id + '/videos').then(function(response) {
        $scope.videos = response.data;
      }, function(errRes) {
        console.error('Error getting videos!', errRes);
      });
    }

    function getVideo(vid) {
      channelDataService.setCurrentVideo(vid);
      $state.go('video');
    }
  }

})();
