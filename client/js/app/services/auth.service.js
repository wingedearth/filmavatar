(function() {

  angular
    .module('app')
    .factory('authToken',       authToken)
    .factory('authService',     authService)
    .factory('authInterceptor', authInterceptor);

  authToken.$inject       = ['$window'];
  authService.$inject     = ['$http', '$q', 'authToken', 'userDataService', '$state'];
  authInterceptor.$inject = ['$q', '$location', 'authToken'];

  function authToken($window) {
    var authTokenFactory = {}; // clear out authTokenFactory values

    // method to retrieve user's stored token from localStorage
    authTokenFactory.getToken = function() {
      return $window.localStorage.getItem('token');
    };

    // set token, if a token is passed
    authTokenFactory.setToken = function(token) {
      if (token) {
        $window.localStorage.setItem('token', token)

        // if no token is passed, clear token out of localStorage
      } else {
        $window.localStorage.removeItem('token')
      }
    };

    return authTokenFactory;
  }

  function authService($http, $q, authToken, userDataService, $state) {

  }

  function authInterceptor($q, $location, authToken) {

  }

})();
