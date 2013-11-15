/**
 * Angular Controller: Alert
 */

// Exports
module.exports = {

	/**
	 * Class Extension
	 */
	extend: ['wnAngularController'],

	/**
	 * PRIVATE
	 */
	private: {
		_config: {
			moduleName: 'blongular.system',
			controllerName: 'CtrlAlert'
		},
		_dependencies: ['$scope','Global']
	},

	/**
	 * Methods
	 */
	methods: {

		/**
		 * Initializer
		 */
		init: function () {
			$scope.global = Global;
			$scope.global.alert = $scope;

			$scope.alertElem = $('#blng-alert');
			$scope.keepAlive = 5000;
			$scope.animDelay = 500;
			$scope.validTypes = ['success','info','danger','warning'];
			
			$scope.hide(1);

			if (Global.user.justLogged)
				$scope.show('Welcome back, <b>'+Global.user.displayName+'</b>.','success');

			if (Global.user.failedLogin)
				$scope.show('Sorry, failed to log in.','danger');
		},

		/**
		 * Show the alerqt
		 * @param {string} msg - alert message
		 * @param {string} type - alert type [success,info,warning,danger]
		 */ 
		$show: function (msg,type,fn)
		{
			type = type || 'info';
			msg = msg || '';

			clearTimeout($scope.timeToHide);

			if ($scope.validTypes.indexOf(type)==-1)
				type = 'info';

			$scope.lastType = 'alert-'+type;
			$scope.alertElem.addClass($scope.lastType);
			$scope.alertElem.html(msg);

			function afterSlide () {
				$scope.timeToHide=setTimeout($scope.hide,$scope.keepAlive);
				$scope.alertElem.unbind('click').click($scope.hide);
				fn&&fn();
			}

			if ($scope.alertElem.is(':visible'))
			{
				afterSlide();
			} else
				$scope.alertElem.slideDown($scope.animDelay,function () {
					afterSlide();
				});
		},

		/**
		 * Hide the alert
		 */ 
		$hide: function (time,fn)
		{	
			clearTimeout($scope.timeToHide);
			$scope.alertElem.stop(1,1).slideUp(time || $scope.animDelay,function () {
				$scope.alertElem.removeClass($scope.lastType);
				fn&&fn();
			});
		}

	}

};