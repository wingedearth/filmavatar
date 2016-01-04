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
      .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: "LoginController"
      })
      .state("register", {
        url: "/register",
        templateUrl: "templates/register.html",
        controller: "UsersController"
      })
      .state("channels", {
        url: "/channels",
        templateUrl: "templates/channels.html",
        controller: "ChannelsController"
      })
      .state("mychannels", {
        url: "/mychannels",
        templateUrl: "templates/mychannels.html",
        controller: "MyChannelsController"
      })
      .state("channel", {
        url: "/channel",
        templateUrl: "templates/channel.html",
        controller: "ChannelController"
      })
      .state("video", {
        url: "/video",
        templateUrl: "templates/video.html",
        controller: "VideoController"
      });

      $urlRouterProvider.otherwise("/");
  }

})();
