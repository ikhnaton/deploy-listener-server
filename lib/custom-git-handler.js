const execFile = require('child_process').execFile;
const slack = require("./slack");
const config = require('../config');

class CustomHandler
{
	push(handler, data)
	{
		log.debug({ data : {
			event: "push",
			repo: handler.repo,
			branch: handler.branch,
			timestamp: data.head_commit.timestamp,
			message: data.head_commit.message,
			committer: (data.head_commit.committer.name != "GitHub Enterprise")?data.head_commit.committer.name:data.head_commit.author.name,
			email: (data.head_commit.committer.email != "noreply@github.ibm.com")?data.head_commit.committer.email:data.head_commit.author.email,
			items: data.head_commit.modified
		}});

		// params: file, args, options
		execFile(handler.executable, null, null, function (error, stdout, stderr)
		{
			let slacker = ((handler.slackUrl != null) || (config.slackUrl != null)) ? true : false;

			if (slacker == true)
			{

				let header = handler.slackMessage || config.slackMessage || `Deployment to ${config.environment} environment`;
				let attachments = [{
						"color": error?"#bf0000":"#009f00",
						"fields": [
							{
								"title": "Committer",
								"value": (data.head_commit.committer.name != "GitHub Enterprise")?data.head_commit.committer.name:data.head_commit.author.name,
								"short": true
								  },
							{
								"title": "Email",
								"value": (data.head_commit.committer.email != "noreply@github.ibm.com")?data.head_commit.committer.email:data.head_commit.author.email,
								"short": true
								  },
							{
								"title": "Repository",
								"value": handler.repo,
								"short": true
								  },
							{
								"title": "Branch",
								"value": handler.branch,
								"short": true
								  },
							{
								"title": "Timestamp",
								"value": data.head_commit.timestamp,
								"short": true
								  },
							{
								"title": "Status",
								"value": error?"Failure":"Successful",
								"short": true
								  }
							  ]
							}];


				if(error)
				{
					log.error("error: ", error);
					attachments[0].fields.push({
						"title": "Error Text",
						"value": error.stack,
						"short": false
					});
				}
				slack.sendAttachment(header, attachments, handler)
					.then((res) =>
					{
						log.debug(
						{
							txt: "Slack message sent successfully",
							result: res
						});
					})
					.catch((err) =>
					{
						log.error(
						{
							txt: "Slack message failed to send",
							result: err
						});
					});
			}


		});
	}
}

module.exports = new CustomHandler();
