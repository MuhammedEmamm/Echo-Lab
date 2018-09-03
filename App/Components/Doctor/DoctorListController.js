﻿(function () {
    'use strict';

    angular.module('app').controller('DoctorListController', DoctorListController);

    DoctorListController.$inject = ['$scope', '$rootScope', '$state', '$http','BASE_URL', 'HTTP_HEADERS','$cookies'];

    function DoctorListController($scope, $rootScope, $state, $http,BASE_URL, HTTP_HEADERS,$cookies) {
		if($cookies.getObject('isloggedin')!== 'true'){
				$state.go('Login') ; 
			}

        $scope.role = $cookies.getObject('RoleName');
		$scope.totalDisplayed = 20;
		$scope.load = false ; 
        var getDoctorList = function () {

            $http({
                method: 'POST',
                url: BASE_URL + '/Doctor/GetDoctors',
                data: {
					"UserID": $cookies.getObject('UserID'),
                    "RoleID": $cookies.getObject('RoleID'),
                    "CompanyID": 17
                },
                 headers: {
                    "content-type": "Application/json",
                    "Token": $cookies.getObject('SecurityToken'),
                    "UserID": $cookies.getObject('UserID') ,
					'X-Frame-Options' : 'DENY'
                }
            }).then(function (res) {
                //(res.data);
                $scope.doctors = res.data.Response;
				$scope.load = true; 
				document.getElementById('loading').style.display = "none" ; 
            });

        }  ; 
			$scope.loadMore = function () {
			  $scope.totalDisplayed += 20;  
		};
		
        getDoctorList();
		
		$scope.GetNotification = function() {
			$http({
				method:"POST",
				url:BASE_URL + "/Visit/GetNotifications",
				      headers: {
                    "content-type": "Application/json",
                    "Token": $cookies.getObject('SecurityToken'),
                    "UserID": $cookies.getObject('UserID') ,
					'X-Frame-Options' : 'DENY'
                },
				data:{
					"CompanyID" : 17
				}
			}).then(function(response){
					//($scope.List) ; 
					
			
				$scope.List = response.data.Response ; 
				if($scope.List!=undefined&&$scope.List!=null)
				$scope.List = $scope.List.reverse() ;
			})
		} ;		
		$scope.GetNotification() ; 

    }
})();
