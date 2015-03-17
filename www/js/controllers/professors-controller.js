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
        $(window).scrollTop();
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
      $ionicModal.fromTemplateUrl('templates/professor-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
        }).then(function(modal) {
          modal.id = 'profesor-modal';
          $scope.modal = modal
          $scope.modal.profesor = data;
          $scope.loading = false;
          $scope.createProf = false;
          $scope.modal.show()
        });
      });
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
    $scope.modal.remove();
  };

  $scope.gotScrolled = function(){
    var currentTop = $ionicScrollDelegate.$getByHandle('scroller').getScrollPosition().top;
    var element = $("#search-row");
    if(currentTop > 40);
      if(!element.hasClass("search-fixed"))
      {
        element.addClass('search-fixed');
      }
    if(currentTop < 40)
        element.removeClass('search-fixed');
  };
  }])