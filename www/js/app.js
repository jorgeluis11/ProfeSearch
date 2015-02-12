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
    $scope.createProf = false;

    $scope.jsonProf = function(query){
      if(window.cordova && window.cordova.plugins.Keyboard)
        window.cordova.plugins.Keyboard.close();
      if( query !== undefined && query !== "")
         $http.get("https://notaso.com/api/search/",{
                   params: {"q":query,"format":"json"}})
        .success(function(data){
          $scope.profesors = (data);
          if(data.count === 0)
          {
            $scope.profesors = [];
            $scope.createProf = true;
          }
          else
            $scope.createProf = false;

        })
      else{
        $scope.createProf = true;
        $scope.profesors = [];
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


app.controller('itemsController', function($scope) {
    $scope.items = [{ name: 'Foo' }, { name: 'Bar'}, { name: 'Baz'}];    
});

app.directive('fade', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var fadeDuration = attrs.fadeDuration || 1000;
            var onEvent = attrs.fade || click;

            // See how the directive alone controls the events, not the scope
            element.on(onEvent, function() {
                var targetElement = $('#' + attrs.fadeTarget);
                targetElement.fadeOut(700);             
            });
        }
    };
});

})();