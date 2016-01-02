(function() {
  "use strict";

  angular
    .module('app')
    .controller("UsersController", UsersController);

  UsersController.$inject = ['$scope', '$state', 'userDataService', '$log']

  function UsersController($scope, $state, userDataService, $log) {


    $scope.createUser = createUser;

    function createUser() {
      $scope.message = '';
      userDataService.create($scope.userData)
        .success(function(data) {
          $scope.userData = {};
          $scope.message = data.message;
          console.log $scope.message;
        });
        $state.go('home');
    }
  }
})();
