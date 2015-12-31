(function() {
"use strict";

  angular
    .module("app")
    .controller("MainController", MainController);

  MainController.$inject = ["$scope", "$state", "$log"];
  // MainController.$inject = ["$scope", "$state", "userDataService", "$log", "authService"];

  function MainController($scope, $state, userDataService, $log, authService) {
    var vm = this;
    vm.videos = "video1";
    vm.$state = $state;

  }

})();
