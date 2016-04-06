var mainApp = angular.module("mainApp", []);
// studentController defined as a JavaScript object with $scope as argument.
         
mainApp.controller('profileController', ['$scope', '$http', function($scope, $http) {
   angular.element(document).ready(function () {
      $http.get('/UserProfile')
      .then(function(response){
         var user = response.data;
         $scope.name = (user.firstname + " " + user.lastname).toUpperCase();
         $scope.description = user.description;
         $scope.age = user.age;
      });
   });
}]);
