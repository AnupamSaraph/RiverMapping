var app = angular.module('riverbook', []);
app.controller('loginController', function($scope) {
	$scope.rbusername;
	$scope.rbpassword;
	var msg;
	
	$scope.userLogin = function(){
		localStorage.setItem("rbusername", $scope.rbusername);
		window.location = "../views/riverinfo.html";		
	}
});