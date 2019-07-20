var app = angular.module('riverbook', []);
app.controller('riverinfoController', function($scope) {
	$scope.rbriverName;
	$scope.rbriverLocation;
	var msg;
	
	var getUserData = function(){
		$scope.rbusername = localStorage.getItem("rbusername");
	}();
	$scope.saveRiverInfo = function(){		
		alert("River Infomration Submitted Successfully");
	}
});