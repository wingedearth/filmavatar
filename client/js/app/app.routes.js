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
        templateUrl: 'templates/home.html',
        controller: ""
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
      .state("addchannel", {
        url: "/channels/new",
        templateUrl: "templates/newchannel.html",
        controller: "ChannelsController"
      })
      .state("newchannelcreated", {
        url: "/channels/new/created",
        templateUrl: "templates/newchannelcreated.html"
      })
      .state("channeldeleted", {
        url: "/channels/deleted",
        templateUrl: "templates/channeldeleted.html"
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
      .state("newvideo", {
        url: "/channel/addvideo",
        templateUrl: "templates/newvideo.html",
        controller: "ChannelController"
      })
      .state("newvideoadded", {
        url: "/channel/newvideoadded",
        templateUrl: "templates/newvideoadded",
        controller: "ChannelController"
      })
      .state("videos", {
        url: "/videos",
        templateUrl: "templates/videos.html",
        controller: "ChannelController"
      })
      .state("video", {
        url: "/video",
        templateUrl: "templates/video.html",
        controller: "VideoController"
      })
      .state("about", {
        url: "/about",
        templateUrl: "templates/about.html"
      });

      $urlRouterProvider.otherwise("/");
  }

})();
