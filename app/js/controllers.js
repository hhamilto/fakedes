'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
	controller('MyCtrl1', ['$scope',function($scope) {
		$scope.generateRandom = function(){
			var gen = function(len){
				var text = "";
				for( var i=0; i < len; i++ )
					text += Math.floor(Math.random() * 2);
				return text;
			}
			$scope.L_0 = gen(6);
			$scope.R_0 = gen(6);
			$scope.K_1 = gen(8);
		}
		var blankifNull = function(a){
			return a==undefined?'':a
		}
		$scope.R_0_expanded='0';
		$scope.R_0_xord='';
		$scope.expander = '01323245';
		$scope.SB1_text =	"101 010 001 110 011 100 111 000\n"+
							"001 100 110 010 000 111 101 011";
		$scope.SB2_text =	"100 000 110 101 111 001 011 010\n"+
							"101 011 000 111 110 010 001 100";
		$scope.$watch('R_0', function(newval=''){
			$scope.R_0_expanded = $scope.expander.split('').reduce(function(p,c){
				return p+blankifNull(newval.split('')[Number(c)]);
			},'');
		});
		$scope.$watch('R_0_expanded + K_1', function(newval){
			console.log('gogog');
			$scope.R_0_xord = ('00000000'+(parseInt(newval,2) ^ parseInt($scope.K_1,2)).toString(2)).substring(-8);
		});
		$scope.$watch('R_0_xord', function(newval){
			var lookup = function(key,sbox){
				return sbox.match(/\d\d\d/g)[parseInt(key,2)];
			};
			$scope.SB1_out = lookup(newval.substring(0,4),$scope.SB1_text);
			$scope.SB2_out = lookup(newval.substring(5),$scope.SB2_text);
		});
		$scope.$watch('SB1_out', function(newval){
			alert('sbox output: '+newval+$scope.SB2_out);
			alert('l_0: '+$scope.L_0);
			$scope.R_1 = ('000000'+(parseInt(newval+$scope.SB2_out,2) ^ parseInt($scope.L_0,2)).toString(2)).substring(-6);
		});
	}])
	.controller('MyCtrl2', [function() {

	}]);