(function() {
"use strict";

  angular
    .module("app")
    .controller("MainController", MainController);

  MainController.$inject = ["$scope", "$state", "$log", "userDataService", "authService", "channelDataService"];

  function MainController($scope, $state, $log, userDataService, authService, channelDataService) {
    authService.getUser();
    $scope.$state         = $state;
    $scope.logout         = authService.logout;
    $scope.isLoggedIn     = authService.isLoggedIn;
    $scope.loginData; // form data for login
    $scope.currentUser    = authService.currentUser;

    channelDataService.all();
  }
})();
