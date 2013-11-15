/**
 * Angular Controller: Post
 */

// Exports
module.exports = {

	/**
	 * Class Extension
	 */
	extend: ['wnAngularResource'],

	/**
	 * PRIVATE
	 */
	private: {
		_config: {
			moduleName: 'blongular.system',
			resourceName: 'Global'
		}
	},

	/**
	 * Methods
	 */
	methods: {

		/**
		 * Initializer
		 */
		init: function () {

			this.user = blongularSession || {};

			return this;
		}

	}

};