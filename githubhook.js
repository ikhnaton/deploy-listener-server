
github.listen();

_.forEach(config.handlers, (handler) =>
{
	github.on(`push:${handler.repo}:refs/heads/${handler.branch}`, function (data)
	{
		let p = new Promise((resolve, reject) =>
		{
			log.debug(`Push to the ${handler.branch} branch: `, (new Date()).toDateString());

			log.debug(`by ${(data.head_commit.committer.name != "GitHub Enterprise")?data.head_commit.committer.name:data.head_commit.author.name} (${(data.head_commit.committer.email == "noreply@github.ibm.com")?data.head_commit.committer.email:data.head_commit.author.email})`);
			log.debug("message:", data.head_commit.message);
			log.debug("items:");
			_.forEach(data.head_commit.modified, (file) =>
			{
				log.debug("   ", file);
			});

			var execFile = require('child_process').execFile;
			// params: file, args, options
			execFile(handler.executable, null, null, function (error, stdout, stderr)
			{
				let slacker = ((handler.slackUrl != null) || (config.slackUrl != null)) ? true : false;
				log.debug({data: handler});

				// command output is in stdout
				if (error)
				{
					log.info("error: ", error);
					if (slacker == true)
					{
						slack.send(`Repository: ${handler.repo}`,`Deploy of ${handler.branch} branch to ${config.environment}  failed! ` + error, null, handler)
							.then((res) =>
							{
								log.debug(
								{
									txt: "Slack message sent successfully",
									result: res
								});
								resolve();
							})
							.catch((err) =>
							{
								log.error(
								{
									txt: "Slack message failed to send",
									result: err
								});
								reject();
							});
					}
					else { resolve(); }
				}

				else if (stdout)
				{
					log.info("stdout: ", stdout);
					if (slacker == true)
					{
						slack.send(`Repository: ${handler.repo}`, `Deploy of ${handler.branch} branch to ${config.environment} successful!`, null, handler)
							.then((res) =>
							{
								log.debug(
								{
									txt: "Slack message sent successfully",
									result: res
								});
								resolve();
							})
							.catch((err) =>
							{
								log.error(
								{
									txt: "Slack message failed to send",
									result: err
								});
								reject();
							});
					}
					else { resolve(); }
				}

//				if (stderr)
//				{
//					log.info("stderr: ", stderr);
//					if (slacker == true)
//					{
//						slack.send(handler.repo, "Deploy failed! " + stderr)
//							.then((res) =>
//							{
//								log.debug(
//								{
//									txt: "Slack message sent successfully",
//									result: res
//								});
//								resolve();
//							})
//							.catch((err) =>
//							{
//								log.error(
//								{
//									txt: "Slack message failed to send",
//									result: err
//								});
//								reject();
//							});
//					}
//					else { resolve(); }
//				}

			});
		});

		return p;
	});

});
