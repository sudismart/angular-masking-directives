define(function(){

	angular.module('app',[])
		.directive('phoneNumber',function() {

			function clearValue (value) {
				if(!value) {
					return value;
				}

				return value.replace(/[^0-9]/g, '');
			}

			function applyPhoneMask (value) {
				if(!value) {
					return value;
				}

				var first = value.substring(0,3);
				var mid = value.substring(3, 6);
				var last = value.substring(6);

				var formatedValue = "("+first+")";
				if(value.length > 3)
					formatedValue += " "+mid+"-"+last;

				return formatedValue.trim().replace(/[^0-9]$/, '');
			}

			function validatePhoneNumber(ctrl, value){
				var valid = ctrl.$isEmpty(value) || value.length === 10;
				ctrl.$setValidity('phone-number', valid);
				return value;
			}

			return {
				restrict: 'A',
				require: '?ngModel',
				link: function(scope, element, attrs, ctrl) {
					if (!ctrl) {
						return;
					}

					ctrl.$formatters.push(function(value) {
						return applyPhoneMask(validatePhoneNumber(ctrl, value));
					});

					ctrl.$parsers.push(function(value) {
						if (!value) { return value; }

						var cleanValue = clearValue(value);
						var formatedValue = applyPhoneMask(cleanValue);

						if (ctrl.$viewValue !== formatedValue) {
							ctrl.$setViewValue(formatedValue);
							ctrl.$render();
						}

						return clearValue(formatedValue);
					});

					ctrl.$parsers.push(function(value) {
						return validatePhoneNumber(ctrl, value);
					});
				}
			};
		})
		.directive('currency',function() {

			function clearValue (value) {
				if(!value) {
					return value;
				}

				return value.replace(/[^0-9]/g, '');
			}

			function applyCurrencyMask (value) {
				if(!value) {
					return value;
				}

				var formatedValue = "$"+value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

				return formatedValue.trim().replace(/[^0-9]$/, '');
			}

			function validateCurrency(ctrl, value){
				var valid = ctrl.$isEmpty(value);
				ctrl.$setValidity('currency', valid);
				return value;
			}

			return {
				restrict: 'A',
				require: '?ngModel',
				link: function(scope, element, attrs, ctrl) {
					if (!ctrl) {
						return;
					}

					ctrl.$formatters.push(function(value) {
						return applyCurrencyMask(validateCurrency(ctrl, value));
					});

					ctrl.$parsers.push(function(value) {
						if (!value) { return value; }

						var cleanValue = clearValue(value);
						var formatedValue = applyCurrencyMask(cleanValue);

						if (ctrl.$viewValue !== formatedValue) {
							ctrl.$setViewValue(formatedValue);
							ctrl.$render();
						}

						return clearValue(formatedValue);
					});

					ctrl.$parsers.push(function(value) {
						return validateCurrency(ctrl, value);
					});
				}
			};
		})
		.controller('DirectiveController', [function(){
			this.phoneNumber = "5417543010";
			this.currency = "1234";
		}]);


});