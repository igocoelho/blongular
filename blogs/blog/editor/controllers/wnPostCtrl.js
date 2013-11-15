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
		_dependencies: ['$scope','Post','$http','Global']
	},

	/**
	 * Methods
	 */
	methods: {

		/**
		 * Initializer
		 */
		init: function () {
			if (Global.user && typeof Global.user.sid == 'string' && Global.user.logged)
			{
				$scope.session=Global.user.sid;
				$scope.control();
			}
		},

		/**
		 * Start the post control
		 */
		$control: function ()
		{
			$scope.editor = [];
			$scope.editor.push(new MediumEditor('.editable', { placeholder: '' }));
			if (parent.location.hash === "#edit")
			{
				$scope.saveInitial();
				$scope.editMode();
			}
			else
				$scope.normalMode();
		},

		/**
		 * Save initial edit data.
		 */
		$saveInitial: function ()
		{
			$scope._initialData = {};
			$('.post-body *[data-name]').each(function () {
				$scope._initialData[$(this).attr('data-name')]=$(this).html();
			});
		},

		/**
		 * Restore initial.
		 */ 
		$restoreInitial: function ()
		{
			$('.post-body *[data-name]').each(function () {
				$(this).html($scope._initialData[$(this).attr('data-name')]);
			});
		},

		/**
		 * Get changes
		 */
		$getChanges: function () {
			$scope.updated = {};
			$scope.changes = 0;
			$('.editable').each(function () {
				var attr = $(this).attr('data-name');

				if (attr=='title' || attr == 'subtitle' || attr == 'slug')
					$(this).html($(this).html().replace(/<[^>]+>/ig,""));

				if (attr == 'slug')
				{
					var uri = $(this).html();
					$(this).html($(this).html().replace(/[^a-zA-Z0-9\-]/g,"-"));
				}

				var newData = $(this).html();

				if (newData !== $scope._initialData[attr])
				{
					$scope.changes++;
					$scope.updated[attr] = newData;  
				}
			});
		},

		/**
		 * Edit mode
		 */
		$editMode: function () {
			$scope.startMediumImages();
			$('.medium-editor-placeholder').show();
			$('.editable').addClass('editing');
			$('#post-actions').hide();
			$('#edit').show();

			$('#edit #textBtn').unbind('click').click(function () {
				$scope.textMode();
			});

			$('#edit #htmlBtn').unbind('click').click(function () {
				$scope.htmlMode();
			});

			$scope.textMode();

			for (e in $scope.editor)
			{
				try { $scope.editor[e].activate(); } catch (e) {}
			}

			$('#edit #saveBtn').unbind('click').click(function () {
				if ($scope.contentImages)
					$scope.contentImages.destroy();
				$scope.textMode();
				$scope.getChanges();
				if ($scope.changes>0)
					$scope.update(function () {

						if ($scope.updated.slug)
							history.pushState({}, $scope._initialData.title, '/post/'+$scope.updated.slug);

						if ($scope.updated.title)
						{
							document.title = document.title.replace(RegExp($scope._initialData.title,'g'),$scope.updated.title);
						}

						Global.alert.show('<b>Successfully</b> updated this post.','success');
						$scope.normalMode();

					}, function () {
				    	Global.alert.show('Something went wrong on the update.','danger');
					});
				else
					$scope.normalMode();
			});

			$('#edit #cancelBtn').unbind('click').click(function () {
				$scope.restoreInitial();
				$scope.normalMode();
			})
		},

		/**
		 * Go back to normal mode.
		 */
		$normalMode: function ()
		{
			if ($scope.contentImages)
				$scope.contentImages.destroy();
			$('.medium-editor-placeholder').hide();
			$('.editable').removeClass('editing');
			$scope.saveInitial();

			$('#post-actions #editBtn').unbind('click').click(function () {
				$scope.editMode();
			});

			$('#post-actions > *').show();
			$('#post-actions').show();

			if ($scope._initialData.publishDate.indexOf('Not')===-1)
				$('#post-actions #publishBtn').hide(0);
			else
				$('#post-actions #unpublishBtn').hide(0);

			$('#post-actions #publishBtn').unbind('click').click(function () {
				$scope.publish();
			});

			$('#post-actions #unpublishBtn').unbind('click').click(function () {
				$scope.unpublish();
			});

			$('#edit').hide();

			for (e in $scope.editor)
			{
				try { $scope.editor[e].deactivate(); } catch (e) {}
			}
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
			$scope.update(function () {
				$('#post-actions #unpublishBtn').show(0);
				$('#post-actions #publishBtn').hide(0);
				$('.post-body *[data-name=publishDate]').html('Published ');
				Global.alert.show('Post <b>published</b>!','success');
			},function () {
				Global.alert.show('Could not publish this post.','danger');
			});
		},

		/**
		 * Publish post
		 */
		$unpublish: function ()
		{
			if (!$scope.updated)
				$scope.updated = {};
			$scope.updated.publishDate = 'undefined';
			$scope.update(function () {
				$('#post-actions #publishBtn').show(0);
				$('#post-actions #unpublishBtn').hide(0);
				$('.post-body *[data-name=publishDate]').html('Not published ');
				Global.alert.show('Post <b>unpublished</b>!','success');
			},function () {
				Global.alert.show('Could not unpublish this post.','danger');
			});
		},

		/**
		 * Change to TEXT mode
		 */
		$textMode: function ()
		{
			$('#edit #htmlBtn').show(0);
			$('#edit #textBtn').hide(0);

			var html = $('.post-body .post-content.post-html');
			if (html.length>0)
			{
				var post = $('.post-body .post-content');
				var code = html.val().replace(/\n/g,"");
				html.remove();
				post.html(code).show();
				$scope.startMediumImages();
			}
		},

		/**
		 * Change to HTML mode
		 */
		$htmlMode: function ()
		{
			if ($('.post-body .post-content.post-html').length==0)
			{
				$('#edit #textBtn').show(0);
				$('#edit #htmlBtn').hide(0);
				$scope.contentImages.destroy();
				var post = $('.post-body .post-content');
				var code = post.html().replace(/<\/p>/g,"</p>\n").replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
				var html = $('<textarea class="post-content post-html">'+code+'</textarea>');
				html.height(post.height()+100);
				post.after(html);
				post.hide();
			}
		},

		/**
		 * Get pure content from element
		 */
		$getPureContent: function (el) {
			el = $(el);
			var result = el.html();
			el.find('div.mediumImages-addImage').each(function () { var html = $(this)[0].outerHTML; result=result.replace(new RegExp(html),''); });
			return result;
		},

		/**
		 * Start Medium Images
		 */
		$startMediumImages: function () {
			$scope.contentImages = $('.post-content').mediumImages({
				uploadScript: '/main/upload'
			});
		},

		/**
		 * Scope: Update
		 */
		$update: function(success,fail) {
			Post.update({ _id: $scope._id }, $scope.updated, function (result) {		

				for (u in $scope.updated)
				{
					var el = $('.post-body *[data-name='+u+']');
					if (el.length>0)
					{
						el.html($scope.updated[u]);
					}
				}

				success&&success();

				for (u in $scope.updated)
					$scope._initialData[u]=$scope.updated[u];

				$scope.updated = {};
		    }, function () {
		    	fail&&fail();
		    });
		}

	}

};