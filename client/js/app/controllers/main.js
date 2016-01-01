(function() {
"use strict";

  angular
    .module("app")
    .controller("MainController", MainController);

  MainController.$inject = ["$scope", "$state", "$log"];
  // MainController.$inject = ["$scope", "$state", "userDataService", "$log", "authService"];

  // function MainController($scope, $state, userDataService, $log, authService) {
  function MainController($scope, $state, userDataService, $log) {
    // var vm = this;
    // vm.videos = "video1";
    // vm.$state = $state;
    $scope.$state = $state;
    $scope.videos = "video2";
  }

})();
