// (function(){
  angular.module('profeSearchStarter', ['ionic'])
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
  .config(function($stateProvider, $urlRouterProvider){

    //$stateProvider.state('splash', {
        // url: '/',
        // views: {
        // splash: {
        //   templateUrl: '../templates/base/splash.html'
        //   }
        // }
      // });
    $stateProvider.state('home', {
        url: '/search',
        templateUrl: '../templates/professors/index.html',
        controller:"professorController"
      });
    
    $urlRouterProvider.otherwise('/search');
  
  })
  // var app = angular.module("profesors",[])
// })();