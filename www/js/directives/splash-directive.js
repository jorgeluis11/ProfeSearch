angular.module('profeSearchStarter').
directive('splashScreen', [function ($scope) {
	return {
		templateUrl: 'templates/base/splash.html',
		restrict: 'E',
		link: function(scope, element, attrs) {
            scope.about = attrs.about;
            var fadeDuration = attrs.fadeDuration || 1000;
            var onEvent = attrs.fade || click;

            // See how the directive alone controls the events, not the scope
            element.on(onEvent, function() {
                var targetElement = $('#' + attrs.fadeTarget);
                targetElement.fadeOut(700,function(){
                	//Remove Parent
                	element.remove();
                });             
            });
        }
	};
}])