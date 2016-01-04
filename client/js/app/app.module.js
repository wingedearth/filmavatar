(function() {

  angular
    .module('app', ['ui.router'])
    .config(function($httpProvider) {
      $httpProvider.interceptors.push('authInterceptor');
    });

})();
