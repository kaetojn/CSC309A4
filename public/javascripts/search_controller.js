function SearchCtrl($scope, $http) {
    console.log("Testing from Controller.");

    $http.get('mentorlist').success(function(response) {
        console.log("Getting search results - mentorlist.");
        $scope.mentorlist = response;
    });

}