(function() {
  "use strict";

  angular
    .module("app")
    .config(router);

  router.$inject = ["$stateProvider", "$urlRouterProvider"];

  function router($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'templates/home.html'
      })
      .state("user", {})

      $urlRouterProvider.otherwise("/");
  }

})();
