var app = angular.module('employees', []);
app.controller('mainCtrl', function($scope, $filter, $http) {
    'use strict';
    
    $scope.skills = [];
    $scope.ActiveSkills = [];
	$scope.FilteredData = [];
    
    $http.get("https://sys4.open-web.nl/employees.json").then(function(res,status,xhr) {
        $scope.data = res.data.employees;
        
        angular.forEach($scope.data, function(item){
            angular.forEach(item.skills, function(skill) {
              if ($scope.skills.indexOf(skill) == -1) {
                $scope.skills.push(skill);
              }
            });
        });
        $scope.ApplySkills();
    });
    
    $scope.SelectSkill = function (IsChecked, index) {
  	  if(IsChecked){	  	  
  		  $scope.ActiveSkills.push($scope.skills[index]);		
  	  }
  	  else{
  		  var indexz = $scope.ActiveSkills.indexOf($scope.skills[index]);
  		  $scope.ActiveSkills.splice(indexz, 1);
  	  }
  	  $scope.ApplySkills();
    };    
 
    $scope.ApplySkills = function() {
		  $scope.FilteredData = $scope.data;
		  for (var i = 0; i < $scope.ActiveSkills.length; i++) {
			  $scope.FilteredData = $filter('filter')($scope.FilteredData, $scope.ActiveSkills[i], true);
		  }
    };
    
});