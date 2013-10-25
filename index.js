// WARNING
// DO NOT EDIT THIS.

// Requires WNS Middleware.
global.WNS_SHOW_LOAD=false;
require('wnserver');

var console=wns.console;
console.setServers({
	'#': {
		"modulePath": '../../',
		"serverID": 'blongular',
		"import": [
			"blongular/",
			"blongular/config/",
			"blongular/classes/",
			"blongular/models/"
		]
	}
});
var server = console.createServer('#');
server.addListener('loadModule',function (err,appName,app) {
	app.m={};
	for (m in server.m)
		app.m[m] = function () { var m=this.model.model(); m.setParent(this.parent); return m; }.bind({ model: server.m[m], parent: app });
});

console.selectServer('#');