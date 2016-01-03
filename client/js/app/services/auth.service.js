(function() {

  angular
    .module('app')
    .factory('authToken',       authToken)
    .factory('authService',     authService)
    .factory('authInterceptor', authInterceptor);

  authToken.$inject       = ['$window'];
  authService.$inject     = ['$http', '$q', 'authToken', 'userDataService', '$state'];
  authInterceptor.$inject = ['$q', '$location', 'authToken'];

/************************
*   Auth Token Factory
*************************/

  function authToken($window) {
    var authTokenFactory = {}; // declare token factory object

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

/************************
*   Auth Service Factory
*************************/

  function authService($http, $q, authToken, userDataService, $state) {
    var authFactory = {}; // declare auth service factory object
    var currentUser;

    // log the user in
    authFactory.login = function(email, password) {

      // send JSON in req.body to server's api/login route
      return $http.post('/api/login', {
        email: email,
        password: password
      })
        .success(function(data) {
          authToken.setToken(data.token);
          currentUser           = data.user;
          userDataService.user  = data.user;

          return data;
        });
    };

    // log the user out
    authFactory.logout = function() {
      authToken.setToken(); // clear out token

      $state.go('home');
    };

    // check if user is logged in
    authFactory.isLoggedIn = function() {
      if (authToken.getToken()) return true;
      else return false;
    };

    authFactory.currentUser = function() {
      return currentUser;
    };

    authFactory.getUser = function(id) {
      if (authToken.getToken())
        return $http.get('/api/users/' + id, {cache: true});
      else
        return $q.reject({message: 'Come back when you have a token.'});
    };

    return authFactory;
  }

/****************************
*   Auth Interceptor Factory
*****************************/

  function authInterceptor($q, $location, authToken) {

  }

})();
