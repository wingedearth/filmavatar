(function() {
  "use strict";

  angular
    .module("app")
    .controller("VideoController", VideoController);

  // VideoController.$inject = ["$state", "$scope", "$log", "$http", "channelDataService", "$sce"];
  VideoController.$inject = ["$state", "$scope", "$log", "$http", "channelDataService", "$sce"];

  // function VideoController($state, $scope, $log, $http, channelDataService, $sce, $sanitize) {
  function VideoController($state, $scope, $log, $http, channelDataService, $sce) {
    $scope.chan             = channelDataService.currentChannel;
    $scope.currentVideo     = channelDataService.currentVideo;
    $scope.currentVideoUrl  = $sce.trustAsResourceUrl($scope.currentVideo.url);

    initializePlayer();

    console.log("$scope.chan.name: ", $scope.chan.name);
    console.log("$scope.currentVideo: ", $scope.currentVideo);
    console.log("$scope.currentVideo.title: ", $scope.currentVideo.title);
    console.log("$scope.currentVideo.url: ", $scope.currentVideo.url);
    console.log("$scope.currentVideoUrl: ", $scope.currentVideoUrl);

    function initializePlayer() {

      // jQuery element variables
      $scope.$player        = $('#player');
      $scope.$vid           = $('#myVideo');

      // DOM element variables
      $scope.vid           = $scope.$vid[0];

      // initialize video state
      $scope.vid.loop      = false;
      $scope.vid.muted     = false;
      $scope.vid.autoplay  = true;
      $scope.vid.controls  = true;
    }
  }
})();
