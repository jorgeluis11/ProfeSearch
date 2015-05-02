angular.module('profeSearchStarter').
directive('splashScreen', [function ($scope) {
	return {
		templateUrl: 'templates/base/splash.html',
		restrict: 'E',
		link: function(scope, element, attrs) {
            // var agentIndex = deviceAgent.indexOf('Android');
            // if (agentIndex != -1) {
            //    var androidversion = parseFloat(deviceAgent.match(/Android\s+([\d\.]+)/)[1]);
            //    if (androidversion < 4.4)
            //    {
            //     alert(androidversion);
            //        var targetElement = $('#' + attrs.fadeTarget);
            //         targetElement.hide().remove();  
            //     }
                
            // }
            //                 alert(androidversion);

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