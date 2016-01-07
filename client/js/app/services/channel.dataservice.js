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

    channelFactory.all = function() {
      return $http.get('/api/channels/')
      .success(function(response) {
         channelFactory.allChannels = response;
      });
    };

    return channelFactory;
  }

})();
