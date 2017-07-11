const EventEmitter = require('events');
const Crypto = require('crypto');
const util = require('util');
const config = require('configuration-master');
const https = require('https');

class GitHub extends EventEmitter
{
	notify(req, res, next)
	{
		let event = req.headers['x-github-event'] || req.headers['x-event-key'] || (req.headers['x-gitlab-event'] ? req.headers['x-gitlab-event'].split(' ')[0].toLowerCase() : 'unknown');

		if (event != "push")
		{
			log.warn({ data: { event: event, payload: req.body }});
			res.sendStatus(200);
			next();
			return;
		}

		let data = (req.body.ref == null)?JSON.parse(req.body):req.body;

		// validate signature
		let digest = this._getDigest(req.headers['x-hub-signature'], JSON.stringify(req.body));
		if (!(digest == req.headers['x-hub-signature']))
		{
			log.error({error: {
				message: "Invalid signature",
				"x-hub-signature": req.headers['x-hub-signature'],
				"expected-signature": digest
			}});
			return;
		}

		let repository = data.repository.full_name;

		let branch = data.ref;

		this.emit(event, event, data);
		this.emit(`${event}:${repository}`, event, data);
		this.emit(`${event}:${repository}:${branch}`, event, data);

		res.sendStatus(200);
		next();
	}

	setStatus({repo, sha, token, state, message, url, context})
	{
		let options = {
				hostname: "github.ibm.com",
				port: 443,
				path: `/api/v3/repos/${repo}/statuses/${sha}`,
				method: 'POST',
				followAllRedirects: true,
				rejectUnauthorized: false,
				headers : {
					'authorization': `token ${token}`
				}
			};

		let status = {
			state: state,
			target_url: url,
			description: message,
			context: context
		}

		let req = https.request(options, (res) =>
		{
			var resultData = "";
			res.on('data', (d) => {
				resultData += d;
			});

			res.on('end', (d) => {
				process.stdout.write(resultData);
			});

			res.on('error', (d) => {
				process.stdout.write(d);
			});
		});

		req.on('error', (e) => {
			console.error(e);
		});

		req.write(JSON.stringify(status));
		req.end();

	}

	_getDigest(signature, data)
	{

		let parts = signature.split('=');
        let digest = parts[0] + "=" + Crypto.createHmac(parts[0], config.direct.__COMMON.secret).update(data).digest('hex');

		return digest;
	}
}


module.exports = new GitHub();
