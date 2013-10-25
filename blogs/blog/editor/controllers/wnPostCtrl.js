/**
 * Angular Controller: Post
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
			moduleName: 'blongular.post',
			controllerName: 'CtrlPost'
		},
		_dependencies: ['$scope','Post','$http']
	},

	/**
	 * Methods
	 */
	methods: {

		/**
		 * Initializer
		 */
		init: function () {
			if (typeof blongularSession == 'string')
			{
				$scope.session=blongularSession;
				$scope.control();
			}
		},

		/**
		 * Start the post control
		 */
		$control: function ()
		{
			$scope.editor = new MediumEditor(".editable");
			$scope.normalMode();
		},

		/**
		 * Save initial edit data.
		 */
		$saveInitial: function ()
		{
			$scope._initialData = {};
			$('.editable').each(function () {
				$scope._initialData[$(this).attr('ng-model')]=$(this).html();
			});
		},

		/**
		 * Restore initial.
		 */ 
		$restoreInitial: function ()
		{
			$('.editable').each(function () {
				$(this).html($scope._initialData[$(this).attr('ng-model')]);
			});
		},

		/**
		 * Get changes
		 */
		$getChanges: function () {
			$scope.updated = {};
			$('.editable').each(function () {
				var attr = $(this).attr('ng-model');
				var newData = $(this).html();
				if (newData !== $scope._initialData[attr])
				{
					$scope.updated[attr] = newData;  
				}
			});
		},

		/**
		 * Edit mode
		 */
		$editMode: function () {
			$('.editable').addClass('editing');
			$('#post-actions').hide();
			$('#edit').show();
			$scope.editor.activate();

			$('#edit #saveBtn').click(function () {
				$scope.getChanges();
				$scope.update();
				$scope.normalMode();
			});

			$('#edit #cancelBtn').click(function () {
				$scope.restoreInitial();
				$scope.normalMode();
			})
		},

		/**
		 * Go back to normal mode.
		 */
		$normalMode: function ()
		{
			$('.editable').removeClass('editing');
			$('#post-actions #editBtn').unbind('click').click(function () {
				$scope.saveInitial();
				$scope.editMode();
			});
			$('#post-actions #publishBtn').unbind('click').click(function () {
				$scope.publish();
			});

			$('#post-actions #unpublishBtn').unbind('click').click(function () {
				$scope.unpublish();
			});

			$('#post-actions').show();
			$('#edit').hide();
			$scope.editor.deactivate();
		},

		/**
		 * Scope: Set id
		 */
		$setId: function(id) {
			$scope._id = id;
		},

		/**
		 * Publish post
		 */
		$publish: function ()
		{
			if (!$scope.updated)
				$scope.updated = {};
			$scope.updated.publishDate = new Date;
			$scope.update();
		},

		/**
		 * Publish post
		 */
		$unpublish: function ()
		{
			if (!$scope.updated)
				$scope.updated = {};
			$scope.updated.publishDate = 'undefined';
			$scope.update();
		},

		/**
		 * Scope: Update
		 */
		$update: function() {

			if ($scope.updated.title)
			{
				$scope.updated.title=$scope.title=$scope.updated.title.replace(/<[^>]+>/ig,"");
			}

			Post.update({ _id: $scope._id }, $scope.updated, function () {
				$scope.updated = {};
				window.location.reload();
		    });
		}

	}

};