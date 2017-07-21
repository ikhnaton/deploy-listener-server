const http = require('http');
const https = require('https');
const os = require("os");
const fs = require("fs");

const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const config = require('configuration-master');
const GitHub = require('./github');
const customHandler = require('./custom-git-handler');

const app = express();

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));

app.post(config.direct.__COMMON.githubPath, (req, res, next) => { GitHub.notify(req, res, next) });

_.forEach(config.direct.__COMMON.handlers, (handler) =>
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

if ((config.direct.__COMMON.sslCert == null) || (config.direct.__COMMON.sslKey == null))
{
	http.createServer(app).listen(config.direct.__COMMON.port, () =>
	{
		log.warn(`Server started on http://${os.hostname()}:${config.direct.__COMMON.port}`);
	});
}
else
{
	https.createServer(
	{
		key: fs.readFileSync(config.direct.__COMMON.sslKey),
		cert: fs.readFileSync(config.direct.__COMMON.sslCert)
	}, app).listen(config.direct.__COMMON.port, () =>
	{
		log.warn(`Server started on https://${os.hostname()}:${config.direct.__COMMON.port}`);
	});
}
