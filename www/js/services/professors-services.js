angular.module("profeSearchStarter")
.factory('Professor', ['$http', function ($http) {
	return {
		all:function(query){
			return $http.get("https://notaso.com/api/search/",{
                   params: {"q":query,"format":"json"}});
		},
		nextPage:function(query,url){
			return $http.get(url);
		},
		get:function(id){
			return $http.get("https://notaso.com/api/professors/"+id,{
              params: {"format":"json","comments":"true"}});
		}
	};
}])
.factory('University', ['$http', function ($http) {
	return {
		all:function(){
			return $http.get("https://notaso.com/api/universities/",{
                   params: {"format":"json"}});
		},
		nextPage:function(url){
			return $http.get(url);
		},
		get:function(id){
			return $http.get("https://notaso.com/api/universities/"+id,{
              params: {"format":"json","comments":"true"}});
		}
	};
}])
// .factory('Derpartment', ['$http', function ($http) {
// 	return {
// 	};
// }])