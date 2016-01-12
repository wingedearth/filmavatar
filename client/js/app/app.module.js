(function() {

  angular
    .module('app', [
        "ui.router",
        // "com.2fdevs.videogular",
        // "com.2fdevs.videogular.plugins.controls",
        // "com.2fdevs.videogular.plugins.overlayplay",
        // "com.2fdevs.videogular.plugins.poster",
        // "ngSanitize"
      ])
    .config(function($httpProvider) {
      $httpProvider.interceptors.push('authInterceptor');
    });

})();
