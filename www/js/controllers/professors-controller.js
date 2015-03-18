angular.module('profeSearchStarter')
.controller("professorController", ['$scope','$ionicModal','$ionicScrollDelegate','Professor' ,
  function($scope, $ionicModal,$ionicScrollDelegate,Professor){
    $scope.loading = false;
    $scope.professors = [];
    $scope.createProf = false;

    $scope.jsonProf = function(query){
      if(window.cordova && window.cordova.plugins.Keyboard)
      {
        window.cordova.plugins.Keyboard.close();
      }
      
      if( query !== undefined && query !== "")
      {
        Professor.all(query)
        .success(function(data){
          $scope.professors = (data);
          if(data.count === 0)
          {
            $scope.professors = [];
            $scope.createProf = true;
          }
          else
            $scope.createProf = false;
        })
      }
      else{
        $scope.createProf = true;
        $scope.professors = [];
      }
    };
    
    $scope.openModal = function(id) {
      $scope.loading = true;
      Professor.get(id)
      .success(function(data){
      $ionicModal.fromTemplateUrl('templates/professors/modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
        }).then(function(modal) {
          modal.id = 'profesor-modal';
          $scope.modal = modal;
          $scope.modal.show()
          AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);
          if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
            $("#header-custom").css({"padding-top":"20px"});
            $(".modal-size").css({"margin-top":"12px"});
          }
          $scope.loading = false;
          $scope.modal.profesor = data;
        });
      });
  }

  $scope.addComment = function(slug){
    window.open('https://notaso.com/professors/'+slug+"/", '_system', 'location=yes')
  }

  $scope.closeModal = function() {
    AdMob.hideBanner();
    $scope.modal.hide();
    $scope.modal.remove();
  };

  // $scope.gotScrolled = function(){
  //   var currentTop = $ionicScrollDelegate.$getByHandle('scroller').getScrollPosition().top;
  //   var element = $("#search-row");
  //   if(currentTop > 40);
  //     if(!element.hasClass("search-fixed"))
  //     {
  //       element.addClass('search-fixed');
  //     }
  //   if(currentTop < 40)
  //       element.removeClass('search-fixed');
  // };
  }])