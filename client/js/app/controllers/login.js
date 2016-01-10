(function() {
  "use strict";

  angular
    .module("app")
    .controller("LoginController", LoginController);

  LoginController.$inject = ["$scope", "$state", "userDataService", "$log", "authService"];

  function LoginController($scope, $state, userDataService, $log, authService) {
    $scope.login       = login;
    $scope.logout      = authService.logout;
    $scope.isLoggedIn  = authService.isLoggedIn;
    $scope.currentUser = userDataService.user;
    $scope.loginData; // form data for login

    function login() {
      authService.login($scope.loginData.email, $scope.loginData.password)
        .then(function(res) {
          $log.log(res.data);
          userDataService.user = res.data.user;
          $state.go('home');
        });
    }

  }

})();
