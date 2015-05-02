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
            if (trigger.hasClass('is-open')) {
            	isClosed = false;              
              	trigger.removeClass('is-open');
                trigger.addClass('is-closed');	          
              scope.modal.hide();
      		  scope.modal.remove();
      		  $("body").removeClass("click-event");
      		  $("#modal-black-background2").fadeOut(200);
      		  $(".modal-backdrop").fadeOut(200);
            } else if(trigger.hasClass('is-closed')){
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
		          $("#modal-black-background2").show();
        	});
		    }
          });         
		}
	};
}])
// .directive("close", [function(){
// 	return {
// 		restrict:"A",
// 		link:function(scope, element, attrs){
// 			$(element).click(function(){
// 				console.log("SDf")
// 				scope.query = "";
// 			});

// 		}
// 	}}])
.directive('searchAnimationEvent', [function () {
	return {
		restrict: 'A',
		link: function (scope, element, attrs, ctrl) {
			var target = $("#search-target");
			target.click(function(){
				$("#search").focus();
				$("#modal-black-background").fadeIn(200);
				$("#burger-container").css("z-index","0");
				target.css("z-index","99999").find(".search-bar-size").removeClass("search-bar-size-more").addClass("search-bar-size-less");
				$("#cancel-search").fadeIn(200);
				$(".search-bar-label").removeClass("search-bar-label-animation-more").addClass("search-bar-label-animation-less");
				// target.unbind("click");
				$("#modal-black-background, #cancel-search").click(function(){
					if(window.cordova && window.cordova.plugins.Keyboard)
				    {
				      window.cordova.plugins.Keyboard.close();
				    }
				    // console.log(scope.query)
				    // ctrl.query = "";
				    $("#search").val("");
					$("#cancel-search").fadeOut(200);
					$("#modal-black-background").fadeOut(200,function(){
						$("#burger-container").css("z-index","99999999");
						target.css("display:none;");
						target.css("z-index","0");
					});
					target.find(".search-bar-size").removeClass("search-bar-size-less").addClass("search-bar-size-more");
					$(".search-bar-label").removeClass("search-bar-label-animation-less").addClass("search-bar-label-animation-more");
					$("#modal-black-background, #cancel-search").unbind("click");
					// target.bind("click");
					})		
})
}
}
}])
.directive('filter', [function () {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			var target = $(element).children();
			var filterTab = $("#"+attrs.show);
			$(element).click(function(){
				if (target.css("color") === "rgb(255, 255, 255)") {
					target.css("color","#aaaaaa");
					filterTab.slideDown(200);
				}else{
					target.css("color","white");
					       $("#university-filter").val("")
					       $("#department-filter").val("")

					filterTab.slideUp(200);
				}
			});
		}
	}

}]).directive("disable",function(){
	return{
		restrict:'A',
		link:function(scope,element,attrs){
			var initial = true;
			

			element.on("click",function(){
				$(attrs.target).css("pointer-events","none");
				$("select").css("pointer-events","none");
			})
			.on("blur",function(){
				if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) // for ios
					setTimeout(function() {
						$("select").css("pointer-events","initial");
					}, 400);
				else
					$("select").css("pointer-events","initial");

				$(attrs.target).css("pointer-events","initial");
		});
	}
}
}).directive('about', ['$ionicModal', function ($ionicModal) {
	return {
		restrict: 'E',
		scope:{},
		template:"<h1 ng-click='openAbout()'>About</h1>",
		controller:function($scope){
			$scope.openAbout = function(){
				$ionicModal.fromTemplateUrl('templates/base/about.html', {
		        scope: $scope,
		        animation: 'slide-in-up'
		        }).then(function(modal) {
		          $scope.modal = modal;
		          $scope.modal.show()
		          setTimeout(function() {
		          	$("#intro-logo").css("top","0%");
		          }, 100);
		        })
			}

			  $scope.closeModal = function() {
			    $scope.modal.hide();
			      $scope.modal.remove();
			    // $scope.modal.remove();
			}
		}
	};
}])
.directive('link', [function () {
	return {
		restrict: 'A',
		scope:{},
		link:function(scope,element,attrs){
			element.on('click',function(){
				    window.open(attrs.url, '_system', 'location=yes');    	
			});
		}	
	};
}]).directive('socialGroup', [function () {
	return {
		restrict: 'A',
		scope:{},
		link: function (scope, element, attrs) {
			element.on('click',function(){
			window.open(attrs.url, '_system', 'location=yes');    	
				if (attrs.url.match("twitter") || attrs.url.match("instagram") || attrs.url.match("pinterest") || attrs.url.match("gplus")) 
					window.open(attrs.alternative, '_system', 'location=yes');

			});
		}
	};
}]).directive('rateApp', [function () {
	return {
		restrict: 'A',
		scope:{},
		link: function (scope, element, attrs) {
		element.on('click',function()
		{
			if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) // for ios) {
        		window.open('itms-apps://ax.itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?type=ProfeSearch&id=id985709320'); // or itms://
	    	else if (/(android)/i.test(navigator.userAgent)) 
		        window.open('market://details?id=com.ionicframework.notaso683473');
		}
		});
	};
}]);