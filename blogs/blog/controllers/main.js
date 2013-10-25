/**
 * Controller: Site
 *
 * @author Pedro Nasser
 */

// Exports
module.exports = {

	/**
	 * Class dependencies
	 */
	extend: ['wnController'],

	/**
	 * NPM Dependencies
	 */
	dependencies: ['mongoose'],

	/**
	 * PRIVATE
	 */
	private: {},

	/**
	 * Public Variables
	 */
	public: {},

	/**
	 * Methods
	 */
	methods: {

		/**
		 * Action: Index
		 */
		actionIndex: function (req,query,models) {
			this.title='Home';

			var Post = models.Post();
			Post.$list(0,5,-1,!req.user._logged)
			.then(function (posts) {
				self.render('list', { posts: posts });
			}).catch(function (err) {
				console.log(err);
				self.render('list', { error: err.message });
			})
		},

		/**
		 * Action: Post
		 */
		actionPost: function (req,query,models) {
			var Post = models.Post();
			var User = models.User();
			var id = self.postId = query.GET.id;

			if (_.isUndefined(id))
				req.e.error(404);
			else
				Post.$load(id)
				.then(function () {
					if (Post.getAttribute('id'))
					{
						User.$getUser({ _id: Post.getAttribute('user') }, { name: 1, username:1, email:1, bio:1, _id:1 })
						.then(function (user) {
							self.title = Post.getAttribute('title');
							var name = user.name || user.username || user.email || user._id;
							user.showName = name;
							Post.setAttribute('user', user);
							self.render('read', { posts: Post.formatPost(Post.getAttributes()) });
						});
					}
					else
						req.e.error(404);	
				}).catch(function (err) {
					console.error(err);
					req.e.error(404);
				});
		},

		/**
		 * Action: Login
		 */
		actionLogin: function (req,query,models) {

			var User = models.User();
			var UserPost = query.POST.fields;

			if (UserPost)
			{
				User.setAttributes(UserPost);

				User.$login(UserPost.password)
				.then(function (logged) {
					var data = User.getAttributes();
					if (logged)
					{
						req.user.data={};
						_.extend(req.user.data,data);
						req.user.data.id=data._id;
						req.user.data.name=data.name||data.email;
						req.user._logged=true;

						req.redirect(UserPost.redirect || '/',true);
					}
					else
						req.redirect(UserPost.redirect || '/',true);
				}).catch(function (err) {
					req.redirect(UserPost.redirect || '/',true);
				});
			}
			else
				req.redirect('/',true);

		},

		/**
		 * Action: New
		 */
		actionNew: function (req,query,models) {

			if (!req.user._logged)
				return req.redirect('/', true);

			var post = models.Post();
			var oid = mongoose.Types.ObjectId();

			post.setAttributes({
				_id: oid,
				title: 'New Post',
				content: '<p>New post content</p>',
				source: 'New post content',
				user: req.user.data._id,
				slug: oid.toString()
			})

			post.$save()
			.then(function () {
				req.redirect('/post/'+post.getAttribute('_id'), true);
			})
			.catch(function () {
				req.redirect('/', true)
			})
		},

		/**
		 * Action: Delete
		 */
		actionDelete: function (req,query,models) {

			if (!req.user._logged)
				return req.redirect('/', true);

			var post = models.Post();
			var _id = query.GET.id;

			if (!_.isString(_id))
				return req.redirect('/', true);

			post.setAttributes({ _id: _id, user: req.user.data._id })

			post.$remove()
			.then(function () {
				req.redirect('/', true);
			})
			.catch(function () {
				req.redirect('/post/'+_id, true)
			})
		},

		/**
		 * Action: Logout
		 */
		actionLogout: function (req,query,models) {
			req.user._logged=false;
			req.redirect('/',true);
		},

		/**
		 * Action: Error
		 */
		actionError: function () {
			if (this.request.code == 404)
			{
				this.title='Not found';
				this.render('notfound');
			}
			else
			{
				this.title='ERROR';
				this.render('error');
			}
		}

	}

};