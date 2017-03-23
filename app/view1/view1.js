'use strict';

angular.module('myApp.view1', ['ngRoute', 'elasticui'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/demo.html',
    controller: 'MyController1'
  });
}])

.controller('MyController1', function ($scope, userRepoService){
     
     var onFetchError = function(message){
       $scope.error = "Error Fetching Users. Message:" +message;
     };
      $scope.message="tst me";
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
    
}());