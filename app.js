
var app = angular.module('riverbook', []);
app.run(function($rootScope) {
    $rootScope.showLoginForm = true;
    $rootScope.showRiverForm = false;
});

app.controller('LoginController', function($scope, $rootScope) {
	$scope.rbusername;
	$scope.rbpassword;
	var msg;
	
	$scope.userLogin = function(){        
		localStorage.setItem("rbusername", $scope.rbusername);
		//window.location = "views/riverinfo.html";	
        $rootScope.showLoginForm = false;
        $rootScope.showRiverForm = true;
	}
});

app.controller('RiverinfoController', function($scope, $sce, $http) {
	$scope.rbriverName;
	$scope.rbriverLocation;
	var msg;
	
	var getUserData = function(){
		$scope.rbusername = localStorage.getItem("rbusername");
	}();
    $scope.allRivers = {
            "rivers":[
                {
                    "name": "Bheema",
                    "state":"Maharashtra",
                    "city":"Pune",
                    "issues":"['Encroachment','Encroachment']",
                    "severity":"low"
                },
                {
                    "name": "Indrayani",
                    "state":"Maharashtra",
                    "city":"Pune",
                    "issues":"['Pollution','Encroachment']"
                }
            ]
        }
	$scope.saveRiverInfo = function(){
        var newRiverData = {};
        newRiverData.name = $scope.rbriverName;
        newRiverData.state = $scope.rbriverLocation;
        newRiverData.issues = [];
        if($scope.exploitation){
           newRiverData.issues.push("Exploitation");
        }
        if($scope.encroachment){
           newRiverData.issues.push("Encroachment");
        }
        if($scope.pollution){
           newRiverData.issues.push("Pollution");
        }
        newRiverData.severity = $scope.severity;
        $scope.allRivers.rivers.push(newRiverData);
        console.log("$scope.newRiverData.." + JSON.stringify(newRiverData));
	}
    
    $scope.getLocation = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition($scope.showPosition);
        } else { 
            $scope.rbriverLocationAuto = "Geolocation is not supported by this browser.";
        }
        
        
        
        
    }

    $scope.showPosition = function(position) {
            $scope.rbriverLocationAuto = "Latitude: " + position.coords.latitude + 
            "<br>Longitude: " + position.coords.longitude; 
            var latlon = position.coords.latitude + "," + position.coords.longitude;

            var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=14&size=400x300&sensor=false&key=YOUR_:KEY";
            $scope.rbusermap = "<img src='"+img_url+"'>";        
            $scope.rbusermap1 = "<img src='"+img_url+"'>";
            $scope.rbusermap = $sce.trustAsHtml($scope.rbusermap1);
    }
    
    $scope.getAllRivers = function(){
        /*$http.get('data/river.json').then(function(response){
            $scope.riverData = response.data;
        });*/
        
        $scope.allRivers = {
            "rivers":[
                {
                    "name": "Bheema",
                    "state":"Maharashtra",
                    "district":"Pune",
                    "issue":"Encroachment"
                },
                {
                    "name": "Indrayani",
                    "state":"Maharashtra",
                    "district":"Pune",
                    "issue":"Exploitation"
                }
            ]
        }
    }
    
    
    
});

