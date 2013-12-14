/**
 * Extend the wnApp class.
 */

// Exports
module.exports = {

	/**
	 * NPM
	 */
	dependencies: ['moment'],

	/**
	 * Private
	 */
	private: {
		_config: {
			"servername": "*",

			// Auto import
			"import": [],

			// Components
			"components": {
				// Blongular Server
				"blongular": {
					"class": "wnBlongularServer"
				},
				// wnDbConnection configuration (remove comment to enable)
				"database": {
					"class": "wnDbConnection",
					"alias": "db",
					"engine": "mongo",
					"address": "127.0.0.1",
					"port": 27017,
					"database": "blongular"
				}
			}
		}
	},

	/**
	 * Methods
	 */
	methods: {

		/**
		 * Function called when the blog is initialized.
		 */
		init: function () {

			// Moment
			self.moment=moment;

			// Debug MongoDB
			self.db.dataObject.driver.set('debug',true);

			// DB Connection Message
			self.db.once('connect',function (e,connected) {

				if (self.setupMode)
					return self.e.log('Running using SETUP mode.');

				if (!connected)
				{
					self.e.log('Failed to connect to DATABASE.');
					self.e.log('Run with --setup for setting up database configuration...');
					process.exit();
				}
				else
					self.e.log('BLONGULAR is ready.');
			});

			// Block request if not ready.
			self.prependListener('newRequest',function (e,req,resp) {
				if (!self.db.connected)
				{
					resp.statusCode = 503;
					resp.end();
				} else
					e.next();
			});

			// Enable JSONP on express.
			self.express.enable("jsonp callback");

		}
		
	}

};