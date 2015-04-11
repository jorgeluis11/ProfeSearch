angular.module("profeSearchStarter").
filter("uprFilter",function(){
	return function(items){
		console.log(items);
		return items;
	}
});