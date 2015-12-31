(function() {
  "use strict";

  angular
    .module("app", ['ui.router'])
    .config(router);

  function router($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home.html'
      });
  };


})();
