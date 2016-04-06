var mainApp = angular.module("mainApp", []);
// studentController defined as a JavaScript object with $scope as argument.
         
mainApp.controller('profileController', ['$scope', '$http', function($scope, $http) {
   angular.element(document).ready(function () {
      $http.get('/UserProfile')
      .then(function(response){
         $scope.myWelcome = response.data;
      });