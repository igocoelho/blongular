/**
 * Blongular -> wnBlongularServer
 * 
 * @copyright: Copyright &copy; 2013- Pedro Nasser &reg;
 * @page: http://github.com/blongular/blungular
 * @license: http://github.com/blongular/blongular/blob/master/LICENSE
 */

/**
 * No description yet.
 *
 * @author Pedro Nasser
 */

// Exports
module.exports = {

	/**
	 * Class Extension
	 */
	extend: ['wnComponent'],

	/**
	 * PRIVATE
	 */
	private: {
		_corePath: __dirname,
		_configPath: '/config/',
		_config: {
			configPath: ''
		},
		_components: {}
	},

	/**
	 * Public Variables
	 */
	public: {},

	/**
	 * Methods
	 */
	methods: {

		/**
		 * Initializer
		 */
		init: function () {
			this.app = this.getParent();
			this.importConfig(_corePath+_configPath);
			this.importConfig(this.app.modulePath+_config.configPath);
			this.prepareTheme();
			this.startComponents();
		},

		/**
		 * Import all JSON config from a directory.
		 * @param string $path configuration directory
		 */
		importConfig: function (path)
		{
			if (_.isString(path) && fs.existsSync(path))
			{
				var files = fs.readdirSync(path)
				for (f in files)
				{
					if (/\.json$/.test(files[f]))
					{
						var configFile=fs.readFileSync(path+files[f]);
						if (!configFile)
							continue;
						try {
							var config=JSON.parse(configFile.toString('utf8')
													.replace(/\\/g,function () { return "\\"+arguments[0]; })
													.replace(/\/\/.+?(?=\n|\r|$)|\/\*[\s\S]+?\*\//g,''));
							if (!config.components)
							{
								self.app.setConfig(config);
							} else {
								_.merge(_components,config.components);
							}
						} catch (e) {
							throw e;
						}
					}
				}

			}
			else
				return false
		},

		/**
		 * Prepare you application to load the correct theme.
		 */
		prepareTheme: function ()
		{
			_.merge(_components,{
				static: {
					serve: ['upload/','themes/'+this.app.getConfig('theme')+'/public/'],
				},
				controller: {
					path: {
						views: 'themes/'+this.app.getConfig('theme')+'/views/'
					}
				}
			});
		},

		/**
		 * Start all Blongular required components
		 */
		startComponents: function ()
		{
			this.app.setConfig({ components: _components });
			this.app.setComponents(_components);
			for (c in _components)
			{
				this.app.getComponent(c)
			}
		}

	}

};