const IncomingWebhook = require('@slack/client').IncomingWebhook;
const config = require('./config');

let slack = {
	send: function (message, color, handler)
	{
		log.debug("sending to slack");
		log.debug(message);
		log.debug(color);
		log.debug(handler);
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
		log.debug("sendAttachment");
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

			webhook.send(
			{
				attachments: attachment
			}, function (err, res)
			{
				if (err)
				{
					log.error("slack failed");
					log.error(err);
					reject(err);
				}
				else
				{
					log.info("slack sent successfully");
					log.info(res);
					resolve(res);
				}
			});
		});

		return p;
	}
}

module.exports = slack
