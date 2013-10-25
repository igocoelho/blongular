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
			// Auto import
			"import": [
				"classes/",
				"scripts/",
				"models/",
				"editor/",
				"editor/modules/",
				"editor/resources/",
				"editor/controllers/",
				"editor/rest/",
			],

			// Components
			"components": {
				// Blongular Server
				"blongular": {
					"class": "wnBlongularServer"
				},
				// wnHttpRequest configuration (remove/comment to disable)
				"http": {
					"class": "wnHttpRequest"
				},
				// wnDbConnection configuration (remove comment to enable)
				"database": {
					"class": "wnDbConnection",
					"alias": "db",
					"engine": "mongo",
					"address": "127.0.0.1",
					"port": 27017,
					"database": "blongular"
				},
			}
		}
	},

	/**
	 * Methods
	 */
	methods: {

		init: function () {
			self.moment=moment;
			self.db.once('connect',function (e,connected) {
				if (!connected)
					self.e.log('Failed to load this BLONGULAR.');
				else
					self.e.log('This BLONGULAR is ready.');
			});
			self.addListener('readyRequest',function (e,req) {
				if (!self.db.connected)
					req.once('run',function () {
						req.send('');
						e.stopPropagation=true;
					});
			});
		}

	}

};