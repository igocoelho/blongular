// WARNING
// DO NOT EDIT THIS.

// Requires WNS Middleware.
global.WNS_SHOW_LOAD=false;
require('wnserver');

var cons=wns.console;
var path=require('path');
var installMode = (process.argv.indexOf('--install') !== -1);
cons.setServers({
	'#': {
		"modulePath": path.relative(cons.modulePath,__dirname),
		"serverID": 'blongular',
		"import": [
			"blongular/",
			"blongular/config/",
			"blongular/classes/",
			"blongular/models/",
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

	if (installMode)
		app.installMode=true;

	for (m in server.m)
		app.m[m] = function () { var m=this.model.model(); m.setParent(this.parent); return m; }.bind({ model: server.m[m], parent: app });
});

cons.selectServer('#');