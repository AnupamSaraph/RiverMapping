var app = angular.module('riverbook', []);
app.controller('loginController', function($scope, $rootScope) {
	$scope.rbusername;
	$scope.rbpassword;
	var msg;
	
	$scope.userLogin = function(){
		localStorage.setItem("rbusername", $scope.rbusername);
		//window.location = "views/riverinfo.html";		
        $rootScope.showRiverForm = true;
	}
});
