/**
 * Angular App
 */

// Exports
module.exports = {

	/**
	 * Private
	 */
	private: {
		_appName: 'blongular',
		_dependencies: ['ngResource','ngCookies','blongular.post','blongular.system']
	},

	/**
	 * Methods
	 */
	methods: {

		config: function ($httpProvider) {}

	}

};