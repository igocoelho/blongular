/**
 * REST Controller: Login
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
			app.post('/xhr/login', self.login);
		},

		/**
		 * Action: Login
		 */
		login: function (req,res)
		{
			if (req.user._logged)
				return res.end('true');

			var User = model.User();
			var UserLogin = req.body.fields;

			if (_.isString(UserLogin.email)&&_.isString(UserLogin.password))
			{
				User.setAttributes(UserLogin);
			
				User.$login(UserLogin.password)
				.then(function (logged) {
					var data = User.getAttributes();
					if (logged)
					{
						req.user.data={};
						_.extend(req.user.data,data);
						req.user.data.id=data._id;
						req.user.data.name=data.name||data.email;
						req.user._logged=true;
						res.end('true')
					}
					else
						res.end('false')
				}).catch(function (err) {
					res.end(err.message);
				});
			}
			else
				res.end('');
		}

	}

};