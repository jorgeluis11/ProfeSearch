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
                targetElement.fadeOut(700,function(){
                	//Remove Parent
                	element.remove();
                });             
            });
        }
	};
}])