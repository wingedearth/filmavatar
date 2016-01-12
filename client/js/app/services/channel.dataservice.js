(function() {
  "use strict";

  angular
    .module("app")
    .factory("channelDataService", channelDataService);

  channelDataService.$inject = ['$http', '$state'];

  function channelDataService($http, $state) {

    var channelFactory = {};

    channelFactory.get = function(id) {
      return $http.get('/api/channels/' + id)
      .success(function(response) {
         channelFactory.currentChannel = response;
         $state.go('channel');
      });
    };

    channelFactory.refreshChannel = function(id) {
      return $http.get('/api/channels/' + id)
      .success(function(response) {
         channelFactory.currentChannel = response;
      });
    };

    channelFactory.all = function() {
      return $http.get('/api/channels/')
      .success(function(response) {
         channelFactory.allChannels = response;
      });
    };

    // POST (create) a new channel
    // channelData is an object that name, imageUrl, and description
    channelFactory.create = function(channelData) {
      return $http.post('/api/channels/', channelData);
    };

    channelFactory.delete = function(id) {
      return $http.delete('/api/channels/' + id);
    };

    channelFactory.setCurrentVideo = function(vid) {
      channelFactory.currentVideo = vid;
    };

    // POST a new video to the current channel
    // videoData is an object that includes title and url
    channelFactory.newVideo = function(channel, videoData) {
      console.log(videoData);
      return $http.post('api/channels/' + channel._id + '/videos', videoData);
    };

    channelFactory.deleteVideo = function(channel, title) {
      console.log("channel.name: ", channel.name);
      console.log("title object: ", title);
      return $http.put('/api/videos/' + channel._id, title);
    };

    return channelFactory;
  }

})();
