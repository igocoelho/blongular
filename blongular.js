// WARNING
// DO NOT EDIT THIS.

// Requires WNS Middleware.
global.WNS_SHOW_LOAD=false;
require('wnserver');

var cons=wns.console;
var path=require('path');
var setupMode = (process.argv.indexOf('--setup') !== -1);
cons.setServers({
	'#': {
		"modulePath": path.relative(cons.modulePath,__dirname),
		"serverID": 'blongular',
		"import": [
			"blongular/",
			"blongular/config/",
			"blongular/classes/",
			"blongular/models/",
			"blongular/setup/",
			"blongular/editor/modules/",
			"blongular/editor/resources/",
			"blongular/editor/controllers/",
			"blongular/editor/rest/",
			"blongular/editor/"
		]
	}
});
var server = cons.createServer('#');
server.addListener('loadModule',function (err,appName,app) {
	app.m={};
	
	app.setupMode = setupMode;

	for (m in server.m)
		app.m[m] = function () { var m=this.model.model(); m.setParent(this.parent); return m; }.bind({ model: server.m[m], parent: app });
});

cons.selectServer('#');