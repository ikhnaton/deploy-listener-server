const path = require('path');
const bunyan = require('bunyan');
const config = require('configuration-master');
config.loadConfig(path.join(__dirname, '/config'));

global.log = bunyan.createLogger(
{
	name: "deploy-listener",
	level: config.direct.__COMMON.logLevel,
	streams: [
		{
			type: 'stream',
			stream: process.stdout
        },
		{
			type: 'rotating-file',
			path: config.direct.__COMMON.logFile,
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

//start the server up
require('./lib/server');
