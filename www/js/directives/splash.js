angular.module('starter').
directive('splashScreen', [function () {
	return {
		templateUrl: 'templates/splash/index.html',
		restrict: 'E',
	};
}])