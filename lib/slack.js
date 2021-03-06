const IncomingWebhook = require('@slack/client').IncomingWebhook;
const config = require('configuration-master');

let slack = {
	send: function (header, message, color, handler)
	{
		let p = new Promise((resolve, reject) =>
		{
			slack.sendAttachment(header,
				{
					color: color || "#00ff00",
					text: message
				}, handler)
				.then(resolve)
				.catch(reject);
		});

		return p;
	},

	sendAttachment: function (header, attachment, handler)
	{
		if (handler == null) handler = {};

		let p = new Promise((resolve, reject) =>
		{
			let url = handler.slackUrl || config.direct.__COMMON.slackUrl;

			let webhook = new IncomingWebhook(url,
			{
				channel: handler.slackChannel || config.direct.__COMMON.slackChannel,
				username: handler.slackUsername || config.direct.__COMMON.slackUsername,
				iconEmoji: handler.emoji || config.direct.__COMMON.emoji || ":hammer_and_wrench:"
			});

			log.debug({
				attachments: attachment
			})
			webhook.send(
			{
				text: header,
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
