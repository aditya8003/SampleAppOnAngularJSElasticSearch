'use strict';
 
// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
  ,'elasticui'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]).controller('MyController', function ($scope, userRepoService){
     
     var onFetchError = function(message){
       $scope.error = "Error Fetching Users. Message:" +message;
     };
     
     var onFetchCompleted = function(data){
        $scope.Sellers =data;
		$scope.Sources = [{
                Id: 1,
                Name: 'Inventory Received'
            }, {
                Id: 2,
                Name: 'Inventory In Tool'
            }, {
                Id: 3,
                Name: 'Inventory Sent'
            }];
     };
     
     var getUsers = function(){
       userRepoService.get().then(onFetchCompleted,onFetchError);
     };
     
     getUsers();     
     
   })
            .constant('euiHost', 'http://localhost:9200'); // ACTION: change to cluster address
			
				(function(){
    
    var userRepoService = function($http){
      
      var getUsers = function(username){
			return $http.get("http://localhost:8080/GetSellers/crunchify/getSellers")
						   .then(function(response){
                           return response.data; 
                        });
      };
  
      return {
          get: getUsers
      };
        
    };
    
    var module = angular.module("myApp");
    module.factory("userRepoService", userRepoService);
    
}()) ;







