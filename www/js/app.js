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
    console.log(window.cordova)
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
    $scope.createProf = false;

    $scope.jsonProf = function(query){
      if(window.cordova && window.cordova.plugins.Keyboard)
        window.cordova.plugins.Keyboard.close();
      $scope.createProf = false;
      $scope.loading = true;
      if(query !== "")
         $http.get("https://notaso.com/api/search/",{
                   params: {"q":query,"format":"json"}})
        .success(function(data){
          $scope.profesors = (data);
          $scope.loading = false;
          $scope.createProf = false;
          if(data.count === 0)
            $scope.createProf = true;
        }).error(function()
        {
          $scope.loading = false;
          $scope.createProf = false;
        });
      else
      {
        $scope.loading = false;
        $scope.createProf = false;
      }
    };

  $scope.openModal = function(id) {
    $ionicModal.fromTemplateUrl('templates/profesor-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
    }).then(function(modal) {
      modal.id = 'profesor-modal';
      $scope.modal = modal
      $http.get("https://notaso.com/api/professors/"+id,{
              params: {"format":"json","comments":"true"}})
    .success(function(data){
      $scope.modal.profesor = data;
      $scope.modal.loading = false;
      $scope.createProf = false;
    })
    $scope.modal.show()
    }) 
    
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
    $scope.modal.remove();
  };
  }]);
})();