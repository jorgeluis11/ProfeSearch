// (function(){
  angular.module('profeSearchStarter', ['ionic'])
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        console.log(cordova.plugins.Keyboard)
      }
      if(window.StatusBar) {
        StatusBar.overlaysWebView(false);
        // StatusBar.style(1);
        StatusBar.backgroundColorByHexString('#0B4F84') //red

      } 

      // if(window.plugins && window.plugins.AdMob) {

        var admobid = {};
        if( /(android)/i.test(navigator.userAgent) ) { // for android
            admobid = {
                banner: 'ca-app-pub-3280086563050737/9945801204', // or DFP format "/6253334/dfp_example_ad"
            };
        } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
            admobid = {
                banner: 'ca-app-pub-3280086563050737/7131935603', // or DFP format "/6253334/dfp_example_ad"
            };
        } else { // for windows phone
            admobid = {
                banner: 'ca-app-pub-xxx/zzz', // or DFP format "/6253334/dfp_example_ad"
            };
        }
         // if(AdMob != undefined) 
         //  AdMob.createBanner( {
         //   adId:admobid.banner, 
         //    position:AdMob.AD_POSITION.BOTTOM_CENTER, 
         //    autoShow:false,
         //    overlap:false, 
         //    isTesting:true
         //     } );

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
        templateUrl: 'templates/professors/index.html',
        controller:"professorController"
      });
    
    $urlRouterProvider.otherwise('/search');
  
  })
  // var app = angular.module("profesors",[])
// })();

