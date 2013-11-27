Blongular Plugins
=============

On Blongular you can easily create classes or override any existing class on the system, even from Blongular's core.

A Blongular Plugin is just a collection of classes built to provide an specific function on you blog.

# Installing a Plugin

To install a plugin you just need to put the new plugin directory inside your blog's `/plugins` directory.

Then edit your blog's `components.json` and add the new plugin just like this:

````js
{
	"components": {

		// ...
		// After your database configuration and other installed plugins
		// ...

		"myNewPlugin": {
			"class": "PluginMainClassName"
			// Add here other plugin's specific configuration
		}
	}
}

````

# Creating Plugin

To create a new plugin you need to create a new directory inside your blog's `/plugins` directory.

Then inside that directory you just need to create new classes or override existing ones.

# Creating Classes

Just create a new file with an extension `.js` inside your plugin's directory.

Then inside your new file you must have a **WNS Class/Component Structure**, like this:

````js
module.exports = {

	/* Extends class wnComponent */
	extend: ['wnComponent'],

	/* Class private variables */
	private: {
		_myPrivateVar: false
	},

	/* Class public variables */
	public: {
		myPublicVar: true
	},

	/* Methods */
	methods: {

		/**
		 * Init: This function is called when this component is loaded.
		 */
		init: function () {
			console.log("Hello world");
			console.log(_myPrivateVar);
			console.log(this.myPublicVar);
		}

	}

};
````

# Overriding Classes

To override an existing class you must create a new class with the same name of the existing one.