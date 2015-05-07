angular.module('profeSearchStarter').
directive('splashScreen', [function ($scope) {
	return {
		templateUrl: 'templates/base/splash.html',
		restrict: 'E',
		link: function(scope, element, attrs) {
            scope.about = attrs.about;
            var fadeDuration = attrs.fadeDuration || 1000;
            var onEvent = attrs.fade || click;

            element.on(onEvent, function() {
                if(window.cordova && window.cordova.plugins.Keyboard)
                  {
                    window.cordova.plugins.Keyboard.close();
                  }
                $("#search").val("");
                var targetElement = $('#' + attrs.fadeTarget);
                    AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);
                if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) // for ios
                      $("#header-custom").css({"padding-top":"20px"});

                targetElement.fadeOut(700,function()
                {
                	element.remove();
                });             
            });
        }
	};
}]).directive('header', [function () {
    return {
        restrict: 'E',
        scope:false,
        templateUrl:"templates/base/info/header.html",
        link:function(scrope, element, attrs){
            $(element).find("#filter-funnel").css("visibility","hidden")
        }
    };
}]).directive('universityHeader', [function () {
    return {
        restrict: 'E',
        scope:false,
        templateUrl:"templates/base/info/university-header.html",
        link:function(scrope, element, attrs){
        }
    };
}]);