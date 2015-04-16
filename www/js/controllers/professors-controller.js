angular.module('profeSearchStarter')
.controller("professorController", ['$scope','$ionicLoading','$filter','$timeout', '$ionicModal','$ionicPlatform','Professor' ,
  function($scope, $ionicLoading, $filter, $timeout, $ionicModal,$ionicPlatform, Professor){
    $scope.professors = [];
    $scope.createProf = false;
    $scope.lastSearch = "";
    $scope.query = "";
    $scope.resultCopy = [];
    $scope.university = undefined;
    $scope.department = undefined;

    $scope.jsonProf = function(query){
      if(window.cordova && window.cordova.plugins.Keyboard)
      {
        window.cordova.plugins.Keyboard.close();
      }
      $ionicLoading.show({
        templateUrl: 'templates/base/loading.html'
      });
      $scope.filterFail = false;

      $("#modal-black-background, #cancel-search").unbind("click");
      $("#filter-result").css("color","white");
      $("#filter-result").css("visibility","hidden");
      $("#filter-row").slideUp(200);

      $("#search").blur();
          $("#cancel-search").fadeOut(200);
          $("#modal-black-background").fadeOut(200,function(){
            $("#burger-container").css("z-index","99999999");
            $("#search-target").css("display:none;");
            $("#search-target").css("z-index","0");
          });
          $("#search-target").find(".search-bar-size").removeClass("search-bar-size-less").addClass("search-bar-size-more");
          $("#modal-black-background, #cancel-search").unbind("click");
      if( query !== undefined && query !== "")
      {
        $(".scroll").css("-webkit-transform","translate3d(0px, 0px, 0px) scale(1)");
        Professor.all(query)
        .success(function(data){
          if (data.next){
            nextPage(data,query);
          }
          else
            processData(data)
        });
      }
      else{
        $(".search-bar-label").removeClass("search-bar-label-animation-less").addClass("search-bar-label-animation-more");
        $("#search").val("").blur();
        $scope.createProf = true;
        $scope.professors = [];
        $scope.resultCopy = [];
        $("#filter-result").css("visibility","hidden");
        $("#filter-row").slideUp(200);
      }
      
    };

    function nextPage(data,query){
      if(data.next){
        Professor.nextPage(query,data.next).success(function(dataPage2){
              for(result in dataPage2.results)
                data.results.push(dataPage2.results[result]);
              data.next = dataPage2.next;
              nextPage(data, query);
            });
      }else{
        return processData(data);
      }
    }

    function processData(data){
      $ionicLoading.hide();
      $scope.professors = data;
      $scope.resultCopy = data.results;
      angular.forEach($scope.resultCopy, function(value, key){
        var university = value.university_name;
        if (university.match("Universidad de Puerto Rico"))
          value.university_name =  university.replace('Universidad de Puerto Rico', "UPR");
        else if(university.match("Universidad Interamericana"))
          value.university_name =  university.replace('Universidad Interamericana', "Interamericana de");
      });
      $scope.university = undefined;
      $scope.department = undefined;

          if(data.count === 0)
          {
            $scope.professors = [];
            $scope.resultCopy = [];
            $scope.createProf = true;
            $("#filter-row").slideUp(200);

          }
          else{
            $scope.createProf = false;
            if (data.count > 1) 
              $("#filter-result").css("visibility","visible");
          }
        
    }

    // Professor.all()
    //     .success(function(data){
    //       $scope.professors = data;
    //       $scope.resultCopy = data.results;
    //       if(data.count === 0)
    //       {
    //         $scope.professors = [];
    //         $scope.resultCopy = [];
    //         $scope.createProf = true;
    //         $("#filter-row").slideUp(200);
    //       }
    //       else{
    //         $scope.createProf = false;
    //         if (data.count > 1) 
    //           $("#filter-result").css("visibility","visible");
    //       }
    //     })
    
    $scope.openModal = function(id) {
      if(window.cordova && window.cordova.plugins.Keyboard)
      {
        window.cordova.plugins.Keyboard.close();
      }
      $ionicLoading.show({
        templateUrl: 'templates/base/loading.html'
      });
  
      Professor.get(id)
      .success(function(data){
      $ionicModal.fromTemplateUrl('templates/professors/modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
        }).then(function(modal) {
          modal.id = 'info-modal';
          $scope.modal = modal;
          $scope.modal.show();
          
          $ionicLoading.hide();
          $scope.modal.profesor = data;
          AdMob.showBanner(AdMob.AD_POSITION.BOTTOM_CENTER);

          setTimeout(function() {
            if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
              $("#header-custom").css({"padding-top":"20px"});
              $("#title-modal").css({"padding-top":"12px"});
            }
          }, 200);

        });
      });
  };

  $scope.addComment = function(slug){
    window.open('https://notaso.com/professors/'+slug+"/", '_system', 'location=yes')
  };

  $scope.restartFilter = function(element){
    if($("#filter-result").css("color") !== "rgb(255, 255, 255)")
    {
      $scope.university=undefined;
      $scope.professors.results = $scope.resultCopy;
    }
  }

  $scope.closeModal = function() {
    $scope.modal.hide();
      $scope.modal.remove();
    // $scope.modal.remove();
  };

   $scope.$on('modal.hidden', function() {
          AdMob.hideBanner();
   });


   $scope.updateProfessorList = function(selected, filter){
    

      if (filter === "university_name") 
        $scope.university = selected;
      if (filter === "department_name") 
        $scope.department = selected;
      var jsonVariable = {};
    
      if ($scope.university) 
          jsonVariable["university_name"] = $scope.university;

      if ($scope.department)
          jsonVariable["department_name"] = $scope.department;

      if ($scope.university !== undefined || $scope.department !== undefined) 
      {
        $scope.professors.results = $filter('filter')($scope.resultCopy, jsonVariable);
      }
      else
        $scope.professors.results = $scope.resultCopy;

      if ($scope.professors.results.length === 0) {
            $scope.createProf = true;
            $scope.filterFail = true;
      }else{
          $scope.createProf = false;
          $scope.filterFail = false;
      };
   }


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