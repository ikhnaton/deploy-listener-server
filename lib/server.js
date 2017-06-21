const http = require('http');
const https = require('https');
const os = require("os");
const fs = require("fs");

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const config = require('../config');
const GitHub = require('./github');
const customHandler = require('./custom-git-handler');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
{
	extended: true
}));

app.post(config.githubPath, (req, res, next) => { GitHub.notify(req, res, next) });

_.forEach(config.handlers, (handler) =>
{
	log.debug(`Registering handler for "push:${handler.repo}:${handler.branch}"`);
	GitHub.on(`push:${handler.repo}:${handler.branch}`, (event, data) =>
	{
		log.info(
		{
			data:
			{
				event: event,
				repository: data.repository.full_name,
				branch: data.ref
			}
		});
		customHandler.push(handler, data);
	});
});

if ((config.sslCert == null) || (config.sslKey == null))
{
	http.createServer(app).listen(config.port, () =>
	{
		log.info(`Server started on http://${os.hostname()}:${config.port}`);
	});
}
else
{
	https.createServer(
	{
		key: fs.readFileSync(config.sslKey),
		cert: fs.readFileSync(config.sslCert)
	}, app).listen(config.port, () =>
	{
		console.log(`Server started on https://${os.hostname()}:${config.port}`);
	});
}
