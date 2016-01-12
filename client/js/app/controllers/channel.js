(function() {
  "use strict";

  angular
    .module("app")
    .controller("ChannelController", ChannelController);

  ChannelController.$inject = ["$state", "$scope", "$log", "$http", "channelDataService", "$sce", "authService"];

  function ChannelController($state, $scope, $log, $http, channelDataService, $sce, authService) {

    // getChannel(channelDataService.currentChannel._id);

    $scope.chan          = channelDataService.currentChannel;
    $scope.deleteChannel = deleteChannel;
    $scope.videos        = $scope.chan.videos;
    $scope.getVideo      = getVideo;
    $scope.addVideo      = addVideo;
    $scope.getChannel    = getChannel;
    $scope.deleteVideo   = deleteVideo;
    $scope.isLoggedIn    = authService.isLoggedIn;

    function deleteChannel(id) {
      channelDataService.delete($scope.chan._id)
      .then(function(response) {
        console.log(response);
      }, function(errRes) {
        console.error('There was an error deleting this channel!', errRes);
      }).then($state.go('channeldeleted'));
    }

    function getChannel(id) {
      channelDataService.refreshChannel(id);
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

    function addVideo() {
      $scope.message = ''; // clear pre-existing message
      // channelDataService.newVideo($scope.chan, {title: $scope.videoData.title, url: $sce.trustAsResourceUrl($scope.videoData.url) } )
      channelDataService.newVideo($scope.chan, {title: $scope.videoData.title, url: $scope.videoData.url } )
        .then(function(resp) {
          $log.log(resp);
          $scope.videoData = {}; // clear videoData for subsequent use
          getChannel(channelDataService.currentChannel._id);
        })
        .then($state.go('newvideoadded'));
    }

    function deleteVideo(vid) {
      console.log("$scope.chan: ", $scope.chan);
      console.log("vid.title: ", vid.title);
      channelDataService.deleteVideo($scope.chan, {"title": vid.title} )
        .then(function(resp) {
          $log.log(resp);
          getChannel(channelDataService.currentChannel._id);
          $state.go('videodeleted');
        });
    }
  }

})();
