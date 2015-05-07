angular.module('profeSearchStarter')
.controller("universityController", ['$scope','$ionicLoading','University',
  function($scope, $ionicLoading, University){
      $scope.universities = [];
      $scope.url = "https://com-notaso-static.s3.amazonaws.com/";

       $ionicLoading.show({
        templateUrl: 'templates/base/loading.html'
      });
        University.all()
        .success(function(data){
            nextPage(data);         
        });

    $scope.jsonProf = function(query){
      
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
        }).error(function(){
          $(".search-bar-label").removeClass("search-bar-label-animation-less").addClass("search-bar-label-animation-more");
          $("#search").val("").blur();
          $scope.createProf = true;
          $scope.professors = [];
          $scope.resultCopy = [];
          $("#filter-result").css("visibility","hidden");
          $("#filter-row").slideUp(200);
                $ionicLoading.hide();

          alert("No se puede encontrar el profesor si no hay señal o no esta conectado al internet.");

          
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

    $scope.closeKeyBoard = function(){
      
    }

    function nextPage(data){
      if(data.next){
        University.nextPage(data.next).success(function(dataPage2){
              for(result in dataPage2.results)
                data.results.push(dataPage2.results[result]);
              data.next = dataPage2.next;
              nextPage(data);
            });
      }else{
        return processData(data);
      }
    }

    function processData(data)
    {
      $scope.universities  = data;
      if(data.count === 0)
      {
        $scope.universities = [];
        $scope.createProf = true;
      }
      $ionicLoading.hide();
    }
  }])