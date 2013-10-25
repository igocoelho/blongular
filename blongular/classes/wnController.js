/**
 * Extend the wnApp class.
 */

// Exports
module.exports = {

	/**
	 * Public Variables
	 */
	public: {
		embedScript: [
			'/js/jquery.js',
			'/js/bootstrap.min.js',
			'/js/medium-editor.min.js'
		],
		clientScript: []
	},

	/**
	 * Methods
	 */
	methods: {

		/**
		 * Called after any controller is initialized.
		 */	
		afterInit: function ()
		{
			if (this.request.user._logged)
			{
				self.request.logged = true;
				this.clientScript.push('var blongularSession="'+self.request.user._sid+'";');
				this.clientScript.push('$("#actions").show();');
			}

			this.clientScript.push(
				"window.bootstrap = function() {"+
				"    angular.bootstrap(document, ['"+self.request.angular.appName+"']);"+
				"};"+
				"window.init = function() {"+
				"    window.bootstrap();"+
				"};"+
				"jQuery(document).ready(function() {"+
				"	if (window.location.hash == \"#_=_\") window.location.hash = \"\";"+
				"	window.init();"+
				"});"
			);

			this.clientScript.push("$('.navBtn').tooltip({ placement: 'bottom', container: 'body' })");

			// _.extend(self.request.header,{
			// 	'Access-Control-Allow-Origin':'*',
			// 	"Access-Control-Allow-Credentials":"true",
			// 	'Access-Control-Allow-Headers':'X-Requested-With, Content-Type, Cookie',
			// 	'Access-Control-Allow-Methods':'POST, GET, OPTIONS, DELETE, PUT',
			// 	'Access-Control-Max-Age':'86400'
			// });
		}

	}

};