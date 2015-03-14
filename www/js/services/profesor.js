angular.module("starter")
.factory('Professor', ['$http', function ($http) {
	return {
		all:function(query){
			return $http.get("https://notaso.com/api/search/",{
                   params: {"q":query,"format":"json"}})
		},
		one:function(id){
			return $http.get("https://notaso.com/api/professors/"+id,{
              params: {"format":"json","comments":"true"}})
		}
	};
}])