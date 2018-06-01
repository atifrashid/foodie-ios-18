/* eslint no-alert: 0 */

'use strict';

var app = angular.module('MobileAngularUiExamples', [
  'ngRoute',
  'mobile-angular-ui',
  'mobile-angular-ui.gestures'
]);


app.run(function($transform) {
  window.$transform = $transform;
});



app.controller('MainController', function($rootScope, $scope, $http, $window) {

  $scope.chatUsers = [
    {name: 'Thomas Bangalter',message:'Testing Message',time:'12.30pm',unread:'5',
      chat: [
        {name:"Thomas Bangalter", msg:'Hi how are you', time:'12.30pm'},
        {name:"Me", msg:'I m fine', time:'12.31pm'},
       ]
     },
    {name: 'Louis CK',message:'Testing',time:'1.20am'},
    {name: 'Bo Jackson',message:'Testing Message',time:'12.20am',unread:'8'},
    {name: 'Michael Jordan',time:'1.20am'},
    {name: 'Drake',message:'Testing Message',time:'12.30pm',unread:'5'}
  ];

	
	
	
	
	
	$scope.UserChat=[];
	
	$scope.chatPan = false;

	$scope.showChat = function(x) {
		console.log($scope.chatUsers[x].chat);
		$scope.UserChat = $scope.chatUsers[x].chat;
		$scope.chatPan = true;
	}
  
	$scope.sendMsg = function(){
		
		if( localStorage.getItem('chefStatus') == '2' ){
			var jsonData = JSON.parse(localStorage.getItem('chefData'));	
			var mee = jsonData.company;
		}else{
			var jsonData = JSON.parse(localStorage.getItem('userData'));	
			var mee = jsonData.first_name;	
		}
			
		
		var formData = {
			userId: localStorage.getItem('userId'),
			userToken: localStorage.getItem('userToken'),
			msg: $scope.msgTxt,
			to: localStorage.getItem('userId'),
			me: mee
		};

		
		var config = { headers : { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;' }};
		
		
		$http({
			dataType: 'json', 
  			method: 'POST',
			url : $window.ServerAjax+'?h=sendChatMsg',
			data : formData,
			headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
		}).then(function mySucces(response) {
			//$scope.myWelcome = response.data;
		}, function myError(response) {
			//$scope.myWelcome = response.statusText;
		});
	}
	
	

	
	$scope.parId = $window.getUrlParameter('c');
	if( $scope.parId ){
		var chef_data = null;
		var jsonData = JSON.parse(localStorage.getItem('nearbyChefs'));
		for (var i = 0; i < jsonData.length; i++) {
			if( jsonData[i].id == $scope.parId ){
				chef_data = jsonData[i];
				break;
			}
		}
		var scIndex = -1;
		for (var i = 0; i < $scope.chatUsers.length; i++) {
			if( $scope.chatUsers[i].id == $scope.parId ){
				scIndex = i; break;
			}
		}
		
		if( scIndex == -1 ){
			var xx = { 'id':$scope.parId, 'name': chef_data['company'], 'image': chef_data['image1'] }; 
			$scope.chatUsers.unshift(xx);
			$scope.UserChat = $scope.chatUsers[0].chat;
			$scope.chatPan = true;
		}else{
			$scope.UserChat = $scope.chatUsers[scIndex].chat;
			$scope.chatPan = true;
		}
	}
	
	
});










