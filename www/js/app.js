// (function(){
  angular.module('profeSearchStarter', ['ionic'])
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
    setTimeout(function() {
        navigator.splashscreen.hide();
    }, 450);

      if(window.cordova && window.cordova.plugins.Keyboard) {
        window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        window.cordova.plugins.Keyboard.disableScroll(false);
      } 




      if(window.StatusBar) {
        StatusBar.overlaysWebView(false);
        // StatusBar.style(1);
        StatusBar.backgroundColorByHexString('#0B4F84') 

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
         if(AdMob != undefined) 
          AdMob.createBanner( {
           adId:admobid.banner, 
            position:AdMob.AD_POSITION.BOTTOM_CENTER, 
            autoShow:false,
            overlap:false, 
            isTesting:false
             } );

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

/**
 * Filters out all duplicate items from an array by checking the specified key
 * @param [key] {string} the name of the attribute of each object to compare for uniqueness
 if the key is empty, the entire object will be compared
 if the key === false then no filtering will be performed
 * @return {array}
 */
.filter('unique', function () {

  return function (items, filterOn) {

    if (filterOn === false) {
      return items;
    }

    if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
      var hashCheck = {}, newItems = [];

      var extractValueToCompare = function (item) {
        if (angular.isObject(item) && angular.isString(filterOn)) {
          return item[filterOn];
        } else {
          return item;
        }
      };

      angular.forEach(items, function (item) {
        var valueToCheck, isDuplicate = false;

        for (var i = 0; i < newItems.length; i++) {
          if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
            isDuplicate = true;
            break;
          }
        }
        if (!isDuplicate) {
          newItems.push(item);
        }

      });
      items = newItems;
    }
    return items;
  };
});

