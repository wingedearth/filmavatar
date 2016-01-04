(function() {
"use strict";

  angular
    .module("app")
    .controller("MainController", MainController);

  MainController.$inject = ["$scope", "$state", "userDataService", "$log", "authService"];

  function MainController($scope, $state, userDataService, $log, authService) {
    $scope.$state     = $state;
    $scope.videos     = "video2";
    $scope.logout     = authService.logout;
    $scope.login      = authService.login;
    $scope.isLoggedIn = authService.isLoggedIn;
  }

})();
