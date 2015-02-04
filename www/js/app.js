(function(){
  // Ionic Starter App

  // angular.module is a global place for creating, registering and retrieving Angular modules
  // 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
  // the 2nd parameter is an array of 'requires'
  angular.module('starter', ['ionic', 'profesors'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  var app = angular.module("profesors",[])

  app.controller("profesorsCtrl", ["$http",'$scope','$ionicModal' ,function($http, $scope, $ionicModal){
    
    $scope.profesors = [];

    $scope.jsonProf = function(query){
      if(query !== "")
         $http.get("https://notaso.com/api/search/?",{
                   params: {"q":query,"format":"json"}})
        .success(function(data){
          $scope.profesors = (data);
        });
    };

    $scope.contact = {
    name: 'Mittens Cat',
    info: 'Tap anywhere on the card to open the modal'
  }

  $ionicModal.fromTemplateUrl('../templates/profesor-modal.html', {
    scope: $scope,
    animation: 'slide-in-left'
  }).then(function(modal) {
    modal.id = 'profesor-modal.html';
    $scope.modal = modal
  })  

  $scope.openModal = function(profesor) {
    $scope.modal.profesor = profesor;
    $scope.modal.show()
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  }]);
})();