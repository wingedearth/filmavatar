(function() {
  "use strict";

  angular
    .module("app")
    .factory("userDataService", userDataService);

  userDataService.$inject = ['$http'];

  function userDataService($http) {

    var userFactory = {};

    userFactory.user = {};

    return userFactory;
  }

})();
