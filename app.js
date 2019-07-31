
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
	"rivers": [{
			"name": "Mula Mutha",
			"points": [{
					"pointName": "Mhatre bridge",
					"pointCity": "Pune",
					"pointState": "Maharashtra",
					"pointRecords": [{
							"encroachment": "1",
							"encroachmentLevel": "low",
							"exploitation": "2",
							"exploitationLevel": "medium",
							"pollution": "3",
							"pollutionLevel": "high",
							"reportedBy": "Some User1",
							"reportedDateTime": "31/07/2019 10:22:00",
							"Description": "Highly polluted due to industrial waste",
							"recordStatus": "red"
						},
						{
							"encroachment": "1",
							"encroachmentLevel": "low",
							"exploitation": "2",
							"exploitationLevel": "medium",
							"pollution": "3",
							"pollutionLevel": "high",
							"reportedBy": "Some User2",
							"reportedDateTime": "31/07/2019 11:22:00",
							"Description": "Encroached by local people",
							"recordStatus": "red"
						}
					],
					"pointStatus": "red"
				},
				{
					"pointName": "Lakdi pool",
					"pointCity": "Pune",
					"pointState": "Maharashtra",
					"pointRecords": [{
							"encroachment": "1",
							"encroachmentLevel": "low",
							"exploitation": "2",
							"exploitationLevel": "medium",
							"pollution": "1",
							"pollutionLevel": "low",
							"reportedBy": "Some User3",
							"reportedDateTime": "31/07/2019 12:22:00",
							"Description": "Exploited by people by motor pumps",
							"recordStatus": "orange"
						},
						{
							"encroachment": "1",
							"encroachmentLevel": "low",
							"exploitation": "1",
							"exploitationLevel": "low",
							"pollution": "1",
							"pollutionLevel": "low",
							"reportedBy": "Some User4",
							"reportedDateTime": "31/07/2019 14:22:00",
							"Description": "Highly polluted",
							"recordStatus": "green"
						}
					],
					"pointStatus": "orange"
				}
			],
			"overallStatus": "red"
		}
	]
}
	$scope.saveRiverInfo = function(){
        var newRiverData = {};
        newRiverData.name = $scope.rbriverName;
        newRiverData.state = $scope.rbriverLocation;
        newRiverData.issues = [];
        
        var rbseverityLevel;
        /* start issue type and severity */
        if($scope.exploitation){
            rbseverityLevel = $scope.ExSeverity == 1 ? 'low' : $scope.ExSeverity == 2 ? 'medium' : 'high';            
            newRiverData.exploitation = $scope.ExSeverity;
            newRiverData.exploitationLevel = rbseverityLevel;
        }
        if($scope.encroachment){
            rbseverityLevel = $scope.EnSeverity == 1 ? 'low' : $scope.EnSeverity == 2 ? 'medium' : 'high';
            newRiverData.encroachment = $scope.EnSeverity;
            newRiverData.encroachmentLevel = rbseverityLevel;
        }
        if($scope.pollution){
            rbseverityLevel = $scope.PlSeverity == 1 ? 'low' : $scope.PlSeverity == 2 ? 'medium' : 'high';            
            newRiverData.pollution = $scope.PlSeverity;
            newRiverData.pollutionLevel = rbseverityLevel;
        }
        /* end issue type and severity */
        
        /* start status */
        if($scope.ExSeverity == 3 || $scope.EnSeverity == 3 || $scope.PlSeverity == 3){
            newRiverData.status = "red";
        }else if($scope.ExSeverity == 2 || $scope.EnSeverity == 2 || $scope.PlSeverity == 2){
                 newRiverData.status = "orange";
              }else if($scope.ExSeverity == 1 || $scope.EnSeverity == 1 || $scope.PlSeverity == 1){
                 newRiverData.status = "green";
              }
        /* end status */
        
        
        
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

