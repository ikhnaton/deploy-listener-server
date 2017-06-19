const fs = require('fs');
const _ = require('lodash');
const bunyan = require('bunyan');
const githubhook = require('githubhook');
const slack = require("./slack");
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

/*
	Valid options for githubhook:

	host: the host to listen on, defaults to '0.0.0.0'
	port: the port to listen on, defaults to 3420
	path: the path for the GitHub callback, defaults to '/github/callback'
	wildcard: if true, the path for the GitHub callback will be considered valid as long as it starts with the configured path
	secret: if specified, you must use the same secret in your webhook configuration in GitHub. if a secret is specified, but one is not configured in GitHub, the hook will fail. if a secret is not specified, but one is configured in GitHub, the signature will not be validated and will be assumed to be correct. consider yourself warned. this option can also be a function that takes the following parameters: (request, data, callback). callback is error first and should be passed (err, secret)
	logger: an optional instance of a logger that supports the "log" and "error" methods and one parameter for data (like console), default is console.
	https: Options to pass to nodejs https server. If specified, you must follow documentation about nodejs https library (See options in https://nodejs.org/api/https.html#https_https_createserver_options_requestlistener)
	trustProxy: By default the x-forwarded-for header is trusted when determining the remoteAddress to log for a request. Set this to false to disable this behavior
*/
const github = githubhook(
{
	port: config.port,
	secret: config.secret,
	path: config.path,
	logger: loggerBridge,
	https:
	{
		key: fs.readFileSync(config.sslKey),
		cert: fs.readFileSync(config.sslCert)
	}
});


