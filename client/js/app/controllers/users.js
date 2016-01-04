(function() {
  "use strict";

  angular
    .module('app')
    .controller("UsersController", UsersController);

  UsersController.$inject = ['$scope', '$state', 'userDataService', '$log']

  function UsersController($scope, $state, userDataService, $log) {

    // attach functions to controller
    $scope.createUser = createUser;
    $scope.currentUser = authService.currentUser;

    // define functions
    function createUser() {
      $scope.message = ''; // clear pre-existing message
      userDataService.create($scope.userData)
        .success(function(data) {
          $scope.userData = {}; // clear userData for subsequent use
          $scope.message = data.message;
          console.log($scope.message);
        });
        $state.go('home');
    }
  }
})();
