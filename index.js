const bunyan = require('bunyan');
const config = require('./config');

global.log = bunyan.createLogger(
{
	name: "deploy-listener",
	level: config.logLevel,
	streams: [
		{
			type: 'stream',
			stream: process.stdout
        },
		{
			type: 'rotating-file',
			path: config.logFile,
			period: '1d',
			count: 3
		}
	]
	//serializers: { message: require('./messageSerializer') }
});

// bridge to allow generic messages from githubhook to be piped to debug without modification of module.
const loggerBridge = {
	log: function (msg)
	{
		log.debug(msg);
	},
	error: function (msg)
	{
		log.error(msg);
	}
}

//start the server
require('./lib/server');
