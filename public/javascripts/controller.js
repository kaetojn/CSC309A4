var mainApp = angular.module("mainApp", []);
// studentController defined as a JavaScript object with $scope as argument.
         
         mainApp.controller('studentController', function($scope) {
// $scope refers to application which is to use the studentController object.
            $scope.student = {
// $scope.student is property of studentController object.
               firstName: "",
               lastName: "",
// firstName and lastName are two properties of $scope.student object. We've passed the default values to them.
               
               fullName: function() {
// fullName is the function of $scope.student object whose task is to return the combined name.
                  var studentObject;
                  studentObject = $scope.student;
                  return studentObject.firstName + " " + studentObject.lastName;
// In fullName function we're getting the student object and then return the combined name.
               }
            };
         });