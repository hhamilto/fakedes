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
		var calculateR_0_xord = function(R_0,K_1){
			console.log('gogog');
			$scope.R_0_xord = ('00000000'+(parseInt(R_0,2) ^ parseInt(K_1,2)).toString(2)).substring(-8);
		}
		$scope.$watch('R_0_expanded', function(newval){calculateR_0_xord(newval,$scope.K_1)});
		$scope.$watch('K_1', function(newval){calculateR_0_xord($scope.R_0_expanded, newval)});
		$scope.$watch('R_0_xord', function(newval){
			var lookup = function(key,sbox){
				return sbox.match(/\d\d\d/g)[parseInt(key,2)];
			};
			$scope.SB1_out = lookup(newval.substring(0,4),$scope.SB1_text);
			$scope.SB2_out = lookup(newval.substring(4),$scope.SB2_text);
		});
		var caculateR_1 = function(SB1out,SB2out,L_0){
			$scope.R_1 = ('000000'+(parseInt(SB1out+SB2out,2) ^ parseInt(L_0,2)).toString(2)).substring(-6);
		};
		$scope.$watch('SB1_out', function(newval){caculateR_1(newval,$scope.SB2_out,$scope.L_0)});
		$scope.$watch('SB2_out', function(newval){caculateR_1($scope.SB1_out,newval,$scope.L_0)});
		$scope.$watch('L_0', function(newval){caculateR_1($scope.SB1_out,$scope.SB2_out,newval)});
	}])
	.controller('MyCtrl2', [function() {

	}]);