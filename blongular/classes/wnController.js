/**
 * Extend the wnApp class.
 */

// Exports
module.exports = {

	/**
	 * Private
	 */
	private: {
		blongular: {}
	},

	/**
	 * Public Variables
	 */
	public: {
		embedScript: [],
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
			self.blongular=blongular=this.app.getConfig();
			blongular.siteUrl = self.request.headers.host || '';

			if (this.request.user._logged)
			{
				self.request.logged = true;
				this.clientScript.push('$("#actions").show();');
			}

			var blongularSession = {
				sid: this.request.user._sid,
				logged: this.request.user._logged,
				displayName: this.request.user.data.displayName,
				alert: this.request.user.data.alert
			};

			delete this.request.user.data.alert;

			this.clientScript.push('var blongularSession = '+JSON.stringify(blongularSession)+';');

			this.embedScript.push('/angular.app.js');
			this.clientScript.push(
				"window.bootstrap = function() {"+
				"    angular.bootstrap(document, ['"+self.response.angular.appName+"']);"+
				"};"+
				"window.init = function() {"+
				"    window.bootstrap();"+
				"};"+
				"jQuery(document).ready(function() {"+
				"	if (window.location.hash == \"#_=_\") window.location.hash = \"\";"+
				"	window.init();"+
				"});"
			);

			this.clientScript.push("$('.navBtn').tooltip({ placement: 'bottom', container: 'body' });");
		}

	}

};