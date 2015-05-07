angular.module("profeSearchStarter")
.directive('about', ['$ionicModal', function ($ionicModal) {
	return {
		restrict: 'E',
		scope:false,
		template:"<h1 ng-click='openAbout()'>About</h1>",
		controller:['$scope','$state', function($scope, $state){
			$scope.openAbout = function(){
				$ionicModal.fromTemplateUrl('templates/base/info/about.html', {
		        scope: $scope,
		        animation: 'slide-in-up'
		        }).then(function(modal) {
		          $scope.modal = modal;
		          $scope.modal.show()
		          setTimeout(function() {
		          	$("#intro-logo").css("top","0%");
		          }, 20);
		        })
			}

			  $scope.closeModal = function() {
			    $scope.modal.hide();
			      $scope.modal.remove();
			    // $scope.modal.remove();
			}

			$scope.changeState = function(name)
			{
				 $scope.closeModal();
		       	$state.go(name);  
     		}
		}]
	};
}]).directive('likeModal', ['$ionicModal', function ($ionicModal) {
	return {
		restrict: 'E',
		scope:{},
		template:"<h1 ng-click='openLike()'>Like & Follow</h1>",
		controller:function($scope){
			$scope.openLike = function(){
				$ionicModal.fromTemplateUrl('templates/base/info/like.html', {
		        scope: $scope,
		        animation: 'slide-in-up'
		        }).then(function(modal) {
		          $scope.modal = modal;
		          $scope.modal.show()
		        })
			}

			  $scope.closeModal = function() {
			    $scope.modal.hide();
			      $scope.modal.remove();
			    // $scope.modal.remove();
			}
		}
	};
}]).directive('shareModal', ['$ionicModal', function ($ionicModal) {
	return {
		restrict: 'E',
		scope:{},
		template:"<h1 ng-click='openLike()'>Share</h1>",
		controller:['$scope', '$cordovaSocialSharing', function($scope, $cordovaSocialSharing){
			$scope.openLike = function(){
				$ionicModal.fromTemplateUrl('templates/base/info/share.html', {
		        scope: $scope,
		        animation: 'slide-in-up'
		        }).then(function(modal) {
		          $scope.modal = modal;
		          $scope.modal.show()
		        })
			}

			  $scope.closeModal = function() {
			    $scope.modal.hide();
			      $scope.modal.remove();
			    // $scope.modal.remove();
			}

			$scope.shareAnywhere = function() {
        	$cordovaSocialSharing.share("ProfeSearch Android y iPhone app que te ayuda a encontrar los mejores profesores de las universidades de Puerto Rico. Bajala aqui www.profesearch.com", "ProfeSearch iPhone y Android App", "www/img/share.png", "www.ProfeSearch.ninja");
		    }

		    $scope.shareViaFacebook = function() {
		        $cordovaSocialSharing.shareViaFacebook("ProfeSearch Android y iPhone app que te ayuda a encontrar los mejores profesores de las universidades de Puerto Rico.", ["www/img/share.png"], "www.ProfeSearch.ninja").then(function(result) {
		        }, function(error) {
		        });
		    }
		 
		    $scope.shareViaTwitter = function() {
		        $cordovaSocialSharing.shareViaTwitter("www.ProfeSearch.ninja App que te ayuda a encontrar los mejores profesores en Puerto Rico.", "www/img/share.png", "www.ProfeSearch.ninja")
		        .then(function(result) {
		        }, function(error) {
		        });
		    }

		    $scope.shareViaWhatsApp = function() {
		    	    $cordovaSocialSharing.shareViaWhatsApp("ProfeSearch ", "www/img/share.png", "www.ProfeSearch.ninja", null, function(errormsg){});
		    }

		    $scope.shareViaSMS = function() {
		    	if (/(ipod|iphone|ipad)/i.test(navigator.userAgent))
		    		$cordovaSocialSharing.shareViaSMS({'message':"ProfeSearch Android y iPhone app que te ayuda a encontrar los mejores profesores de las universidades de Puerto Rico. Bajala aqui www.ProfeSearch.ninja", 'subject':'ProfeSearch - iPhone y Android', 'image':'www/img/share.png'}, null, 
		    			function(msg) {}, 
		    			function(msg) {})
		    	else
			        $cordovaSocialSharing.shareViaSMS("ProfeSearch Android y iPhone app que te ayuda a encontrar los mejores profesores de las universidades de Puerto Rico.", null)
			        .then(function(result) {
			        }, function(error) {
			        });
		    }

		    $scope.shareViaEmail = function() {
		        $cordovaSocialSharing.shareViaEmail("ProfeSearch te ayuda a encontrar el mejor o peor profesor en las unviersidades de Puerto Rico. Bajalo aquí www.profesearch.ninja", "ProfeSearch - iPhone y Android www.ProfeSearch.ninja", null, null, null, ['www/img/share.png'])
		        .then(function(result) {
		        }, function(error) {
		        });
		    }
		}]
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
		link: function (scope, element, attrs) 
		{
			element.on('click',function()
			{
				if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) // for ios) {
	        		window.open('itms-apps://ax.itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?type=ProfeSearch&id=id985709320'); // or itms://
		    	else if (/(android)/i.test(navigator.userAgent)) 
			        window.open('market://details?id=com.ionicframework.notaso683473');
			});
		}
	};
}]);