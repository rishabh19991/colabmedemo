'use strict';

var ColabApp = angular.module('app');

ColabApp.directive('workflow', function() {

	return {
		link: function (scope, element, attrs) {

			var area = new Workflow('workflow');
			area.work();

		}
	};

});