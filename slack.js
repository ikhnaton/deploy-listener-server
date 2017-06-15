const IncomingWebhook = require('@slack/client').IncomingWebhook;
const config = require('./config');

let slack = {
	send: function (message, color, handler)
	{
		let p = new Promise((resolve, reject) =>
		{
			slack.sendAttachment(
				{
					color: color || "#00ff00",
					text: message
				}, handler)
				.then(resolve)
				.catch(reject);
		});

		return p;
	},

	sendAttachment: function (attachment, handler)
	{
		if (handler == null) handler = {};

		let p = new Promise((resolve, reject) =>
		{
			let url = handler.slackUrl || config.slackUrl;

			let webhook = new IncomingWebhook(url,
			{
				channel: handler.slackChannel || config.slackChannel,
				username: handler.slackUsername || config.slackUsername,
				icon_emoji: handler.emoji || config.emoji || ":hammer_and_wrench:"
			});

			log.debug({
				attachments: attachment
			})
			webhook.send(
			{
				attachments: [].concat(attachment)
			}, function (err, headers, status, body)
			{
				if (err)
				{
					log.error(err);
					reject(err);
				}
				else
				{
					if (status != 200)
					{
						reject(body);
						log.error({
							error: body,
							status: status
						})
					}
					else
					{
						log.debug(body, status, headers);
						resolve(body);
					}
				}
			});
		});

		return p;
	}
}

module.exports = slack
