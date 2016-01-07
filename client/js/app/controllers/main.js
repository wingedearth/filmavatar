(function() {
"use strict";

  angular
    .module("app")
    .controller("MainController", MainController);

  MainController.$inject = [
      "$scope", "$state", "$log",
      "userDataService", "authService", "channelDataService"];

  function MainController($scope, $state, $log,
      userDataService, authService, channelDataService) {
    $scope.$state     = $state;
    $scope.logout     = authService.logout;
    $scope.login      = authService.login;
    $scope.isLoggedIn = authService.isLoggedIn;
    channelDataService.all();
  }

})();
