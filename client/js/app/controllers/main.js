(function() {
"use strict";

  angular
    .module("app")
    .controller("MainController", MainController);

  MainController.$inject = [
      "$scope", "$state", "$log",
      "userDataService", "authService", "channelDataService"];

  function MainController($scope, $state, $log, userDataService, authService, channelDataService) {
    authService.getUser();
    $scope.$state         = $state;
    // $scope.login          = login;
    $scope.logout         = authService.logout;
    $scope.isLoggedIn     = authService.isLoggedIn;
    $scope.loginData; // form data for login
    // $scope.checkCurrentUser = checkCurrentUser;
    $scope.currentUser    = authService.currentUser;

    channelDataService.all();
    // checkCurrentUser();

    // function checkCurrentUser() {
    //   if (authService.isLoggedIn()) {
    //     authService.getUser();
    //   }
    // }

    // function login() {
    //   authService.login($scope.loginData.email, $scope.loginData.password)
    //     .then(function(res) {
    //       userDataService.user = res.data.user;
    //       $state.go('home');
    //     });
    // }
  }
})();
