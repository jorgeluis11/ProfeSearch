angular.module("profeSearchStarter").
directive('professorsList', [function () {
	return {	
		scope:false,
		templateUrl: 'templates/professors/list.html',
		restrict: 'E',
	};
}])
.directive('professorView',function(){
return{
	scope:false,
	templateUrl: 'templates/professors/view.html'
}
}).directive('hamburger', ['$ionicModal',function ($ionicModal) 
{
	return {
		restrict: 'E',
		scope:{},
		templateUrl:"templates/base/hamburger.html",
		link: function (scope, element, attrs) {
			var trigger = $(element).children();
              isClosed = false;
              if( /(android)/i.test(navigator.userAgent) ) { 
              	$(".burger-filling").addClass("burger-fill-android");// for android
	         }else
	         { // for ios
	         	$(".burger-filling").addClass("burger-fill-ios");
	         }
 		 trigger.click(function () {
            if (isClosed === true) {
            isClosed = false;              
              	trigger.removeClass('is-open');
                trigger.addClass('is-closed');	          
              scope.modal.hide();
      		  scope.modal.remove();
      		  $("body").removeClass("click-event");
      		  $("#modal-black-background").css("display","none");
            } else {
              trigger.removeClass('is-closed');
              trigger.addClass('is-open');
              isClosed = true;

                $ionicModal.fromTemplateUrl('templates/base/info.html', {
		        scope: scope,
		        animation: 'slide-in-down',
		        backdropClickToClose:false,
		        }).then(function(modal) {
		          scope.modal = modal;
		          scope.modal.show()
		          $(modal.$el[0]).addClass("modal-info");
		          $("#modal-black-background").css("display","block");
        	});
		    }
          });         
		}
	};
}])
.directive("close", [function(){
	return {
		restrict:"A",
		scope:false,
		link:function(scope, element, attrs){
			$(element).click(function(){
				scope.query = "";
			});

		}
	}
}]).directive('searchAnimationEvent', [function () {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			var target = $(element);
			target.click(function(){
				$("#modal-black-background").css("display","block");
				$("#burger-container").css("z-index","0");
				target.css("z-index","99999").find(".search-bar-size").removeClass("search-bar-size-more").addClass("search-bar-size-less");
				$("#cancel-search").fadeIn(400);
				$(".search-bar-label").removeClass("search-bar-label-animation-more").addClass("search-bar-label-animation-less");
				$("#modal-black-background, #cancel-search").click(function(){
					if(window.cordova && window.cordova.plugins.Keyboard)
				    {
				      window.cordova.plugins.Keyboard.close();
				    }
				    scope.query = "";
				    console.log(scope.query);
					target.css("display:none;")
					target.css("z-index","0").find(".search-bar-size").removeClass("search-bar-size-less").addClass("search-bar-size-more");
					$("#burger").css("z-index","99999999");
					$("#cancel-search").fadeOut(400);
					$("#modal-black-background").css("display","none");
					$(".search-bar-label").removeClass("search-bar-label-animation-less").addClass("search-bar-label-animation-more");
					$("#modal-black-background, #cancel-search").unbind("click");
				});
			})
		}
	};
}]);