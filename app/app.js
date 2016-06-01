(function() {

    'use strict';
    
    var shack = angular.module('shack', [
        'ngRoute',
        'ui.router',
        'ngMaterial',
        'ngAnimate'
    ]);

    // material design config
    shack.config(["$mdThemingProvider", "$mdIconProvider", function ($mdThemingProvider, $mdIconProvider){

        $mdThemingProvider.theme('default')
            .primaryPalette('indigo')
            .accentPalette('pink');

    }]);

    // ui-router config
    shack.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider){

          // For any unmatched url, redirect to /main
          $urlRouterProvider.otherwise("/main");
          
          // Set up the states
          $stateProvider
            .state('main', {
              url: "/main",
              templateUrl: "main/main.html",
              controller: 'MainController as vm'
            })
            .state('car_detail', {
              url: "/car_detail/:id",
              templateUrl: "car_detail/car_detail.html",
              controller: 'DetailController'
            })
            .state('account', {
              url: "/account",
              templateUrl: "account/account.html",
              controller: 'AccountController'
            })
            .state('login', {
              url: "/login",
              templateUrl: "user/login/login.html",
              controller: 'LoginController'
            })
            .state('signup', {
              url: "/signup",
              templateUrl: "user/signup/signup.html",
              controller: 'SignupController'
            })
        }]);
})();

