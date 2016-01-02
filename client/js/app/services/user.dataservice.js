(function() {
  "use strict";

  angular
    .module("app")
    .factory("userDataService", userDataService);

  userDataService.$inject = ['$http'];

  function userDataService($http) {

    var userFactory = {};
    userFactory.user = {};

    // GET a user
    userFactory.get = function(id) {
      return $http.get('/api/users/' + id);
    };

    // GET current user's own info
    userFactory.me = function(id) {
      return $http.get('/api/me/');
    };

    // GET all users
    userFactory.all = function() {
      return $http.get('/api/users/');
    };

    // POST (create) a new user
      // userData is an object that includes the following keys:
      // email, handle, city, state, zip, password (all as Strings)
    userFactory.create = function(userData) {
      return $http.post('/api/users/', userData);
    };

    // PUT (edit/update) a user
      // userData is an object that includes the following keys:
      // email, handle, city, state, zip, password (all as Strings)
    userFactory.update = function(id, userData) {
      return $http.put('/api/users/' + id, userData);
    };

    // delete a user
    userFactory.delete = function(id) {
      return $http.delete('/api/users/' + id);
    };

    return userFactory;
  }

})();
