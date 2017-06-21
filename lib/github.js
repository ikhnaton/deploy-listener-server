const EventEmitter = require('events');
const Crypto = require('crypto');
const util = require('util');
const config = require('../config');

class GitHub extends EventEmitter
{
	notify(req, res, next)
	{
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

		let event = req.headers['x-github-event'] || req.headers['x-event-key'] || (req.headers['x-gitlab-event'] ? req.headers['x-gitlab-event'].split(' ')[0].toLowerCase() : 'unknown');

		let repository = data.repository.full_name;

		let branch = data.ref;

		this.emit(event, event, data);
		this.emit(`${event}:${repository}`, event, data);
		this.emit(`${event}:${repository}:${branch}`, event, data);

		res.sendStatus(200);
		next();
	}

	_getDigest(signature, data)
	{

		let parts = signature.split('=');
        let digest = parts[0] + "=" + Crypto.createHmac(parts[0], config.secret).update(data).digest('hex');

		return digest;
	}
}


module.exports = new GitHub();
