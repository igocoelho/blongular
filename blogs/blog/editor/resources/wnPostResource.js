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
			moduleName: 'blongular.post',
			resourceName: 'Post'
		}
	},

	/**
	 * Methods
	 */
	methods: {

		/**
		 * Initializer
		 */
		init: function ($resource) {
		    return $resource('/xhr/posts/:_id', {
		        '_id': '@_id'
		    }, {
		        update: {
		            method: 'PUT'
		        }
		    });
		}

	}

};