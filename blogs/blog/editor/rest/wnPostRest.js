/**
 * REST Controller: Post
 */

module.exports = {

	/**
	 * Class Extension
	 */
	extend: ['wnExpressController'],

	/**
	 * Methods
	 */
	methods: {

		/**
		 * Configure
		 */
		configure: function ()
		{
			app.post('/xhr/posts', self.create);
			app.get('/xhr/posts/:postId', self.read);
			app.put('/xhr/posts/:postId', self.update);
			app.del('/xhr/posts/:postId', self.delete);
			app.param('postId', self.model);
		},

		/**
		 * Model: POST
		 */
		model: function (req,res,next,id)
		{
			var post = model.Post()
			post.$load(id)
			.then(function () {
				req.post = post;
				next();
			});
		},

		/**
		 * Action: Create
		 */
		create: function (req,res)
		{
			var post = model.Post();

			if (!req.user.data._id)
				return res.end('false');

			post.setAttributes(req.body.fields);
			post.setAttribute('user',req.user.data._id);

			post.$save()
			.then(function () {
				res.end('true');
			})
			.catch(function () {
				res.end('false');
			});
		},

		/**
		 * Action: Update
		 */
		update: function(req, res) {
		    var post = req.post;

		    if (!req.user.data._id)
				return res.end('false');

		    post.setAttribute('user',req.user.data._id);

		    var updates = req.body.fields;
		    for (u in updates)
		    	if (updates[u]=='undefined')
			    	updates[u]=undefined;

		    post.$update(updates)
		    .then(function() {
		        res.end('true');
		    })
		    .catch(function () {
		    	res.end('false');
		    });
		},

		/**
		 * Action: Delete
		 */
		delete: function(req, res) {
		    var post = req.post;

   		    if (!req.user.data._id)
				return res.end('false');
			
		    post.setAttribute('user',req.user.data._id);

		   	post.$remove()
		   	.then(function() {
		        res.end('true');
		    })
		    .catch(function () {
		    	res.end('false');
		    });
		},

		/**
		 * Action: Read
		 */
		read: function (req,res)
		{
			res.end(JSON.stringify(req.post.getAttributes()));
		}

	}

};