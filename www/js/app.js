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
          $scope.loading = false;

    $scope.profesors = [];

    $scope.jsonProf = function(query){
      $scope.loading = true;

      if(query !== "")
         $http.get("https://notaso.com/api/search/",{
                   params: {"q":query,"format":"json"}})
        .success(function(data){
          $scope.profesors = (data);
          $scope.loading = false;
        }).error(function()
        {
          $scope.loading = false;
        });
    };

  $ionicModal.fromTemplateUrl('../templates/profesor-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    modal.id = 'profesor-modal';
    $scope.modal = modal
  })  

  $scope.openModal = function(id) {
    $scope.modal.loading = true;
    $http.get("https://notaso.com/api/professors/"+id,{
              params: {"format":"json","comments":"true"}})
    .success(function(data){
      $scope.modal.profesor = data;
      $scope.modal.loading = false;
      console.log($scope.modal.loading)
    })
    $scope.modal.show()
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  $http.get("https://notaso.com/api/search/",{
                   params: {"q":"Huerta","format":"json"}})
        .success(function(data){
          $scope.profesors = (data);
          $scope.loading = false;
        }).error(function()
        {
          $scope.loading = false;
        });

  }]);
})();