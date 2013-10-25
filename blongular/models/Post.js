/**
 * Source of the Post Model
 */

// Exports
module.exports = {

	/**
	 * Class dependencies
	 */
	extend: ['wnActiveRecord'],

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
		 * Return the name of the db collection or table.
		 */
		collectionName: function ()
		{
			return 'Post';
		},

		/**
		 * Example of a schema.
		 */
		schema: function ()
		{
			return {
				slug: {
					type: String,
					label: 'Slug',
					unique: true,
					required: true
				},
				createDate: {
					type: Date,
					label: 'Created',
					required: true
				},
				publishDate: {
					type: Date,
					label: 'Published'
				},
				title: {
					type: String,
					label: 'Title'
				},
				content: {
					type: String,
					label: 'Content',
					required: true
				},
				user: {
					type: 'ObjectId',
					label: 'UserID',
					required: true
				},
				tags: {
					type: Array,
					label: 'Tags'
				}
			};
		},

		/**
		 * Util: Format posts attributes.
		 * @param object $post
		 */
		formatPost: function (post)
		{
			if (!_.isObject(post))
				return post;
			else
			{
				var post = _.extend({},post);
				post.preview = function (chunk) { return chunk.write(this.html) }.bind({ html: post.content.split('<p>{showMore}</p>')[0] });
				post.content = function (chunk) { return chunk.write(this.html) }.bind({ html: post.content.replace(/\<p\>\{showmore\}\<\/p\>/gim,'') });
				post.primaryTag = post.tags[0];
				self.formatDates(post);
				return post;
			}
		},

		/**
		 * Util: Format posts dates.
		 * @param object $post
		 */
		formatDates: function (post)
		{
			if (!_.isObject(post))
				return post;
			else
			{
				for (p in post)
					if (_.isDate(post[p]))
					{
						var moment = self.getDbConnection().getParent().moment(post[p]);
						post[p+'_full']=moment.format('DD MMM YYYY');
					}
			}
		},

		/**
		 * Promise: List N posts starting on N2.
		 * @param number $offset
		 * @param number $limit 
		 * @param number $order (1 for ASC, -1 for DESC)
		 * @param number $published only?
		 */
		$list: function (offset,limit,order,published)
		{
			limit = Number(limit) || 1;
			offset = Number(offset) || 0;
			order = Number(order) || -1;
			published = Boolean(published);

			var query = {
				sort: { _id: order },
				skip: offset,
				limit: limit
			};

			if (published)
				query.exists = ['publishDate',true];

			this.query(query).exec(function (err,posts) {
				if (err!==null)
					return done.reject(err);

				var fposts = [];
				for (p in posts)
					fposts.push(self.formatPost(posts[p]._doc));

				done.resolve(fposts)
			});

			return done.promise;
		},

		/**
		 * Promise: Find posts with those specs.
		 * @param object $spec
		 */
		$find: function (spec)
		{
			if (!_.isObject(spec))
				done.reject(new Error(''));
			else
				this.find(spec,function (e,err,posts) {
					if (err)
						return done.reject(err);

					done.resolve(posts);
				});

			return done.promise;
		},

		/**
		 * Promise: Load a post.
		 */
		$load: function (id)
		{
			if (_.isUndefined(id)||!_.isString(id))
				done.reject(new Error(''));
			else
			{
				this.$find({ _id: id })
				.then(function (posts) {
					if (posts[0])
						self.setAttributes(posts[0]);
					done.resolve()
				})
				.catch(function (err) {
					done.reject(err);
				});
			}

			return done.promise;
		},

		/**
		 * Promise: Update this post.
		 */
		$update: function (data)
		{
			var _id = self.getAttribute('_id');
			var user = self.getAttribute('user');
			if (_.isUndefined(_id)||!_.isObject(data)||_.isUndefined(user))
				done.reject(new Error(''));
			else
			{
				delete data.user;
				this.update({ _id: _id, user: user }, data, function (e,err) {
					if (err!==null)
						return done.reject(err);

					done.resolve(true);
				});
			}

			return done.promise;
		},

		/**
		 * Promise: Remove this post.
		 */
		$remove: function ()
		{
			var _id = self.getAttribute('_id');
			var user = self.getAttribute('user');
			if (_.isUndefined(_id)||_.isUndefined(user))
				done.reject(new Error(''));
			else
			{
				this.delete({ _id: _id, user: user },function (e,err,posts) {
					if (err!==null)
						return done.reject(err);

					done.resolve(true);
				});
			}

			return done.promise;
		},

		/**
		 * Promise: Save this post.
		 */
		$save: function ()
		{
			if (_.isUndefined(self.getAttribute('user')))
				done.reject(new Error(''));
			else
			{
				this.setAttributes({ createDate: new Date });
				this.save(function (e,err,post) {

					if (err!==null)
						return done.reject(err);

					self.setAttributes(post)

					done.resolve(true);

				});
			}

			return done.promise;
		}

	}

};