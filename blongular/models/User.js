/**
 * Source of the User model.
 */

// Exports
module.exports = {

	/**
	 * Class dependencies
	 */
	extend: ['wnActiveRecord'],

	/**
	 * NPM Dependencies
	 */
	dependencies: ['bcrypt'],

	/**
	 * PRIVATE
	 */
	private: {},

	/**
	 * Public Variables
	 */
	public: {
		errors: {
			PROCESS_ERROR: 'Erro durante o processamento.',
			MISSING_INFO: 'Todos os campos devem estar preenchidos',
			USER_NOTFOUND: 'Não foi possível encontrar esta conta em nosso sistema',
			USER_EXIST: 'O email submetido já existe em nosso sistema.',
			EMAIL_INVALID: 'O email submetido é inválido.',
			PASSWORD_INVALID: 'A senha escolhida não é válida.',
			LOGIN_INVALID: 'Não foi possível acessar o sistema com essas informações.',
			EMAIL_INCORRECT: 'O email digitado deve ser o mesmo que sua confirmação'
		}
	},

	/**
	 * Methods
	 */
	methods: {

		/**
		 * Returns the name of the associated database collection.
		 * @return string the collection name
		 */
		collectionName: function ()
		{
			return 'User';
		},

		/**
		 * User's Schema
		 */
		schema: function ()
		{
			return {
				email: {
					type: String,
					label: 'Email',
					required: true,
					unique: true
				},
				name: {
					type: String,
					label: 'Name'
				},
				username: {
					type: String,
					label: 'Username',
					require: true,
					unique: true
				},
				password: {
					type: String,
					label: 'Password',
					required: true
				},
				createDate: {
					type: Date,
					label: 'Created',
					required: true
				},
				updateDate: {
					type: Date,
					label: 'Updated'
				},
				avatar: {
					type: String,
					label: 'Avatar'
				},
				bio: {
					type: String,
					label: 'Bio'
				},
				website: {
					type: String,
					label: 'Website'
				},
				location: {
					type: String,
					label: 'Location'
				}
			};
		},

		/**
		 * Validate 
		 */
		$validate: function (action)
		{
			switch (action)
			{
				case 'login':

					if (!this.getAttribute('email') || !this.getAttribute('password'))
						done.reject(new Error('MISSING_INFO'));
					else
						done.resolve(true);

				break;

				case 'cadastro':

					if (!this.getAttribute('email') || !this.getAttribute('password') || !this.getAttribute('name'))
						done.reject(new Error('MISSING_INFO'));
					else
						done.resolve(true);

				break;

				default:
					done.resolve(true);
				break;
			}

			return done.promise;
		},

		/**
		 * Promise: Encrypt password
		 */
		$encryptPassword: function (pass) {
			if (!_.isString(pass))
				done.resolve(pass);
			else 
				bcrypt.genSalt(10, function(err, salt) {
					if (err)
						done.resolve(pass);
				    else {
						bcrypt.hash(pass, salt, function(err, hash) {
							if (err)
								done.resolve(pass);
						    else
								done.resolve(hash);
						});
				    }
				});
			return done.promise;
		},

		/**
		 * Promise: Compare password against bcrypted password.
		 */
		$comparePassword: function (pass) {
			if (!_.isString(pass)||!_.isString(self.getAttribute('password')))
				done.reject(new Error('PROCESS_ERROR'));
			else 
				bcrypt.compare(pass, self.getAttribute('password'), function(err, res) {
					if (err)
						done.reject(new Error('PROCESS_ERROR'));
				    else
				    	done.resolve(res);
				});
			return done.promise;
		},

		/**
		 * Promise: Get user from DB, check if password matches
		 */
		$login: function (password) {
			var findUser = {};
			var password = password || '';
			findUser.email = self.getAttribute('email')+'' || '';
			var UserResult=null;

			// STEP 1: GET USER
			self.$getUser(findUser)
			// STEP 2: COMPARE PASSWORD
			.then(function (user) {
				self.setAttributes(user);
				return self.$comparePassword(password)
			})
			// STEP 3: Resolve Promise
			.then(function (correct) {
				done.resolve(true);
			})
			// STEP FAIL: Reject promise
			.catch(function (err) {
				done.reject(err);
			})

			return done.promise;
		},

		/**
		 * Promise: Return the User from DB.
		 */
		$getUser: function (user,select)
		{
			if (!_.isObject(user))
				done.reject(new Error('PROCESS_ERROR'))
			else
				var query = self.query(user).limit(1).select(select).exec(function (err,d) {
					if (err)
						done.reject(new Error('PROCESS_ERROR'));
					else if (d==null)
						done.resolve(null);
					else
						done.resolve(d[0]);
				});

			return done.promise;
		},

		/**
		 * Promise: Check if any user exist with the given attributes
		 */
		$existUser: function (attr)
		{
			done.promise.attr = attr || {};
			if (!_.isObject(attr))
				done.reject(new Error('PROCESS_ERROR'))
			else
			{
				self.getCollection().findOne(attr, function (err,d) {
					if (err)
						done.reject(err);
					else
					{
						if (d==null)
							done.resolve(true);
						else
							done.reject(new Error('USER_EXIST'));
					}
				});
			}
			return done.promise;
		},

		/**
		 * Promise: All the user creation process.
		 */
		$create: function ()
		{
			var password = self.getAttribute('password');
			var email = self.getAttribute('email');

			// STEP 1 - Check if email exist.
			var task = self.$existUser({ email: email })

			// STEP 2 - Encrypt password
			.then(function (exist) {
				return self.$encryptPassword(password);
			})

			// STEP 3 - Insert user
			.then(function (password) {
				self.setAttribute('password',password);
				self.encryptedPassword=true;
				self.newObject=true;
				return self.$save();
			})

			// STEP 4 - Send result
			.then(function (model) {
				self.setAttributes(model);
				done.resolve(model);
			})

			// Exception
			.catch(function (err) {
				done.reject(err);
			});

			return done.promise;
		},

		/**
		 * Promise: Update user
		 */
		$update: function (newProps) {
			if (!_.isObject(newProps) || !self.getAttribute('_id'))
				done.reject(new Error('PROCESS_ERROR'))
			else {

				self.newObject=false;

				function save (password) {

					if (password)
						newProps.password = password;

					var _id = self.getAttribute('_id');

					self.clearAttributes();
					self.setAttribute('_id',_id);
					self.setAttributes(newProps);

					self.$save()
					.then(function (doc) {
						done.resolve(doc);
					})
					.catch(function (err) {
						done.reject(err);
					});

				}

				self.$encryptPassword(newProps.password).then(save).catch(save);

			}

			return done.promise;
		},

		/**
		 * Promise: Save/create new user;
		 */
		$save: function ()
		{
			var data = self.getAttributes();
			var model = self.getCollection();

			if (self.newObject==true)
			{
				model.create(data, function (err,d) {
					if (err)
						done.reject(err);
					else
					{
						if (d!==null)
							done.resolve(d);
						else
							done.reject(new Error('PROCESS_ERROR'));
					}
				});
			} else
			{
				var id = data._id;
				delete data._id;
				model.findByIdAndUpdate(id, { $set: data }, function (err,doc) {
					if (err)
						done.reject(err);
					else
					{
						done.resolve(doc);
					}
				});
			}

			return done.promise;
		},

		setProfile: function (settings,cb) {
			if (!settings || typeof settings !== 'object')
				return cb&&cb(false);

			delete settings._id;

			if (!settings.password)
			{
				self.getCollection().update({ _id: self.getAttribute('_id') }, { $set: settings }, function (err,s) {
					if (!err && s)
					{
						cb&&cb(true);
					} else 
						cb&&cb(false);
				});
			} else
			{
				this.encryptPassword(settings.password,function (password) {
					settings.password = password;
					self.getCollection().update({ _id: self.getAttribute('_id') }, { $set: settings }, function (err,s) {
						if (!err && s)
						{
							cb&&cb(true);
						} else 
							cb&&cb(false);
					});
				});
			}
		},

		/**
		 * Send Activation Email
		 */
		sendActivation: function (cb)
		{
			if (self.getAttribute('email') && self.getAttribute('active')!==true)
			{
				self.$sendEmail('activation').then(cb).catch(cb);
			}
		},

		/**
		 * Promise: Send Email
		 * Steps:
		 *  - Get User
		 *  - Create Verification Code
		 *  - Render Email Template
		 *  - Send Email
		 */
		$sendEmail: function (view)
		{
			var email = self.getAttribute('email');
			var app = self.getDbConnection().getParent();
			if (!_(view).isString()||!_(email).isString())
				done.reject(new Error('PROCESS_ERROR'));
			else
			{
				self.$getUser({
					email: email
				})
				.then(function (user) {
					self.setAttributes(user);
					var verificador = 111111+Math.floor(Math.random()*888888);
					self.setAttribute('verificador',verificador);
					return self.$update({
						verificador: verificador,
						mode: view
					})
				})
				.then(function (success) {
					var data = self.getAttributes();
					if (success)
						app.template.render({
							name: 'view-'+view+'-'+(data.email||data.verificador),
							file: app.modulePath+'views/email/'+view+'.tpl'
						},data,function (err,viewResult) {
							if (!err)
							{
								data.content = function (chunk) {
									return chunk.write(this.html);
								}.bind({ html: viewResult });

								app.template.render({
									name: 'layout-email',
									file: app.modulePath+'views/layouts/email.tpl'
								},data,function (err,content) {
									if (!err)
									{

										var email   = emailjs;
										var server  = email.server.connect({
										   user:    "anuncie-noreply@dm.com.br", 
										   password:"ads3rver!@#", 
										   host:    "mail.dm.com.br",
										   tls: true
										});

										//data.email 

										// send the message and get a callback with an error or details of the message that was sent
										server.send({
										   text:    '-', 
										   from:    "Anuncie DM.com.br <anuncie-noreply@dm.com.br>", 
										   to:      data.name+" <"+data.email+">",
										   subject: "Verifique sua conta",
										   attachment: 
										   [
										      {data:content, alternative:true}
										   ]
										}, function () {
											done.resolve();
										});
									}

								});
							}
						});
					else
						throw new Error('PROCESS_ERROR');
				})
				.catch(function (err) {
					done.reject(err);
				});
			}

			return done.promise;
		}

	}

};